import express from 'express';
import pool from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createNotification } from '../utils/notifications';

const router = express.Router();

/**
 * FRIENDS SYSTEM
 */

// Get all friends (accepted friendships)
router.get('/friends', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;

    const result = await pool.query(
      `SELECT f.id as friendship_id, f.status, f.created_at,
              u.id as user_id, u.username, u.player_name, u.avatar_url, u.bio
       FROM friendships f
       JOIN users u ON (u.id = f.user_id OR u.id = f.friend_user_id)
       WHERE (f.user_id = $1 OR f.friend_user_id = $1)
       AND u.id != $1
       AND f.status = 'accepted'
       ORDER BY u.username ASC`,
      [userId]
    );

    res.json({ friends: result.rows });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

// Get pending friend requests
router.get('/friends/requests', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;

    const result = await pool.query(
      `SELECT f.id as friendship_id, f.status, f.created_at,
              u.id as user_id, u.username, u.player_name, u.avatar_url
       FROM friendships f
       JOIN users u ON u.id = f.user_id
       WHERE f.friend_user_id = $1
       AND f.status = 'pending'
       ORDER BY f.created_at DESC`,
      [userId]
    );

    res.json({ requests: result.rows });
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ error: 'Failed to fetch friend requests' });
  }
});

// Send a friend request
router.post('/friends/request', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { friendUsername } = req.body;

    if (!friendUsername) {
      return res.status(400).json({ error: 'Friend username is required' });
    }

    // Find the friend by username
    const friendResult = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [friendUsername]
    );

    if (friendResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendId = friendResult.rows[0].id;

    if (friendId === userId) {
      return res.status(400).json({ error: 'You cannot add yourself as a friend' });
    }

    // Check if friendship already exists
    const existingFriendship = await pool.query(
      `SELECT id, status FROM friendships
       WHERE (user_id = $1 AND friend_user_id = $2)
       OR (user_id = $2 AND friend_user_id = $1)`,
      [userId, friendId]
    );

    if (existingFriendship.rows.length > 0) {
      const status = existingFriendship.rows[0].status;
      if (status === 'accepted') {
        return res.status(400).json({ error: 'You are already friends' });
      } else if (status === 'pending') {
        return res.status(400).json({ error: 'Friend request already sent/pending' });
      } else if (status === 'blocked') {
        return res.status(403).json({ error: 'You have blocked this user or are blocked' });
      }
    }

    // Create new friendship record
    await pool.query(
      `INSERT INTO friendships (user_id, friend_user_id, status)
       VALUES ($1, $2, 'pending')`,
      [userId, friendId]
    );

    // Notify the recipient
    await createNotification(
      friendId,
      'friend_request',
      'New Friend Request',
      `${req.user?.username} wants to establish a tactical link.`,
      '/friends'
    );

    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Failed to send friend request' });
  }
});

// Respond to friend request (accept/reject)
router.put('/friends/respond', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { friendshipId, action } = req.body; // action: 'accept' | 'reject'

    if (!friendshipId || !['accept', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid response data' });
    }

    // Verify friendship exists and is for this user
    const friendshipResult = await pool.query(
      'SELECT * FROM friendships WHERE id = $1 AND friend_user_id = $2 AND status = $3',
      [friendshipId, userId, 'pending']
    );

    if (friendshipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Friend request not found or unauthorized' });
    }

    if (action === 'accept') {
      await pool.query(
        'UPDATE friendships SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['accepted', friendshipId]
      );

      // Notify the requester
      await createNotification(
        friendshipResult.rows[0].user_id,
        'friend_accepted',
        'Tactical Link Established',
        `${req.user?.username} has accepted your friend request.`,
        '/friends'
      );

      res.json({ message: 'Friend request accepted' });
    } else {
      await pool.query('DELETE FROM friendships WHERE id = $1', [friendshipId]);
      res.json({ message: 'Friend request rejected' });
    }
  } catch (error) {
    console.error('Error responding to friend request:', error);
    res.status(500).json({ error: 'Failed to respond to friend request' });
  }
});

// Remove a friend
router.delete('/friends/:friendshipId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { friendshipId } = req.params;

    const result = await pool.query(
      `DELETE FROM friendships
       WHERE id = $1 AND (user_id = $2 OR friend_user_id = $2)`,
      [friendshipId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Friendship not found or unauthorized' });
    }

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

/**
 * SQUADS SYSTEM
 */

// Create a new squad
router.post('/squads', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { name, tag, description, isPublic = true } = req.body;

    if (!name || !tag) {
      return res.status(400).json({ error: 'Squad name and tag are required' });
    }

    // Check if name or tag already exists
    const existing = await pool.query(
      'SELECT id FROM squads WHERE name = $1 OR tag = $2',
      [name, tag]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Squad name or tag already exists' });
    }

    // Insert squad
    const result = await pool.query(
      `INSERT INTO squads (name, tag, description, owner_user_id, is_public)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, tag, description, userId, isPublic]
    );

    const squad = result.rows[0];

    // Add owner as first member
    await pool.query(
      `INSERT INTO squad_members (squad_id, user_id, role)
       VALUES ($1, $2, 'owner')`,
      [squad.id, userId]
    );

    res.status(201).json({ message: 'Squad created successfully', squad });
  } catch (error) {
    console.error('Error creating squad:', error);
    res.status(500).json({ error: 'Failed to create squad' });
  }
});

// Get all squads (public ones)
router.get('/squads', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.*, u.username as owner_name
       FROM squads s
       JOIN users u ON u.id = s.owner_user_id
       WHERE s.is_public = true
       ORDER BY s.created_at DESC`
    );
    res.json({ squads: result.rows });
  } catch (error) {
    console.error('Error fetching squads:', error);
    res.status(500).json({ error: 'Failed to fetch squads' });
  }
});

// Get squads for current user
router.get('/squads/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query(
      `SELECT s.*, sm.role
       FROM squads s
       JOIN squad_members sm ON sm.squad_id = s.id
       WHERE sm.user_id = $1`,
      [userId]
    );
    res.json({ squads: result.rows });
  } catch (error) {
    console.error('Error fetching my squads:', error);
    res.status(500).json({ error: 'Failed to fetch your squads' });
  }
});

// Join a squad
router.post('/squads/:squadId/join', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { squadId } = req.params;

    // Check if squad is public
    const squad = await pool.query('SELECT * FROM squads WHERE id = $1', [squadId]);
    if (squad.rows.length === 0) {
      return res.status(404).json({ error: 'Squad not found' });
    }

    if (!squad.rows[0].is_public) {
       return res.status(403).json({ error: 'This squad is private' });
    }

    // Check if already a member
    const existingMember = await pool.query(
      'SELECT id FROM squad_members WHERE squad_id = $1 AND user_id = $2',
      [squadId, userId]
    );

    if (existingMember.rows.length > 0) {
      return res.status(400).json({ error: 'You are already a member of this squad' });
    }

    // Add member
    await pool.query(
      `INSERT INTO squad_members (squad_id, user_id, role)
       VALUES ($1, $2, 'member')`,
      [squadId, userId]
    );

    // Update count
    await pool.query(
      'UPDATE squads SET member_count = member_count + 1 WHERE id = $1',
      [squadId]
    );

    // Notify the owner
    await createNotification(
      squad.rows[0].owner_user_id,
      'squad_join',
      'New Squad Member',
      `${req.user?.username} has joined [${squad.rows[0].tag}] ${squad.rows[0].name}.`,
      `/squads`
    );

    res.json({ message: 'Joined squad successfully' });
  } catch (error) {
    console.error('Error joining squad:', error);
    res.status(500).json({ error: 'Failed to join squad' });
  }
});

export default router;

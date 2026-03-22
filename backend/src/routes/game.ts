import express from 'express';
import pool from '../config/database';

const router = express.Router();

// Save game state
router.post('/save', async (req, res) => {
  const { userId, currentScene, rage, resolve, skills, itemIds } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO game_saves (user_id, current_scene, rage, resolve, skills, item_ids)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) DO UPDATE SET
       current_scene = EXCLUDED.current_scene,
       rage = EXCLUDED.rage,
       resolve = EXCLUDED.resolve,
       skills = EXCLUDED.skills,
       item_ids = EXCLUDED.item_ids,
       updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, currentScene, rage, resolve, JSON.stringify(skills), JSON.stringify(itemIds)]
    );
    res.json({ success: true, save: result.rows[0] });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// Load game state
router.get('/load/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM game_saves WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No save found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({ error: 'Failed to load game' });
  }
});

export default router;

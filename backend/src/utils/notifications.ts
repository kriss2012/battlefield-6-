import pool from '../config/database';
import { io } from '../index';

export async function createNotification(
  userId: number,
  type: string,
  title: string,
  message: string,
  link?: string
) {
  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, type, title, message, link || null]
    );

    const notification = result.rows[0];

    // Emit real-time update
    io.to(`user_${userId}`).emit('new_notification', notification);

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

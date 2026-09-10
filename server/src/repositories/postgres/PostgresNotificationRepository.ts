import { INotificationRepository } from '../interfaces/INotificationRepository.js';
import { Notification } from '../../types/index.js';
import { Database } from '../../database/connection.js';

export class PostgresNotificationRepository implements INotificationRepository {
  async create(notification: Notification): Promise<Notification> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO notifications (id, user_id, title, message, type, is_read, issue_id, target_url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      notification.id,
      notification.user_id || null,
      notification.title,
      notification.message,
      notification.type,
      notification.is_read || false,
      notification.issue_id || null,
      notification.target_url || null,
      notification.created_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const pool = Database.getPool();
    const query = `
      SELECT * FROM notifications
      WHERE user_id = $1 OR user_id IS NULL
      ORDER BY created_at DESC
    `;
    const res = await pool.query(query, [userId]);
    return res.rows;
  }

  async findAll(): Promise<Notification[]> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
    return res.rows;
  }

  async markAsRead(id: string): Promise<boolean> {
    const pool = Database.getPool();
    const res = await pool.query('UPDATE notifications SET is_read = true WHERE id = $1', [id]);
    return (res.rowCount ?? 0) > 0;
  }

  async markAllAsRead(userId?: string): Promise<boolean> {
    const pool = Database.getPool();
    if (userId) {
      await pool.query('UPDATE notifications SET is_read = true WHERE user_id = $1', [userId]);
    } else {
      await pool.query('UPDATE notifications SET is_read = true');
    }
    return true;
  }
}

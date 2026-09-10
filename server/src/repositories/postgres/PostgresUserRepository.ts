import { IUserRepository } from '../interfaces/IUserRepository.js';
import { User } from '../../types/index.js';
import { Database } from '../../database/connection.js';

export class PostgresUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email.trim()]);
    return res.rows[0] || null;
  }

  async create(user: User): Promise<User> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO users (id, name, email, phone, password_hash, role, district, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      user.id,
      user.name,
      user.email,
      user.phone || null,
      user.password_hash,
      user.role,
      user.district,
      user.created_at,
      user.updated_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const pool = Database.getPool();
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (key !== 'id' && value !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = $${idx}`);
    values.push(new Date().toISOString());
    idx++;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
  }

  async list(): Promise<User[]> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return res.rows;
  }
}

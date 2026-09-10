import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;

export class Database {
  private static pool: pg.Pool | null = null;
  private static isConnected = false;

  public static getPool(): pg.Pool {
    if (!this.pool) {
      this.pool = new Pool({
        connectionString: config.databaseUrl,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 10000,
        max: 10
      });

      this.pool.on('error', (err) => {
        console.warn('⚠️ [PostgreSQL Pool Error]:', err.message);
      });
    }
    return this.pool;
  }

  public static async testConnection(): Promise<boolean> {
    try {
      const pool = this.getPool();
      const client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      client.release();
      this.isConnected = true;
      console.log('✅ [PostgreSQL Connected]:', res.rows[0]);
      return true;
    } catch (err: any) {
      this.isConnected = false;
      console.warn('⚠️ [PostgreSQL Unavailable]: Using resilient local repository abstraction. Details:', err.message);
      return false;
    }
  }

  public static isPostgresConnected(): boolean {
    return this.isConnected;
  }

  public static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      this.isConnected = false;
    }
  }
}

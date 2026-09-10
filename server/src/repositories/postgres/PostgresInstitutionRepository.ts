import { IInstitutionRepository, InstitutionFilterOptions } from '../interfaces/IInstitutionRepository.js';
import { Institution } from '../../types/index.js';
import { Database } from '../../database/connection.js';

export class PostgresInstitutionRepository implements IInstitutionRepository {
  async findAll(filters?: InstitutionFilterOptions): Promise<Institution[]> {
    const pool = Database.getPool();
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (filters?.district) {
      conditions.push(`LOWER(district) = LOWER($${idx})`);
      values.push(filters.district);
      idx++;
    }
    if (filters?.type) {
      conditions.push(`LOWER(type) LIKE LOWER($${idx})`);
      values.push(`%${filters.type}%`);
      idx++;
    }
    if (filters?.domain) {
      conditions.push(`domains @> $${idx}::jsonb`);
      values.push(JSON.stringify([filters.domain]));
      idx++;
    }
    if (filters?.search) {
      conditions.push(`(
        LOWER(name) LIKE LOWER($${idx}) OR
        LOWER(short_name) LIKE LOWER($${idx}) OR
        LOWER(district) LIKE LOWER($${idx})
      )`);
      values.push(`%${filters.search}%`);
      idx++;
    }

    let query = 'SELECT * FROM institutions';
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ' ORDER BY name ASC';

    const res = await pool.query(query, values);
    return res.rows;
  }

  async findById(id: string): Promise<Institution | null> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM institutions WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async create(institution: Institution): Promise<Institution> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO institutions (
        id, name, short_name, type, district, state, domains,
        verified, active_projects_count, solved_count, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const values = [
      institution.id,
      institution.name,
      institution.short_name || null,
      institution.type,
      institution.district,
      institution.state || 'Jharkhand',
      JSON.stringify(institution.domains || []),
      institution.verified ?? true,
      institution.active_projects_count || 0,
      institution.solved_count || 0,
      institution.created_at || new Date().toISOString()
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }
}

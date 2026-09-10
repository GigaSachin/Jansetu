import { IProblemRepository, ProblemFilterOptions } from '../interfaces/IProblemRepository.js';
import { Problem, ProblemAttachment, ProblemStatusHistory, ProblemStatus } from '../../types/index.js';
import { Database } from '../../database/connection.js';

export class PostgresProblemRepository implements IProblemRepository {
  async create(problem: Problem): Promise<Problem> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO problems (
        id, issue_id, citizen_id, title, description, category,
        district, block, locality, village_town, state,
        latitude, longitude, severity, urgency, impact_level,
        estimated_affected_population, status, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16,
        $17, $18, $19, $20
      )
      RETURNING *
    `;
    const values = [
      problem.id,
      problem.issue_id,
      problem.citizen_id || null,
      problem.title,
      problem.description,
      problem.category,
      problem.district,
      problem.block || null,
      problem.locality || null,
      problem.village_town || null,
      problem.state || 'Jharkhand',
      problem.latitude || null,
      problem.longitude || null,
      problem.severity,
      problem.urgency,
      problem.impact_level,
      problem.estimated_affected_population || null,
      problem.status,
      problem.created_at,
      problem.updated_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async findById(id: string): Promise<Problem | null> {
    const pool = Database.getPool();
    const res = await pool.query(
      'SELECT * FROM problems WHERE id = $1 OR LOWER(issue_id) = LOWER($1)',
      [id.trim()]
    );
    return res.rows[0] || null;
  }

  async findByIssueId(issueId: string): Promise<Problem | null> {
    const pool = Database.getPool();
    const res = await pool.query(
      'SELECT * FROM problems WHERE LOWER(issue_id) = LOWER($1)',
      [issueId.trim()]
    );
    return res.rows[0] || null;
  }

  async findAll(filters?: ProblemFilterOptions): Promise<Problem[]> {
    const pool = Database.getPool();
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (filters?.district) {
      conditions.push(`LOWER(district) = LOWER($${idx})`);
      values.push(filters.district);
      idx++;
    }
    if (filters?.category) {
      conditions.push(`LOWER(category) = LOWER($${idx})`);
      values.push(filters.category);
      idx++;
    }
    if (filters?.status) {
      conditions.push(`LOWER(status) = LOWER($${idx})`);
      values.push(filters.status);
      idx++;
    }
    if (filters?.severity) {
      conditions.push(`LOWER(severity) = LOWER($${idx})`);
      values.push(filters.severity);
      idx++;
    }
    if (filters?.citizen_id) {
      conditions.push(`citizen_id = $${idx}`);
      values.push(filters.citizen_id);
      idx++;
    }
    if (filters?.search) {
      conditions.push(`(
        LOWER(title) LIKE LOWER($${idx}) OR
        LOWER(description) LIKE LOWER($${idx}) OR
        LOWER(issue_id) LIKE LOWER($${idx}) OR
        LOWER(district) LIKE LOWER($${idx})
      )`);
      values.push(`%${filters.search}%`);
      idx++;
    }

    let query = 'SELECT * FROM problems';
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ` LIMIT $${idx}`;
      values.push(filters.limit);
      idx++;
    }
    if (filters?.offset) {
      query += ` OFFSET $${idx}`;
      values.push(filters.offset);
      idx++;
    }

    const res = await pool.query(query, values);
    return res.rows;
  }

  async update(id: string, updates: Partial<Problem>): Promise<Problem | null> {
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
    const query = `UPDATE problems SET ${fields.join(', ')} WHERE id = $${idx} OR LOWER(issue_id) = LOWER($${idx}) RETURNING *`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
  }

  async updateStatus(
    id: string,
    status: ProblemStatus,
    notes?: string,
    changedBy = 'System',
    changedByRole = 'SYSTEM'
  ): Promise<Problem | null> {
    const pool = Database.getPool();
    const now = new Date().toISOString();

    const res = await pool.query(
      `UPDATE problems SET status = $1, updated_at = $2 WHERE id = $3 OR LOWER(issue_id) = LOWER($3) RETURNING *`,
      [status, now, id.trim()]
    );
    const updated = res.rows[0];
    if (!updated) return null;

    const histId = `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    await pool.query(
      `INSERT INTO problem_status_history (id, problem_id, status, notes, changed_by, changed_by_role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [histId, updated.id, status, notes || `Status updated to ${status}`, changedBy, changedByRole, now]
    );

    return updated;
  }

  async addAttachment(attachment: ProblemAttachment): Promise<ProblemAttachment> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO problem_attachments (id, problem_id, file_name, file_type, file_size, file_url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      attachment.id,
      attachment.problem_id,
      attachment.file_name,
      attachment.file_type,
      attachment.file_size,
      attachment.file_url,
      attachment.created_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async getAttachments(problemId: string): Promise<ProblemAttachment[]> {
    const pool = Database.getPool();
    const res = await pool.query(
      'SELECT * FROM problem_attachments WHERE problem_id = $1 ORDER BY created_at ASC',
      [problemId]
    );
    return res.rows;
  }

  async addStatusHistory(history: ProblemStatusHistory): Promise<ProblemStatusHistory> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO problem_status_history (id, problem_id, status, notes, changed_by, changed_by_role, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      history.id,
      history.problem_id,
      history.status,
      history.notes || null,
      history.changed_by || null,
      history.changed_by_role || null,
      history.created_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async getStatusHistory(problemId: string): Promise<ProblemStatusHistory[]> {
    const pool = Database.getPool();
    const res = await pool.query(
      'SELECT * FROM problem_status_history WHERE problem_id = $1 ORDER BY created_at ASC',
      [problemId]
    );
    return res.rows;
  }
}

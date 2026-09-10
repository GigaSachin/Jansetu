import { IAiAnalysisRepository } from '../interfaces/IAiAnalysisRepository.js';
import { AiAnalysis, InstitutionMatch, SimilarProblem } from '../../types/index.js';
import { Database } from '../../database/connection.js';

export class PostgresAiAnalysisRepository implements IAiAnalysisRepository {
  async saveAnalysis(analysis: AiAnalysis): Promise<AiAnalysis> {
    const pool = Database.getPool();
    const query = `
      INSERT INTO ai_analysis (
        id, problem_id, category, confidence, severity, urgency,
        impact_level, estimated_affected_population, recommended_action,
        engine_source, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (problem_id) DO UPDATE SET
        category = EXCLUDED.category,
        confidence = EXCLUDED.confidence,
        severity = EXCLUDED.severity,
        urgency = EXCLUDED.urgency,
        impact_level = EXCLUDED.impact_level,
        estimated_affected_population = EXCLUDED.estimated_affected_population,
        recommended_action = EXCLUDED.recommended_action,
        engine_source = EXCLUDED.engine_source,
        created_at = EXCLUDED.created_at
      RETURNING *
    `;
    const values = [
      analysis.id,
      analysis.problem_id,
      analysis.category,
      analysis.confidence,
      analysis.severity,
      analysis.urgency,
      analysis.impact_level,
      analysis.estimated_affected_population || null,
      analysis.recommended_action || null,
      analysis.engine_source || 'LIVE_FASTAPI_ENGINE',
      analysis.created_at
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  async getAnalysisByProblemId(problemId: string): Promise<AiAnalysis | null> {
    const pool = Database.getPool();
    const res = await pool.query('SELECT * FROM ai_analysis WHERE problem_id = $1', [problemId]);
    return res.rows[0] || null;
  }

  async saveMatches(matches: InstitutionMatch[]): Promise<InstitutionMatch[]> {
    if (matches.length === 0) return [];
    const pool = Database.getPool();
    const problemId = matches[0].problem_id;

    // Remove existing matches for this problem first
    await pool.query('DELETE FROM institution_matches WHERE problem_id = $1', [problemId]);

    const results: InstitutionMatch[] = [];
    for (const match of matches) {
      const query = `
        INSERT INTO institution_matches (id, problem_id, institution_id, match_score, reasons, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const values = [
        match.id,
        match.problem_id,
        match.institution_id,
        match.match_score,
        JSON.stringify(match.reasons || []),
        match.created_at
      ];
      const res = await pool.query(query, values);
      results.push(res.rows[0]);
    }
    return results;
  }

  async getMatchesByProblemId(problemId: string): Promise<InstitutionMatch[]> {
    const pool = Database.getPool();
    const query = `
      SELECT m.*, i.name as institution_name
      FROM institution_matches m
      LEFT JOIN institutions i ON m.institution_id = i.id
      WHERE m.problem_id = $1
      ORDER BY m.match_score DESC
    `;
    const res = await pool.query(query, [problemId]);
    return res.rows;
  }

  async saveSimilarProblems(problems: SimilarProblem[]): Promise<SimilarProblem[]> {
    if (problems.length === 0) return [];
    const pool = Database.getPool();
    const problemId = problems[0].problem_id;

    await pool.query('DELETE FROM similar_problems WHERE problem_id = $1', [problemId]);

    const results: SimilarProblem[] = [];
    for (const sim of problems) {
      const query = `
        INSERT INTO similar_problems (id, problem_id, similar_problem_id, similarity, relationship, blueprint_url, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        sim.id,
        sim.problem_id,
        sim.similar_problem_id,
        sim.similarity,
        sim.relationship,
        sim.blueprint_url || null,
        sim.created_at
      ];
      const res = await pool.query(query, values);
      results.push(res.rows[0]);
    }
    return results;
  }

  async getSimilarProblemsByProblemId(problemId: string): Promise<SimilarProblem[]> {
    const pool = Database.getPool();
    const res = await pool.query(
      'SELECT * FROM similar_problems WHERE problem_id = $1 ORDER BY similarity DESC',
      [problemId]
    );
    return res.rows;
  }
}

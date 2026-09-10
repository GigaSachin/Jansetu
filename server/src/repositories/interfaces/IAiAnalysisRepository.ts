import { AiAnalysis, InstitutionMatch, SimilarProblem } from '../../types/index.js';

export interface IAiAnalysisRepository {
  saveAnalysis(analysis: AiAnalysis): Promise<AiAnalysis>;
  getAnalysisByProblemId(problemId: string): Promise<AiAnalysis | null>;
  
  saveMatches(matches: InstitutionMatch[]): Promise<InstitutionMatch[]>;
  getMatchesByProblemId(problemId: string): Promise<InstitutionMatch[]>;

  saveSimilarProblems(problems: SimilarProblem[]): Promise<SimilarProblem[]>;
  getSimilarProblemsByProblemId(problemId: string): Promise<SimilarProblem[]>;
}

export type UserRole = 'CITIZEN' | 'GOVERNMENT' | 'UNIVERSITY' | 'INDUSTRY_CSR';

export type ProblemStatus = 
  | 'REPORTED'
  | 'AI_ANALYZING'
  | 'AI_ANALYZED'
  | 'POTENTIAL_MATCH'
  | 'GOVERNMENT_REVIEW'
  | 'SOLUTION_DEVELOPMENT'
  | 'RESOLVED';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ImpactLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type AttachmentType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role: UserRole;
  district: string;
  created_at: string;
  updated_at: string;
}

export interface UserSanitized {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  district: string;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: string;
  name: string;
  short_name?: string;
  type: string;
  district: string;
  state: string;
  domains: string[];
  verified: boolean;
  active_projects_count: number;
  solved_count: number;
  created_at?: string;
}

export interface Problem {
  id: string;
  issue_id: string;
  citizen_id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  block?: string;
  locality?: string;
  village_town?: string;
  state: string;
  latitude?: number;
  longitude?: number;
  severity: SeverityLevel;
  urgency: UrgencyLevel;
  impact_level: ImpactLevel;
  estimated_affected_population?: string;
  status: ProblemStatus;
  created_at: string;
  updated_at: string;
}

export interface ProblemAttachment {
  id: string;
  problem_id: string;
  file_name: string;
  file_type: AttachmentType;
  file_size: number;
  file_url: string;
  created_at: string;
}

export interface ProblemStatusHistory {
  id: string;
  problem_id: string;
  status: ProblemStatus;
  notes?: string;
  changed_by?: string;
  changed_by_role?: string;
  created_at: string;
}

export interface AiAnalysis {
  id: string;
  problem_id: string;
  category: string;
  confidence: number;
  severity: SeverityLevel;
  urgency: UrgencyLevel;
  impact_level: ImpactLevel;
  estimated_affected_population?: string;
  recommended_action?: string;
  engine_source: string;
  created_at: string;
}

export interface InstitutionMatch {
  id: string;
  problem_id: string;
  institution_id: string;
  institution_name?: string;
  match_score: number;
  reasons: string[];
  created_at: string;
}

export interface SimilarProblem {
  id: string;
  problem_id: string;
  similar_problem_id: string;
  similarity: number;
  relationship: string;
  blueprint_url?: string;
  created_at: string;
}

export interface Solution {
  id: string;
  problem_id: string;
  title: string;
  description: string;
  status: string;
  submitted_by?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  issue_id?: string;
  target_url?: string;
  created_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  district: string;
}

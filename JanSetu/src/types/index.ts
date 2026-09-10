export type Role = 'citizen' | 'government' | 'university' | 'industry';

export type IssueCategory = 
  | 'Roads & Transport'
  | 'Water & Sanitation'
  | 'Waste Management'
  | 'Electricity & Lighting'
  | 'Healthcare Access'
  | 'Education Infrastructure'
  | 'Environment & Greenery'
  | 'Agriculture & Rural'
  | 'Public Safety'
  | 'Accessibility & Inclusion'
  | 'Public Infrastructure'
  | 'Digital Services'
  | 'Women & Child Safety'
  | 'Other';

export type IssueStatus = 
  | 'REPORTED'
  | 'AI_ANALYZING'
  | 'AI_ANALYZED'
  | 'POTENTIAL_MATCH'
  | 'GOVERNMENT_REVIEW'
  | 'VERIFIED'
  | 'MATCHED'
  | 'COLLABORATING'
  | 'SOLUTION_DEVELOPMENT'
  | 'PROTOTYPING'
  | 'DEPLOYED'
  | 'IMPACT_VERIFIED'
  | 'RESOLVED'
  | 'REJECTED';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LocationInfo {
  locality: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EvidenceFile {
  id: string;
  name: string;
  size: number;
  type: string; // 'image' | 'video' | 'document'
  url: string;
  uploadedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  completedAt?: string;
  assignedTo?: string;
}

export interface CollaboratorMatch {
  id: string;
  name: string;
  type: 'university' | 'industry' | 'government';
  matchScore: number;
  matchReasons: string[];
  departmentOrIndustry?: string;
  avatarUrl?: string;
  location: string;
}

export interface IssueUpdate {
  id: string;
  timestamp: string;
  authorName: string;
  authorRole: Role;
  authorOrganization?: string;
  content: string;
  stage: IssueStatus;
  mediaUrls?: string[];
}

export interface Issue {
  id: string; // e.g. JS-2026-001245
  title: string;
  category: IssueCategory;
  description: string;
  location: LocationInfo;
  severity: SeverityLevel;
  status: IssueStatus;
  progressPercent: number;
  reportedBy: {
    id: string;
    name: string;
    avatar?: string;
    isAnonymous?: boolean;
  };
  reportedAt: string;
  evidence: EvidenceFile[];
  estimatedPeopleAffected: number;
  upvotesCount: number;
  hasUpvoted?: boolean;
  
  // Collaborative Resolution Data
  matchedTeam?: {
    institutionName: string;
    teamName: string;
    leaderName: string;
    membersCount: number;
    matchScore: number;
    startDate: string;
  };
  industryPartner?: {
    name: string;
    supportType: 'Funding' | 'Mentorship' | 'Technology' | 'Equipment';
    commitment: string;
  };
  govtAuthority?: {
    department: string;
    officerName: string;
    district: string;
    statusNote: string;
  };
  
  solutionSummary?: string;
  milestones: Milestone[];
  updates: IssueUpdate[];
  impactMetric?: {
    metricValue: string;
    metricLabel: string;
    beneficiariesCount: number;
    verifiedBy: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  location: string;
  // Specific role metadata
  institution?: string; // University
  department?: string; // University or Govt
  academicRole?: 'Student' | 'Faculty' | 'Researcher' | 'Admin'; // University
  governmentDesignation?: string; // Govt
  jurisdiction?: string; // Govt
  organizationName?: string; // Industry
  industrySector?: string; // Industry
  csrFocusAreas?: string[]; // Industry
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  type: 'Central University' | 'State University' | 'IIT' | 'NIT' | 'Autonomous Institute' | 'College';
  city: string;
  state: string;
  verified: boolean;
  logo: string;
  departments: string[];
  activeProjectsCount: number;
  solvedCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'STATUS_UPDATE' | 'MATCH_FOUND' | 'PROPOSAL' | 'VERIFICATION' | 'IMPACT';
  issueId?: string;
  targetUrl?: string;
}

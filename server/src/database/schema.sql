-- JanSetu PostgreSQL Schema
-- Phase 4 Backend Core Tables

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(32),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('CITIZEN', 'GOVERNMENT', 'UNIVERSITY', 'INDUSTRY_CSR')),
    district VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Institutions Table
CREATE TABLE IF NOT EXISTS institutions (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64),
    type VARCHAR(64) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT 'Jharkhand',
    domains JSONB DEFAULT '[]'::jsonb,
    verified BOOLEAN DEFAULT true,
    active_projects_count INT DEFAULT 0,
    solved_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Problems Table
CREATE TABLE IF NOT EXISTS problems (
    id VARCHAR(64) PRIMARY KEY,
    issue_id VARCHAR(64) UNIQUE NOT NULL,
    citizen_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100),
    locality VARCHAR(100),
    village_town VARCHAR(100),
    state VARCHAR(100) DEFAULT 'Jharkhand',
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    severity VARCHAR(32) NOT NULL DEFAULT 'MEDIUM' CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    urgency VARCHAR(32) NOT NULL DEFAULT 'MEDIUM' CHECK (urgency IN ('LOW', 'MEDIUM', 'HIGH')),
    impact_level VARCHAR(32) NOT NULL DEFAULT 'MEDIUM' CHECK (impact_level IN ('LOW', 'MEDIUM', 'HIGH')),
    estimated_affected_population VARCHAR(255),
    status VARCHAR(64) NOT NULL DEFAULT 'REPORTED' CHECK (status IN (
        'REPORTED', 'AI_ANALYZING', 'AI_ANALYZED', 'POTENTIAL_MATCH', 
        'GOVERNMENT_REVIEW', 'SOLUTION_DEVELOPMENT', 'RESOLVED'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Problem Attachments
CREATE TABLE IF NOT EXISTS problem_attachments (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(32) NOT NULL CHECK (file_type IN ('IMAGE', 'VIDEO', 'DOCUMENT')),
    file_size BIGINT NOT NULL,
    file_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Problem Status History
CREATE TABLE IF NOT EXISTS problem_status_history (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    status VARCHAR(64) NOT NULL,
    notes TEXT,
    changed_by VARCHAR(255),
    changed_by_role VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI Analysis Table
CREATE TABLE IF NOT EXISTS ai_analysis (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) UNIQUE NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    confidence DECIMAL(5, 4) NOT NULL,
    severity VARCHAR(32) NOT NULL,
    urgency VARCHAR(32) NOT NULL,
    impact_level VARCHAR(32) NOT NULL,
    estimated_affected_population VARCHAR(255),
    recommended_action VARCHAR(255),
    engine_source VARCHAR(64) DEFAULT 'LIVE_FASTAPI_ENGINE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Institution Matches
CREATE TABLE IF NOT EXISTS institution_matches (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    match_score DECIMAL(5, 4) NOT NULL,
    reasons JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Similar Problems
CREATE TABLE IF NOT EXISTS similar_problems (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    similar_problem_id VARCHAR(64) NOT NULL,
    similarity DECIMAL(5, 4) NOT NULL,
    relationship VARCHAR(64) NOT NULL,
    blueprint_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Solutions Table
CREATE TABLE IF NOT EXISTS solutions (
    id VARCHAR(64) PRIMARY KEY,
    problem_id VARCHAR(64) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'PROPOSED',
    submitted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(64) NOT NULL,
    is_read BOOLEAN DEFAULT false,
    issue_id VARCHAR(64),
    target_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_problems_issue_id ON problems(issue_id);
CREATE INDEX IF NOT EXISTS idx_problems_citizen_id ON problems(citizen_id);
CREATE INDEX IF NOT EXISTS idx_problems_status ON problems(status);
CREATE INDEX IF NOT EXISTS idx_problems_district ON problems(district);
CREATE INDEX IF NOT EXISTS idx_problems_category ON problems(category);
CREATE INDEX IF NOT EXISTS idx_status_history_problem ON problem_status_history(problem_id);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_problem ON ai_analysis(problem_id);
CREATE INDEX IF NOT EXISTS idx_inst_matches_problem ON institution_matches(problem_id);
CREATE INDEX IF NOT EXISTS idx_sim_problems_problem ON similar_problems(problem_id);

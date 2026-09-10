import bcrypt from 'bcryptjs';
import { User, Institution, Problem, ProblemStatusHistory, AiAnalysis, InstitutionMatch, SimilarProblem } from '../types/index.js';

export const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'East Singhbhum',
  'Bokaro',
  'Hazaribagh',
  'Ramgarh',
  'Deoghar',
  'Giridih',
  'Palamu',
  'Dumka',
  'West Singhbhum',
  'Saraikela Kharsawan',
  'Chatra',
  'Gumla',
  'Godda',
  'Garhwa',
  'Sahebganj',
  'Pakur',
  'Jamtara',
  'Latehar',
  'Koderma',
  'Simdega',
  'Khunti',
  'Lohardaga'
];

export const SEED_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-bit-mesra',
    name: 'Birla Institute of Technology (BIT) Mesra',
    short_name: 'BIT Mesra',
    type: 'Autonomous Institute / Deemed University',
    district: 'Ranchi',
    state: 'Jharkhand',
    domains: ['Water & Sanitation', 'Electricity & Lighting', 'Roads & Transport', 'Waste Management', 'Digital Services', 'Public Infrastructure'],
    verified: true,
    active_projects_count: 14,
    solved_count: 28,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-iit-ism-dhanbad',
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    short_name: 'IIT (ISM) Dhanbad',
    type: 'IIT',
    district: 'Dhanbad',
    state: 'Jharkhand',
    domains: ['Environment & Greenery', 'Roads & Transport', 'Waste Management', 'Water & Sanitation', 'Public Safety', 'Electricity & Lighting'],
    verified: true,
    active_projects_count: 19,
    solved_count: 34,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-nit-jamshedpur',
    name: 'National Institute of Technology (NIT) Jamshedpur',
    short_name: 'NIT Jamshedpur',
    type: 'NIT',
    district: 'East Singhbhum',
    state: 'Jharkhand',
    domains: ['Roads & Transport', 'Electricity & Lighting', 'Public Infrastructure', 'Water & Sanitation', 'Accessibility & Inclusion'],
    verified: true,
    active_projects_count: 11,
    solved_count: 22,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-bit-sindri',
    name: 'BIT Sindri',
    short_name: 'BIT Sindri',
    type: 'State University Institute',
    district: 'Dhanbad',
    state: 'Jharkhand',
    domains: ['Roads & Transport', 'Water & Sanitation', 'Waste Management', 'Public Infrastructure', 'Agriculture & Rural'],
    verified: true,
    active_projects_count: 9,
    solved_count: 18,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-bau-ranchi',
    name: 'Birsa Agricultural University (BAU) Ranchi',
    short_name: 'BAU Ranchi',
    type: 'State Agricultural University',
    district: 'Ranchi',
    state: 'Jharkhand',
    domains: ['Agriculture & Rural', 'Environment & Greenery', 'Water & Sanitation', 'Waste Management'],
    verified: true,
    active_projects_count: 12,
    solved_count: 26,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-cuj-ranchi',
    name: 'Central University of Jharkhand (CUJ) Ranchi',
    short_name: 'CUJ Ranchi',
    type: 'Central University',
    district: 'Ranchi',
    state: 'Jharkhand',
    domains: ['Education Infrastructure', 'Environment & Greenery', 'Public Safety', 'Digital Services', 'Water & Sanitation'],
    verified: true,
    active_projects_count: 8,
    solved_count: 15,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-iiit-ranchi',
    name: 'Indian Institute of Information Technology (IIIT) Ranchi',
    short_name: 'IIIT Ranchi',
    type: 'Autonomous Institute',
    district: 'Ranchi',
    state: 'Jharkhand',
    domains: ['Digital Services', 'Public Safety', 'Education Infrastructure', 'Waste Management'],
    verified: true,
    active_projects_count: 7,
    solved_count: 12,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-vbu-hazaribagh',
    name: 'Vinoba Bhave University (VBU) Hazaribagh',
    short_name: 'VBU Hazaribagh',
    type: 'State University',
    district: 'Hazaribagh',
    state: 'Jharkhand',
    domains: ['Education Infrastructure', 'Healthcare Access', 'Environment & Greenery', 'Accessibility & Inclusion'],
    verified: true,
    active_projects_count: 6,
    solved_count: 14,
    created_at: new Date('2026-01-01').toISOString()
  },
  {
    id: 'inst-skmu-dumka',
    name: 'Sido Kanhu Murmu University (SKMU) Dumka',
    short_name: 'SKMU Dumka',
    type: 'State University',
    district: 'Dumka',
    state: 'Jharkhand',
    domains: ['Agriculture & Rural', 'Water & Sanitation', 'Education Infrastructure', 'Environment & Greenery'],
    verified: true,
    active_projects_count: 5,
    solved_count: 10,
    created_at: new Date('2026-01-01').toISOString()
  }
];

// Pre-generated bcrypt hashes for demo passwords (salt rounds = 10)
// 'Citizen@123' -> $2a$10$w85m1qIeQ5p9fGv9U7lZ4u9CkgbJc0n7lK8zH5j9Y.Qo3s8p8r8e2
// Using runtime hash or deterministic seed hashes:
export function getInitialDemoUsers(): User[] {
  const citizenHash = bcrypt.hashSync('Citizen@123', 10);
  const govHash = bcrypt.hashSync('Gov@123', 10);
  const uniHash = bcrypt.hashSync('Uni@123', 10);
  const csrHash = bcrypt.hashSync('Csr@123', 10);
  const now = new Date().toISOString();

  return [
    {
      id: 'usr-citizen-demo',
      name: 'Pooja Verma',
      email: 'citizen@jansetu.in',
      phone: '+91 9876543210',
      password_hash: citizenHash,
      role: 'CITIZEN',
      district: 'Ramgarh',
      created_at: now,
      updated_at: now
    },
    {
      id: 'usr-gov-demo',
      name: 'Dr. Rajeshwar Sharma',
      email: 'government@jharkhand.gov.in',
      phone: '+91 9431100001',
      password_hash: govHash,
      role: 'GOVERNMENT',
      district: 'Ranchi',
      created_at: now,
      updated_at: now
    },
    {
      id: 'usr-uni-demo',
      name: 'Prof. Arvind K. Mishra',
      email: 'dean@bitmesra.ac.in',
      phone: '+91 9431100002',
      password_hash: uniHash,
      role: 'UNIVERSITY',
      district: 'Ranchi',
      created_at: now,
      updated_at: now
    },
    {
      id: 'usr-csr-demo',
      name: 'Sunil Sen (Tata Steel CSR)',
      email: 'csr@tatasteel.com',
      phone: '+91 9431100003',
      password_hash: csrHash,
      role: 'INDUSTRY_CSR',
      district: 'East Singhbhum',
      created_at: now,
      updated_at: now
    }
  ];
}

export function getInitialProblems(): Problem[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'prob-seed-001',
      issue_id: 'JS-JH-2026-001245',
      citizen_id: 'usr-citizen-demo',
      title: 'Monsoon Waterlogging & Severe Drain Overflow Near Govt School',
      description: 'During moderate to heavy rains, dirty storm water floods the entrance and classrooms of Rajkiya Kanya Vidyalaya. Over 800 school children and local residents are stranded with waterborne infection hazards.',
      category: 'Water & Sanitation',
      district: 'Ramgarh',
      block: 'Ramgarh Sadar',
      locality: 'Near Old Bus Stand & School Road',
      village_town: 'Ramgarh Cantt',
      state: 'Jharkhand',
      latitude: 23.6334,
      longitude: 85.5186,
      severity: 'HIGH',
      urgency: 'HIGH',
      impact_level: 'HIGH',
      estimated_affected_population: '1,200 - 2,500 Citizens',
      status: 'GOVERNMENT_REVIEW',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: now
    },
    {
      id: 'prob-seed-002',
      issue_id: 'JS-JH-2026-002891',
      citizen_id: 'usr-citizen-demo',
      title: 'Broken Solar Microgrid & Frequent Blackouts in Tribal Hamlet',
      description: 'The community solar microgrid transformer failed after lightning strike 2 months ago. Primary health center vaccine storage and 150 households are running without electricity.',
      category: 'Electricity & Lighting',
      district: 'Khunti',
      block: 'Torpa',
      locality: 'Dorma Panchayat',
      village_town: 'Dorma',
      state: 'Jharkhand',
      latitude: 22.9511,
      longitude: 85.2289,
      severity: 'HIGH',
      urgency: 'HIGH',
      impact_level: 'MEDIUM',
      estimated_affected_population: '650 Tribal Residents',
      status: 'AI_ANALYZED',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: now
    },
    {
      id: 'prob-seed-003',
      issue_id: 'JS-JH-2026-003410',
      citizen_id: 'usr-citizen-demo',
      title: 'Soil Erosion and Mine Runoff Siltation in Farm Irrigation Canals',
      description: 'Heavy coal mine overburden runoff has clogged 3km of primary irrigation channel, acidic mine silt is reducing paddy yield across 4 adjacent villages.',
      category: 'Agriculture & Rural',
      district: 'Dhanbad',
      block: 'Baghmara',
      locality: 'Katras Basin',
      village_town: 'Baghmara',
      state: 'Jharkhand',
      latitude: 23.7957,
      longitude: 86.2081,
      severity: 'HIGH',
      urgency: 'MEDIUM',
      impact_level: 'HIGH',
      estimated_affected_population: '3,800 Farmers & Families',
      status: 'POTENTIAL_MATCH',
      created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
      updated_at: now
    }
  ];
}

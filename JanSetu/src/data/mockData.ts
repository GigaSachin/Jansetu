import { Issue, Institution, UserProfile, Notification, CollaboratorMatch } from '../types';

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-1',
    name: 'Birla Institute of Technology, Mesra (BIT Mesra)',
    shortName: 'BIT Mesra',
    type: 'Autonomous Institute',
    city: 'Ranchi',
    state: 'Jharkhand',
    verified: true,
    logo: '🎓',
    departments: ['Civil & Environmental Engineering', 'Computer Science & AI', 'Water Resource Engg', 'Remote Sensing'],
    activeProjectsCount: 16,
    solvedCount: 42,
  },
  {
    id: 'inst-2',
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    shortName: 'IIT (ISM) Dhanbad',
    type: 'IIT',
    city: 'Dhanbad',
    state: 'Jharkhand',
    verified: true,
    logo: '⚡',
    departments: ['Environmental Science & Engg', 'Mining Machinery', 'Civil Engineering', 'Smart Sensors & IoT'],
    activeProjectsCount: 22,
    solvedCount: 58,
  },
  {
    id: 'inst-3',
    name: 'National Institute of Technology Jamshedpur (NIT Jamshedpur)',
    shortName: 'NIT Jamshedpur',
    type: 'NIT',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    verified: true,
    logo: '🔬',
    departments: ['Civil & Structural Engg', 'Mechanical & Materials', 'Electrical & Renewable Grids'],
    activeProjectsCount: 18,
    solvedCount: 46,
  },
  {
    id: 'inst-4',
    name: 'Birsa Institute of Technology Sindri (BIT Sindri)',
    shortName: 'BIT Sindri',
    type: 'State University',
    city: 'Dhanbad',
    state: 'Jharkhand',
    verified: true,
    logo: '🛠️',
    departments: ['Civil Systems', 'Chemical & Waste Recycling', 'Mechanical Engineering'],
    activeProjectsCount: 14,
    solvedCount: 34,
  },
  {
    id: 'inst-5',
    name: 'Birsa Agricultural University (BAU Ranchi)',
    shortName: 'BAU Ranchi',
    type: 'State University',
    city: 'Ranchi',
    state: 'Jharkhand',
    verified: true,
    logo: '🌱',
    departments: ['Agronomy & Soil Conservation', 'Bio-waste & Composting', 'Agricultural Engineering'],
    activeProjectsCount: 12,
    solvedCount: 29,
  },
  {
    id: 'inst-6',
    name: 'Central University of Jharkhand (CUJ Ranchi)',
    shortName: 'CUJ Ranchi',
    type: 'Central University',
    city: 'Ranchi',
    state: 'Jharkhand',
    verified: true,
    logo: '🏛️',
    departments: ['Water Engineering & Management', 'Energy Engineering', 'Tribal & Rural Development'],
    activeProjectsCount: 11,
    solvedCount: 26,
  },
  {
    id: 'inst-7',
    name: 'Indian Institute of Information Technology Ranchi (IIIT Ranchi)',
    shortName: 'IIIT Ranchi',
    type: 'Autonomous Institute',
    city: 'Ranchi',
    state: 'Jharkhand',
    verified: true,
    logo: '💻',
    departments: ['Embedded Systems & IoT', 'Data Science & Civic AI', 'Computer Vision'],
    activeProjectsCount: 9,
    solvedCount: 21,
  },
  {
    id: 'inst-8',
    name: 'Vinoba Bhave University (VBU Hazaribagh)',
    shortName: 'VBU Hazaribagh',
    type: 'State University',
    city: 'Hazaribagh',
    state: 'Jharkhand',
    verified: true,
    logo: '📚',
    departments: ['Botany & Biotechnology', 'Physics & Instrumentation', 'Rural Economics'],
    activeProjectsCount: 8,
    solvedCount: 19,
  },
  {
    id: 'inst-9',
    name: 'Sido Kanhu Murmu University (SKMU Dumka)',
    shortName: 'SKMU Dumka',
    type: 'State University',
    city: 'Dumka',
    state: 'Jharkhand',
    verified: true,
    logo: '🌾',
    departments: ['Rural Livelihoods', 'Environmental Studies', 'Water Resources'],
    activeProjectsCount: 7,
    solvedCount: 16,
  }
];

export const MOCK_ISSUES: Issue[] = [
  {
    id: 'JS-2026-001245',
    title: 'Chronic Monsoon Waterlogging Near Dushad Primary School',
    category: 'Water & Sanitation',
    description: 'During moderate to heavy rains, the approach road and school entrance in Dushad Mohalla get submerged under 1.5 to 2 feet of stagnant water for over 5 days. Over 450 school children are unable to reach classrooms safely, and stagnant drain overflow poses immediate dengue and malaria risk.',
    location: {
      locality: 'Dushad Mohalla, Ward 12',
      city: 'Ramgarh Cantonment',
      district: 'Ramgarh',
      state: 'Jharkhand',
      pincode: '829122',
      coordinates: { lat: 23.6338, lng: 85.5186 }
    },
    severity: 'HIGH',
    status: 'PROTOTYPING',
    progressPercent: 72,
    reportedBy: {
      id: 'usr-cit-1',
      name: 'Pooja Verma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-08-14T09:30:00Z',
    evidence: [
      {
        id: 'ev-1',
        name: 'waterlogging_school_gate.jpg',
        size: 2450000,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
        uploadedAt: '2026-08-14T09:30:00Z'
      },
      {
        id: 'ev-2',
        name: 'overflow_drainage_survey.pdf',
        size: 1150000,
        type: 'document',
        url: '#',
        uploadedAt: '2026-08-14T09:35:00Z'
      }
    ],
    estimatedPeopleAffected: 2400,
    upvotesCount: 342,
    hasUpvoted: true,
    matchedTeam: {
      institutionName: 'Birla Institute of Technology, Mesra (BIT Mesra)',
      teamName: 'HydroSolv BIT Mesra Cohort',
      leaderName: 'Prof. Rajesh Kumar Sinha & 4 M.Tech Civil Scholars',
      membersCount: 5,
      matchScore: 91,
      startDate: '2026-08-20'
    },
    industryPartner: {
      name: 'Tata Steel CSR & Rural Infrastructure Foundation',
      supportType: 'Funding',
      commitment: 'Demo Support: Fly-Ash Permeable Paving Block Matrix & Hydraulic Flow Sensors'
    },
    govtAuthority: {
      department: 'Ramgarh Municipal Council & PWD Division',
      officerName: 'Er. Rajeshwar Soren (Executive Officer)',
      district: 'Ramgarh',
      statusNote: 'Excavation & Culvert Channeling Sanctioned under Urban Drainage Reform.'
    },
    solutionSummary: 'Modular gravity-assisted permeable sub-surface drainage channel with modular filtration blocks manufactured from locally recycled fly-ash aggregate.',
    milestones: [
      {
        id: 'ms-1',
        title: 'Problem Verified by Municipal Engineer',
        description: 'On-ground verification confirmed storm drain elevation mismatch causing backward reflux.',
        status: 'COMPLETED',
        completedAt: '2026-08-16',
        assignedTo: 'Ramgarh Municipality'
      },
      {
        id: 'ms-2',
        title: 'AI Match: BIT Mesra Civil Engineering Team Allocated',
        description: 'BIT Mesra Hydro team matched with 91% capability index for gradient water flow analysis.',
        status: 'COMPLETED',
        completedAt: '2026-08-20',
        assignedTo: 'JanSetu Matchmaker'
      },
      {
        id: 'ms-3',
        title: 'Field Topography & Hydraulic Modeling Done',
        description: 'Team completed 3D slope profiling and water volume surge calculations.',
        status: 'COMPLETED',
        completedAt: '2026-08-28',
        assignedTo: 'HydroSolv Team'
      },
      {
        id: 'ms-4',
        title: 'Prototype Drainage Matrix & Pilot Fabrication',
        description: 'Casting 40 modular permeable tiles and interlocking bio-swale filters with Tata Steel CSR support.',
        status: 'IN_PROGRESS',
        assignedTo: 'BIT Mesra & CSR Partner'
      },
      {
        id: 'ms-5',
        title: 'On-Site Municipal Deployment & Paving',
        description: 'PWD to install drainage tiles along 320m stretch before upcoming rains.',
        status: 'PENDING',
        assignedTo: 'PWD Ramgarh'
      },
      {
        id: 'ms-6',
        title: 'Post-Deployment Flow Impact Audit',
        description: 'Verify 0% water accumulation during heavy rainfall events.',
        status: 'PENDING',
        assignedTo: 'JanSetu Independent Audit'
      }
    ],
    updates: [
      {
        id: 'upd-1',
        timestamp: '2026-09-02T14:15:00Z',
        authorName: 'Prof. Rajesh Kumar Sinha',
        authorRole: 'university',
        authorOrganization: 'BIT Mesra',
        content: 'Completed physical load testing of the fly-ash porous concrete blocks in our civil laboratory. Achieved 24 MPa compressive strength while allowing 180mm/hr percolation rate.',
        stage: 'PROTOTYPING'
      },
      {
        id: 'upd-2',
        timestamp: '2026-08-25T11:00:00Z',
        authorName: 'CSR Coordinator',
        authorRole: 'industry',
        authorOrganization: 'Tata Steel Rural Development (Demo)',
        content: 'Approved prototype grant support for local raw materials, pre-cast molds, and civic installation tooling.',
        stage: 'COLLABORATING'
      },
      {
        id: 'upd-3',
        timestamp: '2026-08-16T17:45:00Z',
        authorName: 'Er. Rajeshwar Soren',
        authorRole: 'government',
        authorOrganization: 'Ramgarh Municipal Council',
        content: 'Ward 12 location verified in person. Confirmed that natural drain was blocked by illegal debris. PWD clearance ordered.',
        stage: 'VERIFIED'
      }
    ],
    impactMetric: {
      metricValue: '2,400+',
      metricLabel: 'School Students & Residents Free from Stagnant Floodwaters (Prototype Target)',
      beneficiariesCount: 2400,
      verifiedBy: 'Ramgarh District Education Directorate'
    }
  },
  {
    id: 'JS-2026-000982',
    title: 'Recurrent Hospital Corridor Accessibility Failure for Wheelchairs',
    category: 'Accessibility & Inclusion',
    description: 'The entrance ramp and outpatient corridor of Hazaribagh Sadar Hospital have an 18-degree steep gradient with no tactile indicators or handrails. Elderly patients and differently-abled individuals cannot navigate without 2 assistants.',
    location: {
      locality: 'Hospital Road, Near Matwari',
      city: 'Hazaribagh',
      district: 'Hazaribagh',
      state: 'Jharkhand',
      pincode: '825301',
      coordinates: { lat: 23.9925, lng: 85.3637 }
    },
    severity: 'MEDIUM',
    status: 'DEPLOYED',
    progressPercent: 90,
    reportedBy: {
      id: 'usr-cit-2',
      name: 'Rajat Mishra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-07-10T10:00:00Z',
    evidence: [
      {
        id: 'ev-3',
        name: 'steep_ramp_photo.jpg',
        size: 1800000,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
        uploadedAt: '2026-07-10T10:00:00Z'
      }
    ],
    estimatedPeopleAffected: 18000,
    upvotesCount: 512,
    hasUpvoted: false,
    matchedTeam: {
      institutionName: 'Birsa Institute of Technology Sindri (BIT Sindri)',
      teamName: 'ErgoAssist Innovations BIT Sindri',
      leaderName: 'Dr. Sunita Senapati & Team',
      membersCount: 4,
      matchScore: 89,
      startDate: '2026-07-18'
    },
    industryPartner: {
      name: 'Central Coalfields Limited (CCL) CSR Trust',
      supportType: 'Technology',
      commitment: 'Demo Support: High-durability stainless steel modular ramping & tactile rubber matrix'
    },
    govtAuthority: {
      department: 'Chief Medical Officer (CMO) Hazaribagh',
      officerName: 'Dr. B. K. Patel (Superintendent)',
      district: 'Hazaribagh',
      statusNote: 'Universal accessibility retrofit completed across 3 hospital entryways.'
    },
    solutionSummary: 'Ergonomic 1:12 slope modular interlocking aluminum ramps with smart solar night path lighting and non-skid polyurethane grip strips.',
    milestones: [
      { id: 'm-1', title: 'District Medical Officer Verified', description: 'CMO prioritized hospital zone under Accessible India Initiative.', status: 'COMPLETED', completedAt: '2026-07-12' },
      { id: 'm-2', title: 'BIT Sindri Ergonomics Modeling', description: 'Simulated assisted torque and wheelchair push effort.', status: 'COMPLETED', completedAt: '2026-07-28' },
      { id: 'm-3', title: 'Modular Fabrication & Anti-slip Coating', description: 'Fabricated weather-resistant tactile tracks.', status: 'COMPLETED', completedAt: '2026-08-15' },
      { id: 'm-4', title: 'Full Hospital Installation Completed', description: 'PWD and team installed 45 meters of retrofitted ramps.', status: 'COMPLETED', completedAt: '2026-08-30' },
      { id: 'm-5', title: 'Independent Accessibility Audit', description: 'Audit with local Divyangjan association.', status: 'IN_PROGRESS' }
    ],
    updates: [
      {
        id: 'upd-4',
        timestamp: '2026-09-01T09:00:00Z',
        authorName: 'Dr. B. K. Patel',
        authorRole: 'government',
        authorOrganization: 'CMO Hazaribagh',
        content: 'Ramp installation completed and operational. Daily outpatient feedback has been overwhelmingly positive with zero assistance calls needed.',
        stage: 'DEPLOYED'
      }
    ],
    impactMetric: {
      metricValue: '600+ Patients/Day',
      metricLabel: 'Independent Safe Hospital Mobility Without Slipping',
      beneficiariesCount: 18000,
      verifiedBy: 'Jharkhand State Disability Commissioner (Demo Audit)'
    }
  },
  {
    id: 'JS-2026-001309',
    title: 'Market Vegetable Waste Rotting in Open Vats at Daily Haat',
    category: 'Waste Management',
    description: 'Over 1.8 metric tonnes of organic wet vegetable waste from 160 vendors is dumped daily in open unlined bins at Kanke Daily Market. Foul smell, cattle hazards, and leachate runoff contaminate surrounding groundwater and shopkeeper health.',
    location: {
      locality: 'Kanke Block Mandi Road',
      city: 'Ranchi',
      district: 'Ranchi',
      state: 'Jharkhand',
      pincode: '834006',
      coordinates: { lat: 23.4324, lng: 85.3218 }
    },
    severity: 'HIGH',
    status: 'COLLABORATING',
    progressPercent: 54,
    reportedBy: {
      id: 'usr-cit-3',
      name: 'Ashok Mohanty (Merchant Assoc.)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-08-22T16:20:00Z',
    evidence: [
      {
        id: 'ev-4',
        name: 'market_waste_heap.jpg',
        size: 3100000,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
        uploadedAt: '2026-08-22T16:20:00Z'
      }
    ],
    estimatedPeopleAffected: 12500,
    upvotesCount: 289,
    hasUpvoted: true,
    matchedTeam: {
      institutionName: 'Birsa Agricultural University (BAU Ranchi)',
      teamName: 'EcoBioTech Research Group',
      leaderName: 'Dr. Debasis Pattnaik (Biotechnology)',
      membersCount: 6,
      matchScore: 96,
      startDate: '2026-08-29'
    },
    industryPartner: {
      name: 'Jindal Steel & Power Sustainability Group (Demo)',
      supportType: 'Equipment',
      commitment: 'Demo Partner: 2 Tonne/day Solar Aerobic Compost Reactor & Bio-culture Supplies'
    },
    govtAuthority: {
      department: 'Ranchi Municipal Corporation (RMC)',
      officerName: 'Smruti Ranjan Pradhan (Assistant Commissioner)',
      district: 'Ranchi',
      statusNote: 'Allocated 250 sq yards enclosed yard near cold storage for micro-compost unit.'
    },
    solutionSummary: 'Decentralized thermophilic rapid-aerobic bio-digestion converting daily mandi wet waste into organic enriched fertilizer sold to local peri-urban farmers.',
    milestones: [
      { id: 'm-sm-1', title: 'RMC Sanitary Inspection Completed', description: 'Measured daily organic biomass inflow (avg 1.76 tonnes/day).', status: 'COMPLETED', completedAt: '2026-08-26' },
      { id: 'm-sm-2', title: 'BAU Ranchi Bio-culture Formulated', description: 'Selected high-efficiency microbial consortia for 72-hour breakdown.', status: 'COMPLETED', completedAt: '2026-09-03' },
      { id: 'm-sm-3', title: 'Solar Reactor Foundation Layout', description: 'Civil foundation slab laying in progress at designated site.', status: 'IN_PROGRESS' },
      { id: 'm-sm-4', title: 'Vendor Segregation Training & Dustbin Rollout', description: 'Distribution of color-coded green bins to 160 mandi stalls.', status: 'PENDING' },
      { id: 'm-sm-5', title: 'Full Capacity Composting Commissioning', description: 'Target 500kg organic bio-fertilizer output daily.', status: 'PENDING' }
    ],
    updates: [
      {
        id: 'upd-5',
        timestamp: '2026-09-05T15:30:00Z',
        authorName: 'Dr. Debasis Pattnaik',
        authorRole: 'university',
        authorOrganization: 'BAU Ranchi',
        content: 'Lab testing confirmed that our optimized bacterial culture reduces cellulose and lignin volume by 68% in 48 hours with 0 methane foul odor.',
        stage: 'COLLABORATING'
      }
    ],
    impactMetric: {
      metricValue: '1.8 Tonnes/Day',
      metricLabel: 'Zero Municipal Landfill Waste + Organic Bio-Fertilizer for 85 Farmers',
      beneficiariesCount: 12500,
      verifiedBy: 'Jharkhand State Pollution Control Board'
    }
  },
  {
    id: 'JS-2026-001420',
    title: 'Hazardous Unlit 2km Rural Highway Stretch Near Girl Senior Secondary School',
    category: 'Electricity & Lighting',
    description: 'The 2.2 kilometer stretch connecting Bundu Village to Main Ranchi Highway has no lighting. Over 300 girl students traveling for coaching and evening tuition face acute safety hazards, with multiple near-miss bike collisions reported in 2 months.',
    location: {
      locality: 'Bundu Bypass Road',
      city: 'Bundu, Ranchi',
      district: 'Ranchi',
      state: 'Jharkhand',
      pincode: '835204',
      coordinates: { lat: 23.1812, lng: 85.5873 }
    },
    severity: 'CRITICAL',
    status: 'MATCHED',
    progressPercent: 38,
    reportedBy: {
      id: 'usr-cit-4',
      name: 'Sunita Soren',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-08-30T18:40:00Z',
    evidence: [
      {
        id: 'ev-5',
        name: 'night_dark_stretch.jpg',
        size: 2100000,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
        uploadedAt: '2026-08-30T18:40:00Z'
      }
    ],
    estimatedPeopleAffected: 6200,
    upvotesCount: 420,
    hasUpvoted: true,
    matchedTeam: {
      institutionName: 'Indian Institute of Information Technology Ranchi (IIIT Ranchi)',
      teamName: 'SolarMesh Smart Grids',
      leaderName: 'Prof. S. K. Mahapatra & Team',
      membersCount: 4,
      matchScore: 93,
      startDate: '2026-09-06'
    },
    industryPartner: {
      name: 'L&T Public Infrastructure CSR (Demo)',
      supportType: 'Technology',
      commitment: 'Demo Support: 45 Smart Solar LED Luminaires with LiFePO4 batteries & GSM telemetry'
    },
    govtAuthority: {
      department: 'Jharkhand Urja Vikas Nigam (JUVNL) & Rural Police',
      officerName: 'Alok Toppo (Executive Engineer)',
      district: 'Ranchi',
      statusNote: 'Poles earmarked along ROW (Right of Way). Joint night patrolling established.'
    },
    solutionSummary: 'Autonomous solar smart-mesh poles equipped with PIR human motion dimming, SOS emergency call buttons, and remote GSM battery telemetry.',
    milestones: [
      { id: 'm-lit-1', title: 'District Administration Verified Urgency', description: 'Flagged under Mission Shakti student safety corridor.', status: 'COMPLETED', completedAt: '2026-09-02' },
      { id: 'm-lit-2', title: 'IIIT Ranchi Photometric & Lux Calculation', description: 'Optimized 30W LED beam distribution with 35m pole pitch.', status: 'COMPLETED', completedAt: '2026-09-08' },
      { id: 'm-lit-3', title: 'Poles Procurement & SOS Telemetry Integration', description: 'Assembly of smart solar battery housings.', status: 'IN_PROGRESS' },
      { id: 'm-lit-4', title: 'Installation along 2.2km Corridor', description: 'PWD team civil footing and pole erection.', status: 'PENDING' },
      { id: 'm-lit-5', title: 'Smart Grid Live Monitoring Handover', description: 'Dashboard connected to local police outpost.', status: 'PENDING' }
    ],
    updates: [
      {
        id: 'upd-6',
        timestamp: '2026-09-08T18:00:00Z',
        authorName: 'Prof. S. K. Mahapatra',
        authorRole: 'university',
        authorOrganization: 'IIIT Ranchi',
        content: 'Simulated lux density and completed automated dimming firmware. The poles switch to 100% illumination upon detecting pedestrians/vehicles and conserve battery at 25% idle light.',
        stage: 'MATCHED'
      }
    ],
    impactMetric: {
      metricValue: '300+ Girls',
      metricLabel: 'Safe Night Commute with 100% Zero-Carbon Solar Illumination',
      beneficiariesCount: 6200,
      verifiedBy: 'Ranchi Rural SP Office'
    }
  },
  {
    id: 'JS-2026-000811',
    title: 'Severe Fluoride & Iron Contamination in Village Borewells',
    category: 'Water & Sanitation',
    description: 'Water from 6 deep borewells across 3 hamlets in Bishunpur block tests 3.8 mg/L Fluoride (permissible limit 1.0 mg/L) and 4.2 mg/L Iron. Over 30% of villagers show dental and skeletal fluorosis symptoms, and children complain of frequent stomach ailments.',
    location: {
      locality: 'Bishunpur Basti, Bishunpur Block',
      city: 'Bishunpur',
      district: 'Gumla',
      state: 'Jharkhand',
      pincode: '835331',
      coordinates: { lat: 23.3854, lng: 84.3737 }
    },
    severity: 'CRITICAL',
    status: 'IMPACT_VERIFIED',
    progressPercent: 100,
    reportedBy: {
      id: 'usr-cit-5',
      name: 'Hemant Majhi (Gram Pradhan)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-05-12T08:15:00Z',
    evidence: [
      {
        id: 'ev-6',
        name: 'water_test_report_fluoride.pdf',
        size: 1900000,
        type: 'document',
        url: '#',
        uploadedAt: '2026-05-12T08:15:00Z'
      }
    ],
    estimatedPeopleAffected: 4800,
    upvotesCount: 680,
    hasUpvoted: false,
    matchedTeam: {
      institutionName: 'Central University of Jharkhand (CUJ Ranchi)',
      teamName: 'CUJ Clean Water Mission Lab',
      leaderName: 'Prof. V. M. Chariar & Env Lab',
      membersCount: 7,
      matchScore: 98,
      startDate: '2026-05-20'
    },
    industryPartner: {
      name: 'Tata Trusts & CSR Water Mission (Demo)',
      supportType: 'Funding',
      commitment: 'Demo Grant: Community Nano-Filtration Center & Solar Pumping Unit'
    },
    govtAuthority: {
      department: 'Drinking Water & Sanitation Department (DWSD) Jharkhand',
      officerName: 'S. N. Soren (Executive Engineer)',
      district: 'Gumla',
      statusNote: 'Jal Jeevan Mission integration completed. Solar water ATM operational 24/7.'
    },
    solutionSummary: 'Zero-chemical activated alumina adsorption and nano-filtration system powered by a 5kW solar array, providing 5,000 liters/day of certified pure drinking water at ₹0.15/liter for maintenance.',
    milestones: [
      { id: 'm-w-1', title: 'DWSD Lab Water Verification', description: 'Confirmed 3.8 mg/L fluoride level across all 6 village bore points.', status: 'COMPLETED', completedAt: '2026-05-15' },
      { id: 'm-w-2', title: 'CUJ Alumina Regeneration Matrix Design', description: 'Engineered indigenous low-cost cartridge media.', status: 'COMPLETED', completedAt: '2026-06-02' },
      { id: 'm-w-3', title: 'Solar Unit Installation', description: 'Erected 5kW rooftop solar structure on community hall.', status: 'COMPLETED', completedAt: '2026-06-25' },
      { id: 'm-w-4', title: 'Water ATM Dispenser Commissioning', description: 'Smart RFID card access deployed to 840 households.', status: 'COMPLETED', completedAt: '2026-07-15' },
      { id: 'm-w-5', title: 'Independent 60-Day Health & Water Audit', description: 'Fluoride dropped to 0.42 mg/L (Safe < 1.0). Zero reported stomach bugs.', status: 'COMPLETED', completedAt: '2026-08-30' }
    ],
    updates: [
      {
        id: 'upd-7',
        timestamp: '2026-08-30T10:00:00Z',
        authorName: 'S. N. Soren',
        authorRole: 'government',
        authorOrganization: 'DWSD Jharkhand',
        content: 'Final third-party water quality testing by NABL accredited lab confirms 100% adherence to BIS IS-10500 standards. Model earmarked for replication across 18 adjacent fluoride-affected villages.',
        stage: 'IMPACT_VERIFIED'
      }
    ],
    impactMetric: {
      metricValue: '4,800 Villagers',
      metricLabel: 'Permanent Access to Safe Drinking Water (Fluoride reduced from 3.8 to 0.4 mg/L)',
      beneficiariesCount: 4800,
      verifiedBy: 'Jharkhand State Water & Sanitation Mission Audit'
    }
  },
  {
    id: 'JS-2026-001550',
    title: 'Clogged Natural Nallah Causing Silt Deposition on 120 Acres of Paddy Fields',
    category: 'Agriculture & Rural',
    description: 'Due to collapsed culverts and unchecked weed growth, the 4km irrigation canal overflows during flash showers in Ranishwar block, inundating 120 acres of fertile paddy crop with 6 inches of infertile gravel and silt, resulting in severe seasonal farmer debt.',
    location: {
      locality: 'Ranishwar Irrigation Catchment',
      city: 'Ranishwar',
      district: 'Dumka',
      state: 'Jharkhand',
      pincode: '814148',
      coordinates: { lat: 24.2689, lng: 87.2478 }
    },
    severity: 'MEDIUM',
    status: 'VERIFIED',
    progressPercent: 25,
    reportedBy: {
      id: 'usr-cit-6',
      name: 'Trilochan Soren (Kisan Samiti)',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2026-09-02T11:15:00Z',
    evidence: [
      {
        id: 'ev-7',
        name: 'canal_silt_overflow.jpg',
        size: 2800000,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
        uploadedAt: '2026-09-02T11:15:00Z'
      }
    ],
    estimatedPeopleAffected: 1400,
    upvotesCount: 195,
    hasUpvoted: false,
    milestones: [
      { id: 'm-ag-1', title: 'District Agriculture Officer Verified', description: 'Assessed 120-acre silt risk with drone mapping.', status: 'COMPLETED', completedAt: '2026-09-05' },
      { id: 'm-ag-2', title: 'University & Hydrology Matchmaking', description: 'AI algorithm matching with SKMU Dumka & BAU Ranchi teams.', status: 'IN_PROGRESS' },
      { id: 'm-ag-3', title: 'Desilting & Check Dam Sluice Design', description: 'Automated silt trap design for water inflow.', status: 'PENDING' },
      { id: 'm-ag-4', title: 'Community Construction under MNREGA', description: 'Executing canal desiltation with local labor.', status: 'PENDING' }
    ],
    updates: [
      {
        id: 'upd-8',
        timestamp: '2026-09-05T16:00:00Z',
        authorName: 'District Agriculture Officer',
        authorRole: 'government',
        authorOrganization: 'Dumka Collectorate',
        content: 'Field survey completed. JanSetu AI recommended collaboration with Sido Kanhu Murmu University (SKMU) and BAU Water Resource Dept.',
        stage: 'VERIFIED'
      }
    ]
  }
];

export const MOCK_USERS: Record<string, UserProfile> = {
  citizen: {
    id: 'usr-cit-1',
    name: 'Pooja Verma',
    email: 'pooja.verma@jansetu.in',
    phone: '+91 98765 43210',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'Ramgarh, Jharkhand'
  },
  government: {
    id: 'usr-gov-1',
    name: 'Er. Rajeshwar Soren',
    email: 'r.soren.pwd@jharkhand.gov.in',
    role: 'government',
    governmentDesignation: 'Executive Engineer, Urban Infrastructure',
    department: 'Urban Development & Housing Department (UDHD)',
    jurisdiction: 'Ramgarh & Hazaribagh District',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Ramgarh Collectorate, Jharkhand'
  },
  university: {
    id: 'usr-univ-1',
    name: 'Prof. Rajesh Kumar Sinha',
    email: 'rksinha.civil@bitmesra.ac.in',
    role: 'university',
    institution: 'Birla Institute of Technology, Mesra (BIT Mesra)',
    department: 'Department of Civil & Environmental Engineering',
    academicRole: 'Faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Mesra, Ranchi, Jharkhand'
  },
  industry: {
    id: 'usr-ind-1',
    name: 'Siddharth Sengupta',
    email: 'siddharth.s@tatasteelcsr.com',
    role: 'industry',
    organizationName: 'Tata Steel CSR & Rural Development Foundation',
    industrySector: 'Heavy Infrastructure & Materials',
    csrFocusAreas: ['Rural Infrastructure', 'Clean Water & Sanitation', 'STEM Education', 'Skilling'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    location: 'Jamshedpur & Ramgarh Operations, Jharkhand'
  }
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Prototype Laboratory Testing Complete',
    message: 'BIT Mesra HydroSolv team reported 24 MPa strength on porous fly-ash concrete for issue JS-2026-001245.',
    timestamp: '2026-09-09T14:15:00Z',
    read: false,
    type: 'STATUS_UPDATE',
    issueId: 'JS-2026-001245',
    targetUrl: '/citizen/issues/JS-2026-001245'
  },
  {
    id: 'notif-2',
    title: 'Potential CSR Grant Sanctioned',
    message: 'Tata Steel CSR approved material procurement demo support for your reported waterlogging problem.',
    timestamp: '2026-08-25T11:00:00Z',
    read: false,
    type: 'PROPOSAL',
    issueId: 'JS-2026-001245',
    targetUrl: '/citizen/issues/JS-2026-001245'
  },
  {
    id: 'notif-3',
    title: 'Problem Verified by Municipal Authority',
    message: 'Ramgarh Municipal Council officially verified the Dushad Mohalla challenge under priority civic reform.',
    timestamp: '2026-08-16T17:45:00Z',
    read: true,
    type: 'VERIFICATION',
    issueId: 'JS-2026-001245',
    targetUrl: '/citizen/issues/JS-2026-001245'
  },
  {
    id: 'notif-4',
    title: 'New High-Match Challenge in Your Region',
    message: '96% Match: Vegetable Waste management at Ranchi Kanke matches your Bio-culture lab expertise.',
    timestamp: '2026-08-29T10:00:00Z',
    read: true,
    type: 'MATCH_FOUND',
    issueId: 'JS-2026-001309',
    targetUrl: '/university/challenges'
  },
  {
    id: 'notif-5',
    title: 'Impact Milestone Verified: Gumla Clean Water',
    message: '4,800 villagers in Bishunpur now receiving BIS certified drinking water. Project marked as 100% Impact Verified!',
    timestamp: '2026-08-30T10:00:00Z',
    read: true,
    type: 'IMPACT',
    issueId: 'JS-2026-000811',
    targetUrl: '/explore/JS-2026-000811'
  }
];

export const MOCK_AI_MATCHES: CollaboratorMatch[] = [
  {
    id: 'match-1',
    name: 'BIT Mesra Civil & Hydraulic Engineering Cohort',
    type: 'university',
    matchScore: 91,
    matchReasons: [
      'Top-ranked civil engineering lab with storm water hydrology expertise',
      'Geographic proximity within 45km catchment radius from Ramgarh',
      'Completed 4 municipal drainage and culvert modeling projects'
    ],
    departmentOrIndustry: 'Civil Engineering Dept',
    location: 'Mesra, Ranchi, Jharkhand'
  },
  {
    id: 'match-2',
    name: 'IIT (ISM) Dhanbad Environmental Engineering Group',
    type: 'university',
    matchScore: 84,
    matchReasons: [
      'Specialized in porous aggregate materials and ground runoff percolation',
      'Active regional research focus on coalfield & municipal drainage corridors',
      'High-throughput soil and permeability laboratory facilities'
    ],
    departmentOrIndustry: 'Environmental Science & Engineering',
    location: 'Dhanbad, Jharkhand'
  },
  {
    id: 'match-3',
    name: 'NIT Jamshedpur Structural & Drainage Group',
    type: 'university',
    matchScore: 79,
    matchReasons: [
      'Extensive experience in modular urban pre-cast concrete structures',
      'Past successful pilot collaborations with municipal divisions'
    ],
    departmentOrIndustry: 'Civil & Structural Engineering',
    location: 'Jamshedpur, Jharkhand'
  }
];

export const STATS_SUMMARY = {
  problemsReported: 486,
  solutionsDeveloped: 142,
  universitiesConnected: 18,
  industryPartners: 28,
  peopleImpacted: 85200,
  districtsCovered: 24,
  avgResolutionDays: 34
};

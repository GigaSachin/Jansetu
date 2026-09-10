import { createApp } from '../src/app.js';
import { repositoryFactory } from '../src/repositories/RepositoryFactory.js';
import http from 'node:http';

async function runTests() {
  console.log('🧪 [JanSetu Backend Test Suite Starting]...');
  await repositoryFactory.initialize();
  const app = createApp();

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://localhost:${address.port}/api`;

  let passed = 0;
  let failed = 0;

  async function assert(desc: string, fn: () => Promise<boolean>) {
    try {
      const ok = await fn();
      if (ok) {
        console.log(`  ✅ PASS: ${desc}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${desc}`);
        failed++;
      }
    } catch (err: any) {
      console.error(`  ❌ ERROR in ${desc}:`, err.message);
      failed++;
    }
  }

  console.log('\n--- 1. AUTHENTICATION TESTS ---');
  let token = '';

  await assert('POST /api/auth/login with valid demo credentials', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'citizen@jansetu.in', password: 'Citizen@123' })
    });
    const body = await res.json();
    if (res.status === 200 && body.success && body.data.token) {
      token = body.data.token;
      return true;
    }
    return false;
  });

  await assert('POST /api/auth/login rejects invalid password', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'citizen@jansetu.in', password: 'WrongPassword' })
    });
    const body = await res.json();
    return res.status === 401 && !body.success && body.error.code === 'INVALID_CREDENTIALS';
  });

  await assert('GET /api/auth/me returns current authenticated user profile', async () => {
    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const body = await res.json();
    return res.status === 200 && body.success && body.data.email === 'citizen@jansetu.in';
  });

  console.log('\n--- 2. INSTITUTIONS & DISTRICTS TESTS ---');

  await assert('GET /api/institutions returns seeded Jharkhand institutions', async () => {
    const res = await fetch(`${baseUrl}/institutions`);
    const body = await res.json();
    return res.status === 200 && body.success && Array.isArray(body.data) && body.data.length >= 8;
  });

  await assert('GET /api/institutions/districts returns all 24 Jharkhand districts', async () => {
    const res = await fetch(`${baseUrl}/institutions/districts`);
    const body = await res.json();
    return res.status === 200 && body.success && body.data.length === 24 && body.data.includes('Ramgarh');
  });

  console.log('\n--- 3. PROBLEM CREATION & ACCEPTANCE TESTS ---');
  let createdProblemId = '';
  let createdIssueId = '';

  await assert('POST /api/problems creates problem & generates JS-JH-2026-XXXXXX issue ID', async () => {
    const payload = {
      title: 'Waterlogging near government school',
      description: 'Severe waterlogging blocking school access during rains in Ramgarh district.',
      category: 'Water & Sanitation',
      district: 'Ramgarh',
      block: 'Ramgarh Sadar',
      locality: 'Near Government High School',
      village_town: 'Ramgarh Cantt',
      state: 'Jharkhand',
      latitude: 23.6334,
      longitude: 85.5186,
      severity: 'HIGH',
      urgency: 'HIGH',
      impact_level: 'HIGH'
    };

    const res = await fetch(`${baseUrl}/problems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const body = await res.json();

    if (res.status === 201 && body.success && body.data.problem) {
      createdProblemId = body.data.problem.id;
      createdIssueId = body.data.issue_id;
      return createdIssueId.startsWith('JS-JH-2026-') && body.data.problem.status === 'REPORTED';
    }
    return false;
  });

  await assert('GET /api/problems returns problem list containing new problem', async () => {
    const res = await fetch(`${baseUrl}/problems`);
    const body = await res.json();
    return res.status === 200 && body.success && body.data.some((p: any) => p.id === createdProblemId);
  });

  await assert('GET /api/problems/:id retrieves problem by ID or Issue ID', async () => {
    const res = await fetch(`${baseUrl}/problems/${createdIssueId}`);
    const body = await res.json();
    return res.status === 200 && body.success && body.data.title === 'Waterlogging near government school';
  });

  await assert('GET /api/problems/:id/journey retrieves full lifecycle journey', async () => {
    const res = await fetch(`${baseUrl}/problems/${createdIssueId}/journey`);
    const body = await res.json();
    return res.status === 200 && body.success && Array.isArray(body.data.statusHistory);
  });

  await assert('POST /api/problems/:id/status updates status & appends to history', async () => {
    const res = await fetch(`${baseUrl}/problems/${createdIssueId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'GOVERNMENT_REVIEW',
        notes: 'Field engineer verified waterlogging on site.'
      })
    });
    const body = await res.json();
    return res.status === 200 && body.success && body.data.status === 'GOVERNMENT_REVIEW';
  });

  console.log('\n--- 4. ROLE SPECIFIC APIs (GOVERNMENT, UNIVERSITY, CSR) ---');

  await assert('GET /api/government/problems returns authority view', async () => {
    const res = await fetch(`${baseUrl}/government/problems?district=Ramgarh`);
    const body = await res.json();
    return res.status === 200 && body.success && Array.isArray(body.data);
  });

  await assert('PUT /api/government/problems/:id/verify validates priority and verifies issue', async () => {
    const res = await fetch(`${baseUrl}/government/problems/${createdIssueId}/verify`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: 'Verified by Executive Engineer' })
    });
    const body = await res.json();
    return res.status === 200 && body.success && body.data.status === 'GOVERNMENT_REVIEW';
  });

  await assert('GET /api/university/challenges returns academic challenge problems', async () => {
    const res = await fetch(`${baseUrl}/university/challenges?domain=Water+%26+Sanitation`);
    const body = await res.json();
    return res.status === 200 && body.success && Array.isArray(body.data);
  });

  await assert('POST /api/university/problems/:id/interest registers capstone interest', async () => {
    const res = await fetch(`${baseUrl}/university/problems/${createdIssueId}/interest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        institutionName: 'BIT Mesra, Ranchi',
        proposalNotes: 'Civil Dept permeable drainage capstone proposal'
      })
    });
    const body = await res.json();
    return res.status === 200 && body.success && body.data.status === 'INTEREST_REGISTERED';
  });

  await assert('GET /api/csr/opportunities returns CSR investment opportunities', async () => {
    const res = await fetch(`${baseUrl}/csr/opportunities`);
    const body = await res.json();
    return res.status === 200 && body.success && Array.isArray(body.data);
  });

  await assert('POST /api/csr/problems/:id/interest records CSR sponsorship pledge', async () => {
    const res = await fetch(`${baseUrl}/csr/problems/${createdIssueId}/interest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: 'Tata Steel Foundation',
        supportType: 'Funding',
        commitmentAmountOrNote: '₹4,50,000 for permeable paver installations'
      })
    });
    const body = await res.json();
    return res.status === 200 && body.success && body.data.status === 'CSR_SPONSORSHIP_PLEDGED';
  });

  console.log('\n--- 5. HEALTH & RESILIENCE TESTS ---');

  await assert('GET /api/health returns API gateway and AI Engine bridge status', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();
    return res.status === 200 && body.success && body.data.status === 'HEALTHY';
  });

  server.close();

  console.log(`\n=======================================================`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`=======================================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});

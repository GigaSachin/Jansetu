import assert from 'assert';

const API_BASE = 'http://localhost:5000/api';

async function testSecurityHardening() {
  console.log('===============================================================');
  console.log('🔒 [JANSETU STEP 5: SECURITY + PRODUCTION HARDENING TEST SUITE]');
  console.log('===============================================================\n');

  // 1. Wrong Login Credentials Test
  console.log('🛡️ [1/15] Testing Authentication: Invalid credentials rejection...');
  const badLoginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'citizen@jansetu.in', password: 'WrongPassword@999' })
  });
  assert.strictEqual(badLoginRes.status, 401, 'Invalid credentials must return HTTP 401');
  console.log('   ✅ HTTP 401 Unauthorized correctly returned for bad password');

  // 2. Missing Auth Token Test
  console.log('🛡️ [2/15] Testing Protected Endpoint: Missing Authorization header...');
  const noTokenRes = await fetch(`${API_BASE}/government/problems/prob-1/verify`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: 'Unauthorized verification attempt' })
  });
  assert.strictEqual(noTokenRes.status, 401, 'Missing token must return HTTP 401');
  console.log('   ✅ HTTP 401 Unauthorized correctly returned for missing token');

  // 3. Forged/Invalid JWT Token Test
  console.log('🛡️ [3/15] Testing Protected Endpoint: Forged JWT token...');
  const forgedTokenRes = await fetch(`${API_BASE}/government/problems/prob-1/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer forged.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature'
    },
    body: JSON.stringify({ notes: 'Forged token attempt' })
  });
  assert.strictEqual(forgedTokenRes.status, 401, 'Forged token must return HTTP 401');
  console.log('   ✅ HTTP 401 Unauthorized correctly returned for forged token');

  // Login as all roles to get valid tokens
  console.log('🛡️ Authenticating test users (Citizen, Government, University, CSR)...');
  const citizenLogin = await (await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'citizen@jansetu.in', password: 'Citizen@123' })
  })).json();

  const govtLogin = await (await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'government@jharkhand.gov.in', password: 'Gov@123' })
  })).json();

  const uniLogin = await (await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'dean@bitmesra.ac.in', password: 'Uni@123' })
  })).json();

  const csrLogin = await (await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'csr@tatasteel.com', password: 'Csr@123' })
  })).json();

  assert(citizenLogin.data?.token, 'Citizen token required');
  assert(govtLogin.data?.token, 'Government token required');
  assert(uniLogin.data?.token, 'University token required');
  assert(csrLogin.data?.token, 'CSR token required');

  // 4. RBAC: Citizen calling Government-only endpoint
  console.log('🛡️ [4/15] Testing RBAC: Citizen attempting Government verification...');
  const citGovRes = await fetch(`${API_BASE}/government/problems/prob-1/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${citizenLogin.data.token}`
    },
    body: JSON.stringify({ notes: 'Citizen trying to verify problem' })
  });
  assert.strictEqual(citGovRes.status, 403, 'Citizen must receive 403 Forbidden for Government endpoint');
  console.log('   ✅ HTTP 403 Forbidden correctly returned for unauthorized Citizen');

  // 5. RBAC: University calling Government-only endpoint
  console.log('🛡️ [5/15] Testing RBAC: University attempting Government verification...');
  const uniGovRes = await fetch(`${API_BASE}/government/problems/prob-1/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${uniLogin.data.token}`
    },
    body: JSON.stringify({ notes: 'University trying to verify problem' })
  });
  assert.strictEqual(uniGovRes.status, 403, 'University must receive 403 Forbidden for Government endpoint');
  console.log('   ✅ HTTP 403 Forbidden correctly returned for unauthorized University');

  // 6. RBAC: CSR calling Government-only endpoint
  console.log('🛡️ [6/15] Testing RBAC: CSR attempting Government verification...');
  const csrGovRes = await fetch(`${API_BASE}/government/problems/prob-1/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${csrLogin.data.token}`
    },
    body: JSON.stringify({ notes: 'CSR trying to verify problem' })
  });
  assert.strictEqual(csrGovRes.status, 403, 'CSR must receive 403 Forbidden for Government endpoint');
  console.log('   ✅ HTTP 403 Forbidden correctly returned for unauthorized CSR user');

  // 7. Invalid Problem ID -> 404
  console.log('🛡️ [7/15] Testing Resource Validation: Non-existent problem ID...');
  const notFoundRes = await fetch(`${API_BASE}/problems/non-existent-problem-id-99999`);
  assert.strictEqual(notFoundRes.status, 404, 'Invalid problem ID must return HTTP 404');
  console.log('   ✅ HTTP 404 Problem Not Found correctly returned');

  // 8. Empty Problem Description Validation -> 400
  console.log('🛡️ [8/15] Testing Input Validation: Empty description rejection...');
  const emptyDescRes = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Valid Short Title',
      description: '   ',
      category: 'Water & Sanitation',
      district: 'Ramgarh'
    })
  });
  assert.strictEqual(emptyDescRes.status, 400, 'Empty description must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for empty description');

  // 9. Excessively Long Description Validation -> 400
  console.log('🛡️ [9/15] Testing Input Validation: Oversized text (>5000 chars) rejection...');
  const giantText = 'a'.repeat(6000);
  const giantRes = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Valid Short Title',
      description: giantText,
      category: 'Water & Sanitation',
      district: 'Ramgarh'
    })
  });
  assert.strictEqual(giantRes.status, 400, 'Oversized description must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for oversized text');

  // 10. Script Injection (XSS) in Title/Description -> 400
  console.log('🛡️ [10/15] Testing Input Sanitization: Raw script injection rejection...');
  const xssRes = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '<script>alert("hack")</script>',
      description: 'Dangerous payload injection attempt on civic portal',
      category: 'Water & Sanitation',
      district: 'Ramgarh'
    })
  });
  assert.strictEqual(xssRes.status, 400, 'Script injection in title must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for script injection');

  // 11. Coordinate Range Validation -> 400
  console.log('🛡️ [11/15] Testing Geo Validation: Out-of-bounds coordinates rejection...');
  const badCoordsRes = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Waterlogging near school with bad coordinates',
      description: 'Drainage overflow during monsoon season in Jharkhand',
      category: 'Water & Sanitation',
      district: 'Ramgarh',
      latitude: 195.45,
      longitude: 85.5
    })
  });
  assert.strictEqual(badCoordsRes.status, 400, 'Out-of-bounds coordinates must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for out-of-bounds lat/lng');

  // 12. Executable Upload Rejection (.exe / .bat) -> 400
  console.log('🛡️ [12/15] Testing File Security: Dangerous executable extension rejection...');
  const badFileRes = await fetch(`${API_BASE}/problems/prob-1/attachments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: 'malicious_script.exe',
      fileType: 'IMAGE',
      fileSize: 1024,
      fileUrl: 'http://example.com/bad.exe'
    })
  });
  assert.strictEqual(badFileRes.status, 400, 'Executable file extension must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for .exe attachment');

  // 13. Oversized Attachment (>15MB) -> 400
  console.log('🛡️ [13/15] Testing File Security: Oversized file metadata rejection (>15MB)...');
  const oversizedFileRes = await fetch(`${API_BASE}/problems/prob-1/attachments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: 'huge_video_recording.mp4',
      fileType: 'VIDEO',
      fileSize: 50 * 1024 * 1024, // 50MB
      fileUrl: 'http://example.com/huge.mp4'
    })
  });
  assert.strictEqual(oversizedFileRes.status, 400, 'Oversized file metadata must return HTTP 400');
  console.log('   ✅ HTTP 400 Validation Error correctly returned for >15MB attachment');

  // 14. Security Headers Presence
  console.log('🛡️ [14/15] Testing Security Headers: Checking HTTP defense headers...');
  const healthRes = await fetch(`${API_BASE}/health`);
  assert.strictEqual(healthRes.status, 200, 'Health check must return HTTP 200');
  const contentTypeOptions = healthRes.headers.get('x-content-type-options');
  const frameOptions = healthRes.headers.get('x-frame-options');
  const xssProtection = healthRes.headers.get('x-xss-protection');
  assert.strictEqual(contentTypeOptions, 'nosniff', 'X-Content-Type-Options must be nosniff');
  assert.strictEqual(frameOptions, 'SAMEORIGIN', 'X-Frame-Options must be SAMEORIGIN');
  console.log(`   ✅ Security headers verified: nosniff, SAMEORIGIN, ${xssProtection}`);

  // 15. Rate Limiting Headers
  console.log('🛡️ [15/15] Testing Rate Limiting: Checking rate limit response headers...');
  const rateLimitHeader = healthRes.headers.get('x-ratelimit-limit');
  assert(rateLimitHeader !== null, 'X-RateLimit-Limit header must be present');
  console.log(`   ✅ Rate limiting active (X-RateLimit-Limit: ${rateLimitHeader})`);

  console.log('\n===============================================================');
  console.log('🎉 ALL 15 SECURITY & HARDENING ACCEPTANCE TESTS PASSED (100%)!');
  console.log('===============================================================\n');
}

testSecurityHardening().catch(err => {
  console.error('❌ Security Acceptance Test Failed:', err);
  process.exit(1);
});

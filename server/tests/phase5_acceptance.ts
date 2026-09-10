import http from 'node:http';

const BACKEND_URL = 'http://localhost:5000/api';

async function runPhase5AcceptanceTest() {
  console.log('===============================================================');
  console.log('🌟 [JANSETU PHASE 5 PRIMARY ACCEPTANCE TEST]');
  console.log('===============================================================');

  // STEP 1: Citizen Login
  console.log('\n👤 [1/7] Step 1: Login as Citizen...');
  const citLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'citizen@jansetu.in', password: 'Citizen@123' })
  });
  const citLogin = await citLoginRes.json();
  if (!citLogin.success) throw new Error('Citizen login failed: ' + JSON.stringify(citLogin));
  const citizenToken = citLogin.data.token;
  console.log(`   ✅ Citizen Authenticated: ${citLogin.data.user.name} (${citLogin.data.user.role})`);

  // STEP 2: Citizen Submits Ramgarh Problem
  console.log('\n📝 [2/7] Step 2: Citizen reports Ramgarh School Waterlogging Problem...');
  const problemPayload = {
    title: 'Waterlogging near government school',
    description: 'Severe waterlogging blocking access to Rajkiya Kanya Vidyalaya during rains in Ramgarh Cantt.',
    category: 'Water & Sanitation',
    district: 'Ramgarh',
    locality: 'Near Government Girls School & Bus Stand',
    village_town: 'Ramgarh Cantt',
    state: 'Jharkhand',
    latitude: 23.6334,
    longitude: 85.5186,
    severity: 'HIGH',
    urgency: 'HIGH',
    impact_level: 'HIGH',
    estimated_affected_population: '1,500 School Children and Residents'
  };

  const probRes = await fetch(`${BACKEND_URL}/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${citizenToken}`
    },
    body: JSON.stringify(problemPayload)
  });
  const probData = await probRes.json();
  if (!probData.success) throw new Error('Problem submission failed: ' + JSON.stringify(probData));
  const issueId = probData.data.issue_id;
  console.log(`   ✅ Problem Submitted Successfully!`);
  console.log(`   📋 Issue ID: ${issueId}`);
  console.log(`   🏷️ Current Status: ${probData.data.problem.status}`);

  // STEP 3: Wait for AI Engine Analysis
  console.log('\n🤖 [3/7] Step 3: Waiting for AI Engine triage & matching (1.5s)...');
  await new Promise(r => setTimeout(r, 1500));
  
  const aiRes = await fetch(`${BACKEND_URL}/problems/${issueId}/ai`, {
    headers: { 'Authorization': `Bearer ${citizenToken}` }
  });
  const aiData = await aiRes.json();
  console.log(`   ✅ AI Analysis Status: ${aiData.data.status}`);
  console.log(`   🎯 Matched Institutions: ${aiData.data.institutionMatches?.length || 0} institutions`);
  if (aiData.data.institutionMatches?.length > 0) {
    console.log(`      Top Match: ${aiData.data.institutionMatches[0].institution_name} (${(aiData.data.institutionMatches[0].match_score * 100).toFixed(0)}%)`);
  }

  // STEP 4: Login as Government & Verify Problem
  console.log('\n🏛️ [4/7] Step 4: Login as Government Official & Verify Problem...');
  const govLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'government@jharkhand.gov.in', password: 'Gov@123' })
  });
  const govLogin = await govLoginRes.json();
  if (!govLogin.success) throw new Error('Government login failed: ' + JSON.stringify(govLogin));
  const govToken = govLogin.data.token;
  console.log(`   ✅ Government Official Authenticated: ${govLogin.data.user.name} (${govLogin.data.user.organization})`);

  const govVerifyRes = await fetch(`${BACKEND_URL}/government/problems/${issueId}/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${govToken}`
    },
    body: JSON.stringify({
      verification_status: 'VERIFIED',
      notes: 'Site verified by Ramgarh District Administration. Problem escalated for academic and CSR intervention.'
    })
  });
  const govVerify = await govVerifyRes.json();
  if (!govVerify.success) throw new Error('Government verification failed: ' + JSON.stringify(govVerify));
  console.log(`   ✅ Problem Verified by Government! Status: ${govVerify.data.status}`);

  // STEP 5: Login as University & Register Interest
  console.log('\n🎓 [5/7] Step 5: Login as University (BIT Mesra) & Register Interest...');
  const uniLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'dean@bitmesra.ac.in', password: 'Uni@123' })
  });
  const uniLogin = await uniLoginRes.json();
  if (!uniLogin.success) throw new Error('University login failed: ' + JSON.stringify(uniLogin));
  const uniToken = uniLogin.data.token;
  console.log(`   ✅ University Dean Authenticated: ${uniLogin.data.user.name} (${uniLogin.data.user.organization})`);

  const uniInterestRes = await fetch(`${BACKEND_URL}/university/problems/${issueId}/interest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${uniToken}`
    },
    body: JSON.stringify({
      department: 'Department of Civil & Hydraulic Engineering',
      proposed_solution: 'Permeable pavement & subsurface drainage modeling prototype for school access.'
    })
  });
  const uniInterest = await uniInterestRes.json();
  if (!uniInterest.success) throw new Error('University interest failed: ' + JSON.stringify(uniInterest));
  console.log(`   ✅ University Interest Registered! Response:`, uniInterest.message);

  // STEP 6: Login as Industry/CSR & Pledge Support
  console.log('\n🏢 [6/7] Step 6: Login as Industry/CSR (Tata Steel Foundation) & Pledge Support...');
  const csrLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'csr@tatasteel.com', password: 'Csr@123' })
  });
  const csrLogin = await csrLoginRes.json();
  if (!csrLogin.success) throw new Error('CSR login failed: ' + JSON.stringify(csrLogin));
  const csrToken = csrLogin.data.token;
  console.log(`   ✅ CSR Head Authenticated: ${csrLogin.data.user.name} (${csrLogin.data.user.organization})`);

  const csrInterestRes = await fetch(`${BACKEND_URL}/csr/problems/${issueId}/interest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${csrToken}`
    },
    body: JSON.stringify({
      support_type: 'Materials, Drainage Piping & Pilot Construction Grant',
      csr_program: 'Tata Steel Swachh Vidyalaya CSR Initiative'
    })
  });
  const csrInterest = await csrInterestRes.json();
  if (!csrInterest.success) throw new Error('CSR interest failed: ' + JSON.stringify(csrInterest));
  console.log(`   ✅ CSR Support Pledged! Response:`, csrInterest.message);

  // STEP 7: Return to Citizen & Verify Shared Journey
  console.log('\n🔍 [7/7] Step 7: Return to Citizen & Inspect Shared Problem Journey...');
  const finalJourneyRes = await fetch(`${BACKEND_URL}/problems/${issueId}/journey`, {
    headers: { 'Authorization': `Bearer ${citizenToken}` }
  });
  const finalJourney = await finalJourneyRes.json();
  if (!finalJourney.success) throw new Error('Fetch journey failed: ' + JSON.stringify(finalJourney));

  console.log(`   ✅ Problem Lifecycle State: ${finalJourney.data.problem.status}`);
  console.log('   📜 Full Shared Journey Timeline:');
  for (const h of finalJourney.data.statusHistory) {
    console.log(`      ✓ [${h.status}] ${h.notes} (By: ${h.changed_by})`);
  }

  console.log('\n===============================================================');
  console.log('🎉 PHASE 5 PRIMARY ACCEPTANCE TEST PASSED 100%!');
  console.log('===============================================================');
}

runPhase5AcceptanceTest().catch(err => {
  console.error('❌ Phase 5 Acceptance Test Failed:', err);
  process.exit(1);
});

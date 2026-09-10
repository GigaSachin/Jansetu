import assert from 'assert';

const API_BASE = 'http://localhost:5000/api';

async function testImpactIntelligence() {
  console.log('===============================================================');
  console.log('🌟 [JANSETU STEP 2: IMPACT INTELLIGENCE ACCEPTANCE TEST]');
  console.log('===============================================================\n');

  console.log('📊 [1/4] Fetching Impact Intelligence statistics from Backend...');
  const res = await fetch(`${API_BASE}/impact/stats`);
  assert.strictEqual(res.status, 200, 'Impact stats endpoint should return HTTP 200');
  const body = await res.json();
  assert.strictEqual(body.success, true, 'Response must have success: true');
  
  const { metrics, caseStudies, districtImpact, categoryImpact } = body.data;

  console.log('   ✅ Received Impact Metrics:');
  console.log(`      - Problems Reported:       ${metrics.problemsReported}`);
  console.log(`      - Problems Verified:       ${metrics.problemsVerified}`);
  console.log(`      - AI Matched:              ${metrics.aiMatched}`);
  console.log(`      - Solutions in Dev:        ${metrics.solutionsInDevelopment}`);
  console.log(`      - Problems Resolved:       ${metrics.problemsResolved}`);
  console.log(`      - Estimated Beneficiaries: ${metrics.citizensImpacted}`);

  assert(metrics.problemsReported >= 1, 'Problems reported must be >= 1');
  assert(metrics.problemsVerified >= 1, 'Problems verified must be >= 1');
  assert(metrics.aiMatched >= 1, 'AI matched count must be >= 1');

  console.log('\n🗺️ [2/4] Validating Jharkhand Priority District Distribution...');
  const expectedDistricts = ['Ramgarh', 'Ranchi', 'Hazaribagh', 'Bokaro', 'Dhanbad', 'East Singhbhum'];
  expectedDistricts.forEach(dist => {
    assert(dist in districtImpact, `District ${dist} must be present in district impact data`);
    console.log(`      ✓ District "${dist}": Reported=${districtImpact[dist].reported}, InProgress=${districtImpact[dist].inProgress}, Resolved=${districtImpact[dist].resolved}`);
  });

  console.log('\n📖 [3/4] Validating Prototype Case Studies & 7-Stage Pipeline...');
  assert(Array.isArray(caseStudies) && caseStudies.length >= 1, 'Must provide at least 1 case study');
  const ramgarhCase = caseStudies.find((c: any) => c.district === 'Ramgarh');
  assert(ramgarhCase, 'Ramgarh case study must exist');
  assert.strictEqual(ramgarhCase.isPrototypeCaseStudy, true, 'Case study must be flagged as prototype');
  assert(ramgarhCase.pipelineStages.length >= 6, 'Case study must have pipeline stage milestones');
  console.log(`      ✓ Case Study 1: "${ramgarhCase.title}" (${ramgarhCase.affectedCitizens})`);
  console.log(`      ✓ AI Matched Institution: ${ramgarhCase.aiMatchedInstitution}`);

  console.log('\n🔍 [4/4] Testing Stakeholder Role-Specific Impact Queries...');
  const roles = ['citizen', 'government', 'university', 'industry'];
  for (const r of roles) {
    const roleRes = await fetch(`${API_BASE}/impact/stats?role=${r}`);
    assert.strictEqual(roleRes.status, 200, `Role query for ${r} must return 200`);
    const roleData = await roleRes.json();
    assert.strictEqual(roleData.data.activeRoleFilter, r, `Role filter ${r} must be reflected`);
    console.log(`      ✓ Verified Impact Perspective filter: "${r}"`);
  }

  console.log('\n===============================================================');
  console.log('🎉 STEP 2 IMPACT INTELLIGENCE ACCEPTANCE TEST PASSED 100%!');
  console.log('===============================================================\n');
}

testImpactIntelligence().catch(err => {
  console.error('❌ Acceptance Test Failed:', err);
  process.exit(1);
});

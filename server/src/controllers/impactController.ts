import { Request, Response, NextFunction } from 'express';
import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { sendSuccess } from '../utils/responseHelper.js';

export class ImpactController {
  public static async getImpactStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const problemRepo = repositoryFactory.getProblemRepository();
      const allProblems = await problemRepo.findAll();
      const role = (req.query.role as string)?.toLowerCase();

      // Calculate dynamic numbers from actual database
      const totalReported = allProblems.length;
      const verifiedStatuses = new Set([
        'VERIFIED', 'MATCHED', 'COLLABORATING', 'SOLUTION_DEVELOPMENT', 
        'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'
      ]);
      const matchedStatuses = new Set([
        'MATCHED', 'COLLABORATING', 'SOLUTION_DEVELOPMENT', 
        'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'
      ]);
      const inDevStatuses = new Set([
        'COLLABORATING', 'SOLUTION_DEVELOPMENT', 'PROTOTYPING'
      ]);
      const resolvedStatuses = new Set([
        'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'
      ]);

      const problemsVerified = allProblems.filter(p => verifiedStatuses.has(p.status)).length;
      const aiMatched = allProblems.filter(p => matchedStatuses.has(p.status)).length;
      const solutionsInDev = allProblems.filter(p => inDevStatuses.has(p.status)).length;
      const problemsResolved = allProblems.filter(p => resolvedStatuses.has(p.status)).length;

      // Calculate approximate beneficiaries or use baseline
      let dynamicBeneficiaries = 0;
      allProblems.forEach(p => {
        if (p.estimated_affected_population) {
          const num = parseInt(p.estimated_affected_population.replace(/[^0-9]/g, ''), 10);
          if (!isNaN(num)) dynamicBeneficiaries += num;
        } else {
          dynamicBeneficiaries += 150; // default estimated impact per civic report
        }
      });

      // Categories distribution from real DB
      const categoryMap: Record<string, { count: number; resolved: number }> = {};
      allProblems.forEach(p => {
        const cat = p.category || 'Other';
        if (!categoryMap[cat]) {
          categoryMap[cat] = { count: 0, resolved: 0 };
        }
        categoryMap[cat].count += 1;
        if (resolvedStatuses.has(p.status)) {
          categoryMap[cat].resolved += 1;
        }
      });

      // Top Jharkhand districts
      const targetDistricts = ['Ramgarh', 'Ranchi', 'Hazaribagh', 'Bokaro', 'Dhanbad', 'East Singhbhum'];
      const districtMap: Record<string, { reported: number; inProgress: number; resolved: number }> = {};
      targetDistricts.forEach(d => {
        districtMap[d] = { reported: 0, inProgress: 0, resolved: 0 };
      });

      allProblems.forEach(p => {
        const dist = p.district || 'Ranchi';
        if (!districtMap[dist]) {
          districtMap[dist] = { reported: 0, inProgress: 0, resolved: 0 };
        }
        districtMap[dist].reported += 1;
        if (inDevStatuses.has(p.status)) districtMap[dist].inProgress += 1;
        if (resolvedStatuses.has(p.status)) districtMap[dist].resolved += 1;
      });

      // Baseline demo numbers to combine when DB has few seed items
      const baselineMetrics = {
        problemsReported: Math.max(totalReported, 142),
        problemsVerified: Math.max(problemsVerified, 118),
        aiMatched: Math.max(aiMatched, 94),
        solutionsInDevelopment: Math.max(solutionsInDev, 38),
        problemsResolved: Math.max(problemsResolved, 56),
        citizensImpacted: Math.max(dynamicBeneficiaries, 85200),
      };

      const caseStudies = [
        {
          id: 'CS-RAMGARH-01',
          title: 'Waterlogging & Drainage Near Government School',
          titleHi: 'सरकारी विद्यालय के निकट जलभराव और जल निकासी समाधान',
          district: 'Ramgarh',
          state: 'Jharkhand',
          locality: 'Chitarpur Block, Near Govt High School',
          affectedCitizens: '250+ Students & Residents',
          category: 'Water & Sanitation',
          currentStatus: 'SOLUTION_DEVELOPMENT',
          statusLabel: 'Solution Development',
          aiMatchedInstitution: 'BIT Mesra (Dept of Civil & Environmental Engineering)',
          leadInnovator: 'Dr. A. Verma & Student Innovation Cohort',
          supportingPartner: 'Tata Steel CSR & Ramgarh District Administration',
          solutionSummary: 'Engineered interlocking permeable pavers with localized subsurface percolation trenches to stop seasonal waterlogging.',
          isPrototypeCaseStudy: true,
          pipelineStages: [
            { stage: 'Reported', completed: true, detail: 'Citizen report logged via JanSetu portal' },
            { stage: 'AI Analysed', completed: true, detail: 'Priority: High, Sector: Urban Drainage & Safety' },
            { stage: 'Govt Verified', completed: true, detail: 'Ramgarh Municipal Council inspection verified' },
            { stage: 'Institution Matched', completed: true, detail: 'BIT Mesra matched (94% domain relevance)' },
            { stage: 'Support Received', completed: true, detail: 'CSR micro-pilot equipment grant sanctioned' },
            { stage: 'Solution Dev', completed: true, detail: 'Modular trench prototype being fabricated' },
            { stage: 'Impact', completed: false, detail: 'Scheduled deployment targeting 250+ beneficiaries' }
          ]
        },
        {
          id: 'CS-RANCHI-02',
          title: 'Solar Micro-Grid for Rural Primary Health Centre',
          titleHi: 'ग्रामीण प्राथमिक स्वास्थ्य केंद्र के लिए सौर ऊर्जा माइक्रो-ग्रिड',
          district: 'Ranchi',
          state: 'Jharkhand',
          locality: 'Angara Block, PHC Centre',
          affectedCitizens: '1,400+ Rural Patients',
          category: 'Healthcare Access',
          currentStatus: 'DEPLOYED',
          statusLabel: 'Deployed & Operational',
          aiMatchedInstitution: 'IIIT Ranchi (IoT & Embedded Systems Lab)',
          leadInnovator: 'Renewable Tech Innovation Group',
          supportingPartner: 'Jharkhand Renewable Energy Dev Agency (JREDA)',
          solutionSummary: 'Automated solar battery backup with IoT battery health monitor preventing cold-chain vaccine spoilage.',
          isPrototypeCaseStudy: true,
          pipelineStages: [
            { stage: 'Reported', completed: true, detail: 'Reported by local health worker' },
            { stage: 'AI Analysed', completed: true, detail: 'Categorized under Healthcare Energy Continuity' },
            { stage: 'Govt Verified', completed: true, detail: 'District Health Officer authorized' },
            { stage: 'Institution Matched', completed: true, detail: 'IIIT Ranchi embedded team matched' },
            { stage: 'Support Received', completed: true, detail: 'CSR seed equipment grant provided' },
            { stage: 'Solution Dev', completed: true, detail: 'Smart inverter unit fabricated and bench-tested' },
            { stage: 'Impact', completed: true, detail: 'Zero vaccine spoilage across 14 months of operation' }
          ]
        }
      ];

      sendSuccess(res, {
        metrics: baselineMetrics,
        liveDbCounts: {
          totalReported,
          problemsVerified,
          aiMatched,
          solutionsInDev,
          problemsResolved,
          dynamicBeneficiaries
        },
        categoryImpact: categoryMap,
        districtImpact: districtMap,
        caseStudies,
        activeRoleFilter: role || 'all',
        dataSource: 'JanSetu Hybrid Intelligence (Live Database + Prototype Baseline)',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}

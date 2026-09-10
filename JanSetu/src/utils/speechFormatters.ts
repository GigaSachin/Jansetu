import { Issue } from '../types';
import { TriageResultResponse } from '../services/aiEngineService';
import { Language } from '../context/LanguageContext';

export const SpeechFormatters = {
  /**
   * 1. How It Works Narration
   */
  howItWorks(lang: Language | string = 'en'): string {
    if (lang !== 'en') {
      return `जनसेतु की कार्यप्रणाली। 
      चरण 1: नागरिक रिपोर्ट - नागरिक अपने गाँव या शहर की समस्या फोटो और जीपीएस के साथ दर्ज करते हैं। 
      चरण 2: जनसेतु एआई विश्लेषण - समस्या की गंभीरता और आवश्यक इंजीनियरिंग कौशल का स्वचालित विश्लेषण। 
      चरण 3: संस्थान मिलान - पास के उपयुक्त विश्वविद्यालय जैसे बीआईटी मेसरा और आईआईटी धनबाद से जुड़ाव। 
      चरण 4: संस्थान व सीएसआर सहयोग - छात्र और उद्योग मिलकर समाधान का मॉडल बनाते हैं। 
      चरण 5: समाधान और प्रभाव - ज़मीनी स्तर पर स्थायी समाधान और सत्यापित सामुदायिक प्रभाव।`;
    }
    return `How JanSetu Works. 
    Step 1: People Report - Citizens submit geo-tagged civic observations with photos in under two minutes. 
    Step 2: JanSetu Understands - AI extracts civic intent, detects duplicate issues, and identifies required engineering domains. 
    Step 3: AI Finds a Match - Algorithms rank nearest engineering institutions like BIT Mesra, IIT ISM Dhanbad, and NIT Jamshedpur. 
    Step 4: Institutions Collaborate - Student capstones develop blueprints funded by CSR partners and approved by civic authorities. 
    Step 5: Solution Creates Impact - Community resolution is deployed and blueprints are made reusable across Jharkhand.`;
  },

  /**
   * 2. Citizen Problem Details Narration
   */
  problemDetails(issue: Issue, lang: Language | string = 'en'): string {
    const loc = `${issue.location?.locality || ''}, ${issue.location?.district || 'Ramgarh'}, Jharkhand`;
    if (lang !== 'en') {
      return `समस्या शीर्षक: ${issue.title}. 
      श्रेणी: ${issue.category}. 
      स्थान: ${loc}. 
      समस्या विवरण: ${issue.description}. 
      गंभीरता: ${issue.severity}. 
      प्रभावित नागरिक: लगभग ${issue.estimatedPeopleAffected || 1200} लोग।`;
    }
    return `Problem Title: ${issue.title}. 
    Category: ${issue.category}. 
    Location: ${loc}. 
    Problem Description: ${issue.description}. 
    Severity: ${issue.severity} priority. 
    Estimated Affected Population: Approximately ${issue.estimatedPeopleAffected || 1200} citizens.`;
  },

  /**
   * 3. AI Analysis Narration (strictly non-internal)
   */
  aiAnalysis(issue: Issue, aiTriage?: TriageResultResponse | null, lang: Language | string = 'en'): string {
    const category = aiTriage?.category || issue.category;
    const severity = aiTriage?.severity || issue.severity;
    const urgency = aiTriage?.urgency || 'HIGH';
    const reach = aiTriage?.estimatedAffectedPop || `${issue.estimatedPeopleAffected || 1200} citizens`;
    const topMatch = aiTriage?.institutionMatches?.[0]?.name || 'BIT Mesra, Ranchi';
    const rawScore = aiTriage?.institutionMatches?.[0]?.matchScore;
    const topMatchScore = rawScore ? (rawScore <= 1 ? Math.round(rawScore * 100) : Math.round(rawScore)) : 94;
    const matchReasons = aiTriage?.institutionMatches?.[0]?.reasons?.join('. ') || 'Direct domain expertise and district proximity in Jharkhand.';

    if (lang !== 'en') {
      return `जनसेतु एआई विश्लेषण सारांश। 
      डोमेन वर्गीकरण: ${category}. 
      प्राथमिकता गंभीरता: ${severity}. 
      तात्कालिकता: ${urgency}. 
      अनुमानित प्रभावित दायरा: ${reach}. 
      शीर्ष अनुशंसित शिक्षण संस्थान: ${topMatch}, मिलान स्कोर ${topMatchScore} प्रतिशत। 
      संबद्धता का कारण: ${matchReasons}`;
    }
    return `JanSetu AI Analysis Summary. 
    Domain Classification: ${category}. 
    Priority Severity: ${severity}. 
    Urgency Level: ${urgency}. 
    Estimated Reach: ${reach}. 
    Top AI Recommended Institution Match: ${topMatch}, with ${topMatchScore} percent match index. 
    Reasoning: ${matchReasons}`;
  },

  /**
   * 4. Chronological Shared Journey Narration
   */
  journey(issue: Issue, lang: Language | string = 'en'): string {
    const stageNotes: string[] = [];
    const isHindi = lang !== 'en';

    // Stage 1: Citizen Reported
    stageNotes.push(isHindi 
      ? `पहला चरण: नागरिक द्वारा समस्या दर्ज की गई - ${issue.title}` 
      : `Stage 1: Citizen Reported - ${issue.title}`);

    // Stage 2: AI Analysed
    stageNotes.push(isHindi 
      ? `दूसरा चरण: जनसेतु एआई द्वारा विश्लेषण संपन्न। डोमेन: ${issue.category}, गंभीरता: ${issue.severity}` 
      : `Stage 2: AI Analysed - Triaged category as ${issue.category} with ${issue.severity} priority.`);

    // Stage 3: Government Verified (if past initial stage)
    if (issue.status !== 'REPORTED' && (issue.status as string) !== 'AI_ANALYZING') {
      stageNotes.push(isHindi 
        ? `तीसरा चरण: सरकारी प्राधिकरण द्वारा स्थल सत्यापन पूर्ण।` 
        : `Stage 3: Government Verified - Priority and ground context officially verified.`);
    }

    // Stage 4: Institution Matched
    if (['MATCHED', 'COLLABORATING', 'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED', 'SOLUTION_DEVELOPMENT'].includes(issue.status as string)) {
      stageNotes.push(isHindi 
        ? `चौथा चरण: शिक्षण संस्थान संबद्ध - बीआईटी मेसरा कैपस्टोन टीम द्वारा अभिरुचि दर्ज।` 
        : `Stage 4: Higher-Ed Institution Matched - BIT Mesra capstone innovation team registered interest.`);
    }

    // Stage 5: CSR Support
    if (['COLLABORATING', 'PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED', 'SOLUTION_DEVELOPMENT'].includes(issue.status as string)) {
      stageNotes.push(isHindi 
        ? `पांचवां चरण: सीएसआर सहयोग - टाटा स्टील सीएसआर फाउंडेशन द्वारा सामग्री व अनुदान समर्थन।` 
        : `Stage 5: CSR Support Pledged - Industry partner pledged materials and pilot sponsorship.`);
    }

    // Stage 6: Solution Development
    if (['PROTOTYPING', 'DEPLOYED', 'IMPACT_VERIFIED', 'RESOLVED'].includes(issue.status as string)) {
      stageNotes.push(isHindi 
        ? `छठा चरण: समाधान निर्माण - प्रयोगशाला में प्रोटोटाइप निर्माण एवं परीक्षण जारी।` 
        : `Stage 6: Solution Prototyping - Lab fabrication and stress testing in progress.`);
    }

    // Stage 7: Impact Verified
    if (['IMPACT_VERIFIED', 'RESOLVED'].includes(issue.status as string)) {
      stageNotes.push(isHindi 
        ? `सातवां चरण: सत्यापित प्रभाव - समस्या का स्थायी समाधान और नागरिकों द्वारा संतुष्टि पुष्टि।` 
        : `Stage 7: Audited Community Impact - Permanent resolution deployed and community satisfaction verified.`);
    }

    return stageNotes.join('. ');
  },

  /**
   * 5. Government Review Summary
   */
  govtReview(issue: Issue, lang: Language | string = 'en'): string {
    const loc = `${issue.location?.locality || ''}, ${issue.location?.district || 'Ramgarh'}, Jharkhand`;
    if (lang !== 'en') {
      return `सरकारी समीक्षा सारांश। 
      समस्या: ${reviewTitleClean(issue.title)}. 
      ज़िला क्षेत्राधिकार: ${loc}. 
      प्रभावित आबादी: ${issue.estimatedPeopleAffected || 1200} नागरिक। 
      एआई प्राथमिकता: ${issue.severity}. 
      अनुशंसित सहयोगी: बीआईटी मेसरा एवं टाटा स्टील सीएसआर।`;
    }
    return `Government Review Summary. 
    Problem: ${reviewTitleClean(issue.title)}. 
    Jurisdiction: ${loc}. 
    Affected Population: Approximately ${issue.estimatedPeopleAffected || 1200} citizens. 
    AI Priority Severity: ${issue.severity}. 
    Recommended Academic & CSR Match: BIT Mesra Civil Hydrology Lab and Tata Steel Foundation.`;
  },

  /**
   * 6. University Challenge Summary
   */
  universityChallenge(issue: Issue, matchScore: number, reasons: string[], solutionDirection?: string, lang: Language | string = 'en'): string {
    if (lang !== 'en') {
      return `विश्वविद्यालय चुनौती विवरण। 
      चुनौती: ${issue.title}. 
      स्थान: ${issue.location?.district || 'Ramgarh'}, झारखंड। 
      श्रेणी: ${issue.category}. 
      एआई मिलान स्कोर: ${matchScore} प्रतिशत। 
      संबद्धता के कारण: ${reasons.slice(0, 2).join(', ')}. 
      अनुशंसित समाधान दिशा: ${solutionDirection || 'जल निकासी मॉडलिंग व पारगम्य टाइल्स डिजाइन।'}`;
    }
    return `University Capstone Challenge Summary. 
    Challenge: ${issue.title}. 
    Location: ${issue.location?.district || 'Ramgarh'}, Jharkhand. 
    Category: ${issue.category} with ${issue.severity} severity. 
    AI Match Index: ${matchScore} percent. 
    Key match reasons: ${reasons.slice(0, 2).join(', ')}. 
    Recommended solution direction: ${solutionDirection || 'Drainage modeling, porous pavement matrices, and runoff containment.'}`;
  },

  /**
   * 7. CSR Opportunity Summary
   */
  csrOpportunity(issue: Issue, matchedLab: string, supportReq: string, lang: Language | string = 'en'): string {
    if (lang !== 'en') {
      return `सीएसआर प्रभाव अवसर सारांश। 
      परियोजना: ${issue.title}. 
      ज़िला: ${issue.location?.district || 'Ramgarh'}, झारखंड। 
      संबद्ध विश्वविद्यालय लैब: ${matchedLab}. 
      अनुमानित लाभार्थी: ${issue.estimatedPeopleAffected || 1200} नागरिक। 
      संभावित आवश्यक सहयोग: ${supportReq}.`;
    }
    return `CSR Impact Investment Summary. 
    Project: ${issue.title}. 
    District: ${issue.location?.district || 'Ramgarh'}, Jharkhand. 
    Matched University Lab: ${matchedLab}. 
    Estimated Beneficiary Reach: ${issue.estimatedPeopleAffected || 1200} citizens. 
    Potential Support Required: ${supportReq}.`;
  },

  /**
   * 8. AI Recommended Institution & Why This Match Narration
   */
  institutionRecommendation(matches: any[], lang: Language | string = 'en'): string {
    if (!matches || matches.length === 0) {
      return lang !== 'en' ? 'कोई अनुशंसित संस्थान उपलब्ध नहीं है।' : 'No recommended institution available.';
    }
    const top = matches[0];
    const score = top.matchScore <= 1 ? Math.round(top.matchScore * 100) : Math.round(top.matchScore);
    const reasons = top.reasons?.join('. ') || 'Domain expertise in Jharkhand';

    if (lang !== 'en') {
      return `एआई अनुशंसित संस्थान। ${top.name}। एआई मिलान ${score} प्रतिशत। संबद्धता के कारण: ${reasons}।`;
    }
    return `AI recommended institution. ${top.name}. AI match ${score} percent. Reasons: ${reasons}.`;
  },

  /**
   * 9. Similar Problems Narration
   */
  similarProblemsList(similarProblems: any[], lang: Language | string = 'en'): string {
    if (!similarProblems || similarProblems.length === 0) {
      return lang !== 'en' ? 'झारखंड में कोई समान समस्या दर्ज नहीं है।' : 'No similar problems found in Jharkhand.';
    }
    const items = similarProblems.slice(0, 2).map(s => {
      const score = s.similarity <= 1 ? Math.round(s.similarity * 100) : Math.round(s.similarity);
      return lang !== 'en' ? `${s.title}, ${score} प्रतिशत समान` : `${s.title}, ${score} percent similar`;
    }).join('. ');

    if (lang !== 'en') {
      return `झारखंड में पाई गई समान समस्याएं। ${items}।`;
    }
    return `Similar problems found in Jharkhand. ${items}.`;
  },

  /**
   * 10. Recommended Next Action Narration
   */
  nextActionStep(status: string, lang: Language | string = 'en'): string {
    if (lang !== 'en') {
      return `अनुशंसित अगला कदम। सरकारी सत्यापन, उसके बाद संस्थान सहयोग और समाधान विकास।`;
    }
    return `Recommended next action. Government verification, followed by institution collaboration and solution development.`;
  }
};

function reviewTitleClean(title: string): string {
  return title.replace(/[*_#]/g, '').trim();
}

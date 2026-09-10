import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'nag' | 'kho' | 'sat';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    nag?: string;
    kho?: string;
    sat?: string;
  };
}

export const DICTIONARY: Translations = {
  // Brand & Slogan
  app_name: { en: 'JanSetu', hi: 'जनसेतु', nag: 'जनसेतु', kho: 'जनसेतु', sat: 'ᱡᱟᱱᱥᱮᱛᱩ' },
  tagline: { 
    en: '"Jan Ki Baat, Solution Ke Saath."', 
    hi: '"जन की बात, समाधान के साथ।"',
    nag: '"जनता कर बात, समाधान कर साथ।"',
    kho: '"मनुख के बात, निदान के साथ।"',
    sat: '"ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱠᱟᱛᱷᱟ, ᱥᱟᱢᱟᱫᱷᱟᱱ ᱥᱟᱶᱛᱮ"'
  },
  subtagline: { 
    en: 'Connecting people to solutions', 
    hi: 'समस्याओं से समाधान तक',
    nag: 'तकलीफ से समाधान तक',
    kho: 'दिक्कत से समाधान तक',
    sat: 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱷᱚᱱ ᱥᱟᱢᱟᱫᱷᱟᱱ'
  },
  positioning_badge: { en: 'JANSETU • JHARKHAND CIVIC RESOLUTION ENGINE', hi: 'जनसेतु • झारखंड नागरिक समाधान इंजन' },
  
  // Navigation
  nav_how_it_works: { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  nav_explore: { en: 'Explore Problems', hi: 'समस्याएं देखें' },
  nav_solutions: { en: 'Solutions', hi: 'समाधान हब' },
  nav_impact: { en: 'Impact', hi: 'प्रभाव एवं डेटा' },
  nav_about: { en: 'About', hi: 'परिचय' },
  nav_report: { en: 'Report a Problem', hi: 'समस्या दर्ज करें' },
  nav_login: { en: 'Login / Roles', hi: 'लॉगिन / भूमिकाएं' },
  nav_dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  nav_profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
  nav_logout: { en: 'Sign Out', hi: 'लॉगआउट' },
  nav_notifications: { en: 'Notifications', hi: 'सूचनाएं' },
  nav_switch_role: { en: 'Switch Portal', hi: 'पोर्टल बदलें' },

  // Hero Section
  hero_title_1: { en: 'Jan Ki Baat,', hi: 'जन की बात,' },
  hero_title_2: { en: 'Solution Ke Saath.', hi: 'समाधान के साथ।' },
  hero_subtext: { 
    en: 'Report problems across Jharkhand, connect them with local university engineers and CSR partners, and follow the transparent journey from civic problem to verified impact.',
    hi: 'झारखंड भर में स्थानीय समस्याएं दर्ज करें, उन्हें विश्वविद्यालय के शोधकर्ताओं व सीएसआर भागीदारों से जोड़ें और पारदर्शी तरीके से समाधान तक पहुंचें।'
  },
  hero_cta_report: { en: 'REPORT A PROBLEM', hi: 'समस्या दर्ज करें' },
  hero_cta_explore: { en: 'EXPLORE PROBLEMS', hi: 'समस्याएं देखें' },
  hero_badge_gps: { en: 'GPS Ground Verified', hi: 'जीपीएस द्वारा सत्यापित' },
  hero_badge_univ: { en: 'Jharkhand Higher Ed Matches', hi: 'झारखंड उच्च शिक्षा संस्थान' },
  hero_badge_csr: { en: 'Potential CSR Support', hi: 'संभावित सीएसआर सहयोग' },

  // 3-Visual Hero Section
  hero_v1_tag: { en: '1. CITIZEN PROBLEM', hi: '1. नागरिक / समस्या' },
  hero_v1_citizen: { en: 'Citizen from Ramgarh', hi: 'रामगढ़ के नागरिक' },
  hero_v1_title: { en: 'Waterlogging near school entrance', hi: 'स्कूल के पास जलभराव की समस्या' },
  hero_v1_loc: { en: 'Ramgarh, Ward 12, Jharkhand', hi: 'रामगढ़, वार्ड 12, झारखंड' },
  hero_v1_status: { en: 'GPS Ground Verified', hi: 'जीपीएस द्वारा सत्यापित' },
  
  hero_v2_tag: { en: '2. COLLABORATION / AI MATCH', hi: '2. सहयोग एवं एआई मैच' },
  hero_v2_title: { en: 'People → Institution → Solution', hi: 'नागरिक → संस्थान → समाधान' },
  hero_v2_match: { en: 'BIT Mesra (91% Match)', hi: 'बीआईटी मेसरा (91% मैच)' },
  hero_v2_submatch: { en: 'IIT (ISM) Dhanbad (84% Match)', hi: 'आईआईटी धनबाद (84% मैच)' },
  hero_v2_partner: { en: 'District Admin + Potential CSR Support', hi: 'जिला प्रशासन + संभावित सीएसआर सहयोग' },
  hero_v2_status: { en: 'AI Recommended Match', hi: 'एआई अनुशंसित मैच' },

  hero_v3_tag: { en: '3. SOLUTION / IMPACT', hi: '3. समाधान एवं प्रभाव' },
  hero_v3_title: { en: 'Safer school access & permeable tiles', hi: 'सुरक्षित स्कूल मार्ग व पारगम्य जल निकासी' },
  hero_v3_impact: { en: '1,200+ Students & Residents Benefited', hi: '1,200+ छात्रों व नागरिकों को लाभ' },
  hero_v3_loc: { en: 'Ramgarh District Pilot', hi: 'रामगढ़ जिला पायलट' },
  hero_v3_status: { en: 'Sample Prototype Impact', hi: 'नमूना प्रोटोटाइप प्रभाव' },

  // Flow Ribbon
  hero_flow_title: { en: 'Connected Civic Resolution Flow', hi: 'संबद्ध नागरिक समाधान प्रवाह' },
  hero_flow_subtitle: { en: 'Ramgarh Pilot #JS-2026-001245', hi: 'रामगढ़ पायलट #JS-2026-001245' },
  hero_flow_step1: { en: 'Problem', hi: 'समस्या' },
  hero_flow_step2: { en: 'AI Match', hi: 'एआई मैच' },
  hero_flow_step3: { en: 'Impact', hi: 'प्रभाव' },

  // Stats Band
  stats_problems: { en: 'Problems Reported', hi: 'दर्ज समस्याएं' },
  stats_problems_sub: { en: 'Jharkhand civic observations', hi: 'झारखंड नागरिक अवलोकन' },
  stats_solutions: { en: 'Solutions Developed', hi: 'विकसित समाधान' },
  stats_solutions_sub: { en: 'Demo & active prototypes', hi: 'प्रोटोटाइप व तकनीकी मॉडल' },
  stats_univ: { en: 'Institutions Matched', hi: 'संबद्ध शिक्षण संस्थान' },
  stats_univ_sub: { en: 'BIT Mesra, IIT ISM, NIT JSR & more', hi: 'बीआईटी, आईआईटी, एनआईटी आदि' },
  stats_industry: { en: 'CSR & Govt Partners', hi: 'सीएसआर व सरकारी विभाग' },
  stats_industry_sub: { en: 'Potential partners & nodal desks', hi: 'संभावित सहयोगी व नोडल विभाग' },
  stats_people: { en: 'Citizens in Pilot Catchment', hi: 'पायलट दायरे में नागरिक' },
  stats_people_sub: { en: 'Prototype testing zones', hi: 'प्रोटोटाइप परीक्षण क्षेत्र' },

  // Roles
  role_citizen: { en: 'Citizen', hi: 'नागरिक' },
  role_govt: { en: 'Govt Authority', hi: 'सरकारी प्राधिकरण' },
  role_univ: { en: 'University Hub', hi: 'विश्वविद्यालय संस्थान' },
  role_industry: { en: 'Industry & CSR', hi: 'उद्योग एवं सीएसआर' },

  // Status Labels
  status_reported: { en: 'Reported', hi: 'दर्ज' },
  status_verified: { en: 'Verified', hi: 'सत्यापित' },
  status_matched: { en: 'Matched', hi: 'संस्थान संबद्ध' },
  status_collaborating: { en: 'Collaborating', hi: 'सहयोग जारी' },
  status_prototyping: { en: 'Prototyping', hi: 'प्रोटोटाइपिंग' },
  status_deployed: { en: 'Deployed', hi: 'क्रियान्वित' },
  status_impact_verified: { en: 'Impact Verified', hi: 'प्रभाव सत्यापित' },

  // Location UI
  detected_location: { en: 'Detected Location', hi: 'पहचाना गया स्थान' },
  location_confirm_question: { en: 'Is this location correct?', hi: 'क्या यह स्थान सही है?' },
  btn_yes_continue: { en: 'Yes, Continue', hi: 'हाँ, आगे बढ़ें' },
  btn_change_location: { en: 'Change Location', hi: 'स्थान बदलें' },
  label_district: { en: 'District', hi: 'ज़िला' },
  label_block: { en: 'Block', hi: 'प्रखंड' },
  label_city: { en: 'Village / Town / City', hi: 'गाँव / कस्बा / शहर' },
  label_area: { en: 'Area / Locality / Ward', hi: 'क्षेत्र / मोहल्ला / वार्ड' },
  label_pincode: { en: 'Pincode', hi: 'पिनकोड' },
  label_state: { en: 'State', hi: 'राज्य' },

  // Common Buttons & Labels
  btn_upvote: { en: 'Upvote', hi: 'समर्थन दें' },
  btn_upvoted: { en: 'Upvoted', hi: 'समर्थन दिया' },
  btn_view_details: { en: 'View Details', hi: 'विवरण देखें' },
  btn_back: { en: 'Back', hi: 'वापस' },
  btn_next: { en: 'Next', hi: 'आगे' },
  btn_submit: { en: 'Submit', hi: 'जमा करें' },
  btn_learn_more: { en: 'Learn More', hi: 'अधिक जानें' },
  demo_badge: { en: 'PROTOTYPE DATA', hi: 'प्रोटोटाइप डेटा' },
  potential_match: { en: 'Potential Match', hi: 'संभावित मैच' },
  ai_recommended: { en: 'AI Recommended', hi: 'एआई अनुशंसित' },
  sample_impact: { en: 'Sample Impact', hi: 'नमूना प्रभाव' },

  // Footer
  footer_platform: { en: 'Platform', hi: 'प्लेटफ़ॉर्म' },
  footer_participate: { en: 'Participate', hi: 'सहभागिता' },
  footer_resources: { en: 'Resources & Connect', hi: 'संसाधन एवं संपर्क' },
  footer_language: { en: 'Language / भाषा', hi: 'भाषा / Language' },
  footer_rights: { en: '© 2026 JanSetu. Built for Jharkhand. Designed to scale.', hi: '© 2026 जनसेतु। झारखंड के लिए निर्मित। पूरे भारत के लिए सक्षम।' },
  footer_open_protocol: { en: 'Open Civic Innovation Protocol', hi: 'ओपन नागरिक नवाचार प्रोटोकॉल' },
  footer_privacy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  footer_terms: { en: 'Terms of Civic Engagement', hi: 'नागरिक सेवा शर्तें' },
  footer_accessibility: { en: 'Accessibility Standards', hi: 'सुलभता मानक' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('jansetu_lang');
    return (['en', 'hi', 'nag', 'kho', 'sat'].includes(saved || '')) ? (saved as Language) : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jansetu_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'hi';
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    if (DICTIONARY[key]) {
      const entry = DICTIONARY[key] as any;
      if (entry[language]) return entry[language];
      if (['nag', 'kho', 'sat'].includes(language) && entry.hi) return entry.hi;
      if (entry.en) return entry.en;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

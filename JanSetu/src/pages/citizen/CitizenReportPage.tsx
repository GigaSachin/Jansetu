import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useIssues } from '../../context/IssuesContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { SpeakButton } from '../../components/common/SpeakButton';
import { VoiceInputButton } from '../../components/common/VoiceInputButton';
import { IssueCategory, SeverityLevel, EvidenceFile } from '../../types';
import { aiEngineService, TriageResultResponse } from '../../services/aiEngineService';
import { 
  PlusCircle, 
  MapPin,
  Camera,
  Image as ImageIcon,
  Video,
  FileText,
  CheckCircle2, 
  Trash2,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Droplets, 
  Construction, 
  Trash, 
  Lightbulb, 
  HeartPulse, 
  GraduationCap, 
  Trees, 
  Wheat, 
  ShieldAlert, 
  Accessibility, 
  Building, 
  Globe, 
  HelpCircle,
  Briefcase,
  BrainCircuit,
  RefreshCw
} from 'lucide-react';

const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Ramgarh',
  'Hazaribagh',
  'Dhanbad',
  'Bokaro',
  'East Singhbhum (Jamshedpur)',
  'West Singhbhum (Chaibasa)',
  'Saraikela-Kharsawan',
  'Deoghar',
  'Dumka',
  'Giridih',
  'Gumla',
  'Lohardaga',
  'Khunti',
  'Palamu',
  'Garhwa',
  'Simdega',
  'Sahibganj',
  'Pakur',
  'Godda',
  'Koderma',
  'Jamtara',
  'Latehar',
  'Chatra'
];

export const CitizenReportPage: React.FC = () => {
  const { addIssue } = useIssues();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [createdIssueId, setCreatedIssueId] = useState<string | null>(null);

  // Step 1: Details
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Water & Sanitation');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('MEDIUM');
  const [estimatedPeople, setEstimatedPeople] = useState<number>(250);

  // Step 2: Location (Jharkhand Default)
  const [district, setDistrict] = useState('Ramgarh');
  const [locality, setLocality] = useState('Dushad Mohalla, Ward 12');
  const [block, setBlock] = useState('Ramgarh Block');
  const [city, setCity] = useState('Ramgarh');
  const [stateName] = useState('Jharkhand');
  const [pincode, setPincode] = useState('829122');
  const [isManualLocation, setIsManualLocation] = useState(false);
  const [locDetecting, setLocDetecting] = useState(false);

  // Step 3: Evidence
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([
    {
      id: 'ev-default-1',
      name: 'waterlog_road_entrance.jpg',
      size: 2450000,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      uploadedAt: new Date().toISOString()
    }
  ]);

  // Step 4: Confirmation & AI Triage
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [liveAiTriage, setLiveAiTriage] = useState<TriageResultResponse | null>(null);
  const [isAiTriaging, setIsAiTriaging] = useState(false);

  const handleRunAiTriage = async () => {
    setIsAiTriaging(true);
    const draftId = `DRAFT-${Math.floor(Math.random() * 1000000)}`;
    const result = await aiEngineService.analyzeProblem({
      problemId: draftId,
      text: `${title || 'Waterlogging near school'}. ${description || 'Drainage overflow during monsoon'}`,
      district
    });
    setLiveAiTriage(result);
    if (result.category && result.category !== 'Other' && result.category !== 'Routine Municipal Complaint') {
      const match = categoriesConfig.find(c => c.category === result.category);
      if (match) {
        setCategory(match.category);
      }
    }
    if (result.severity) {
      setSeverity(result.severity === 'CRITICAL' ? 'HIGH' : result.severity as SeverityLevel);
    }
    setIsAiTriaging(false);
  };

  const categoriesConfig: { category: IssueCategory; icon: any; label: string }[] = [
    { category: 'Water & Sanitation', icon: Droplets, label: language === 'hi' ? 'जल एवं स्वच्छता' : 'Water & Sanitation' },
    { category: 'Roads & Transport', icon: Construction, label: language === 'hi' ? 'सड़क एवं परिवहन' : 'Roads & Transport' },
    { category: 'Electricity & Lighting', icon: Lightbulb, label: language === 'hi' ? 'बिजली एवं स्ट्रीट लाइट' : 'Electricity' },
    { category: 'Healthcare Access', icon: HeartPulse, label: language === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Healthcare' },
    { category: 'Education Infrastructure', icon: GraduationCap, label: language === 'hi' ? 'शिक्षा एवं विद्यालय' : 'Education' },
    { category: 'Agriculture & Rural', icon: Wheat, label: language === 'hi' ? 'कृषि एवं सिंचाई' : 'Agriculture' },
    { category: 'Environment & Greenery', icon: Trees, label: language === 'hi' ? 'पर्यावरण एवं हरियाली' : 'Environment' },
    { category: 'Waste Management', icon: Trash, label: language === 'hi' ? 'कचरा प्रबंधन' : 'Waste Management' },
    { category: 'Public Safety', icon: ShieldAlert, label: language === 'hi' ? 'सार्वजनिक सुरक्षा' : 'Public Safety' },
    { category: 'Accessibility & Inclusion', icon: Accessibility, label: language === 'hi' ? 'महिला व बाल सुरक्षा' : 'Women & Child Safety' },
    { category: 'Public Infrastructure', icon: Building, label: language === 'hi' ? 'सार्वजनिक बुनियादी ढांचा' : 'Infrastructure' },
    { category: 'Digital Services', icon: Briefcase, label: language === 'hi' ? 'रोजगार व आजीविका' : 'Employment & Livelihood' },
    { category: 'Other', icon: Globe, label: language === 'hi' ? 'डिजिटल / नागरिक सेवाएं' : 'Digital/Public Services' },
    { category: 'Other', icon: HelpCircle, label: language === 'hi' ? 'अन्य नागरिक समस्या' : 'Other' },
  ];

  const [latitude, setLatitude] = useState<number>(23.6338);
  const [longitude, setLongitude] = useState<number>(85.5186);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);
  const videoInputRef = React.useRef<HTMLInputElement | null>(null);
  const docInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDetectLocation = () => {
    setLocDetecting(true);
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`, {
              signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              const addr = data.address || {};
              const detectedDistrict = addr.state_district || addr.county || addr.city || 'Ramgarh';
              const matchedDist = JHARKHAND_DISTRICTS.find(d => detectedDistrict.toLowerCase().includes(d.toLowerCase())) || 'Ramgarh';
              
              setLocality(addr.suburb || addr.neighbourhood || addr.road || 'Current GPS Location');
              setBlock(addr.village || addr.town || addr.municipality || `${matchedDist} Block`);
              setCity(addr.city || addr.town || addr.village || matchedDist);
              setDistrict(matchedDist);
              if (addr.postcode) setPincode(addr.postcode);
            } else {
              setLocality(`GPS: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
            }
          } catch {
            setLocality(`GPS: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
          }
          setLocDetecting(false);
        },
        (err) => {
          console.warn('Geolocation failed or permission denied:', err);
          // Fallback to default Jharkhand location
          setLocality('Dushad Mohalla, Ward 12');
          setBlock('Ramgarh Block');
          setCity('Ramgarh');
          setDistrict('Ramgarh');
          setPincode('829122');
          setLocDetecting(false);
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      setLocDetecting(false);
    }
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'video' | 'document') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      const newFile: EvidenceFile = {
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: fileType,
        url: fileUrl,
        uploadedAt: new Date().toISOString()
      };
      setEvidenceFiles((prev) => [...prev, newFile]);
    });
    e.target.value = '';
  };

  const handleRemoveFile = (id: string) => {
    setEvidenceFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;

    const created = addIssue({
      title: title || 'Waterlogging near government school entrance',
      category,
      description: description || 'Heavy rainfall causes waterlogging near the school entrance, making access difficult for students and residents.',
      severity,
      status: 'REPORTED',
      location: {
        locality,
        city,
        district,
        state: stateName,
        pincode
      },
      reportedBy: {
        id: user?.id || 'usr-cit-1',
        name: user?.name || 'Pooja Verma',
        avatar: user?.avatar
      },
      evidence: evidenceFiles,
      estimatedPeopleAffected: estimatedPeople
    });

    setCreatedIssueId(created.id);
    setCurrentStep(5);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'झारखंड नागरिक समस्या पंजीकरण' : 'Jharkhand Problem Submission Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'hi' ? 'बताएं, आपके इलाके में क्या समस्या है?' : "Tell us what's happening."}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi' 
              ? 'आपका एक अवलोकन हमारे स्थानीय इंजीनियरिंग कॉलेजों और सीएसआर टीमों के साथ जुड़कर वास्तविक समाधान बन सकता है।'
              : 'Your observation could be the starting point for a real engineering & CSR solution in Jharkhand.'
            }
          </p>
        </div>

        {/* Stepper Wizard (Steps 1 to 5) */}
        {currentStep < 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-xs">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: language === 'hi' ? 'विवरण' : 'Details' },
                { num: 2, label: language === 'hi' ? 'स्थान' : 'Location' },
                { num: 3, label: language === 'hi' ? 'प्रमाण' : 'Evidence' },
                { num: 4, label: language === 'hi' ? 'समीक्षा' : 'Review' }
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                      currentStep === s.num
                        ? 'bg-brand-600 text-white shadow-sm'
                        : currentStep > s.num
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${
                    currentStep === s.num ? 'text-brand-900' : 'text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: DETAILS */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {language === 'hi' ? 'चरण 1 • समस्या का विवरण' : 'Step 1 • Problem Details'}
              </h2>
              <SpeakButton 
                text={language === 'hi' 
                  ? 'समस्या दर्ज करने का चरण। अपनी समस्या का शीर्षक और विवरण बोलकर या लिखकर बताएं। जनसेतु एआई आपकी समस्या का विश्लेषण करेगा।' 
                  : 'Problem submission step. Tell us what is happening by speaking or typing. JanSetu AI will automatically analyze your problem and match local universities.'} 
                label={language === 'hi' ? 'निर्देश सुनें' : 'Listen to Instructions'} 
                size="sm" 
                variant="pill" 
              />
            </div>

            <div className="space-y-6">
              
              {/* Problem Title */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {language === 'hi' ? 'समस्या का शीर्षक' : 'Problem Title'} <span className="text-rose-500">*</span>
                  </label>
                  <VoiceInputButton 
                    onTranscript={(text) => setTitle(text)} 
                    label={language === 'hi' ? 'बोलकर शीर्षक लिखें' : 'Speak Title'} 
                  />
                </div>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === 'hi' ? 'उदाहरण: सरकारी स्कूल के मुख्य प्रवेश द्वार के पास जलभराव' : 'Example: Waterlogging near government school entrance'}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {language === 'hi' ? 'झारखंड के अपने मोहल्ले, स्कूल या सड़क की सटीक समस्या लिखें' : 'Be clear and specific about the local problem.'}
                </span>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'समस्या की श्रेणी' : 'Problem Category'} <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {categoriesConfig.map((catItem, idx) => {
                    const Icon = catItem.icon;
                    const isSelected = category === catItem.category;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCategory(catItem.category)}
                        className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-brand-50/90 border-brand-500 text-brand-900 ring-1 ring-brand-400 font-bold shadow-xs'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                        <span className="text-xs truncate">{catItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {language === 'hi' ? 'विस्तृत विवरण' : 'Detailed Description'} <span className="text-rose-500">*</span>
                  </label>
                  <VoiceInputButton 
                    onTranscript={(text) => setDescription(prev => prev ? `${prev} ${text}` : text)} 
                    label={language === 'hi' ? 'बोलकर विवरण दें' : 'Speak Description'} 
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={language === 'hi' 
                    ? 'उदाहरण: भारी बारिश के कारण स्कूल के गेट के सामने 1.5 फीट पानी भर जाता है, जिससे 450 छात्र व राहगीर 5 दिनों तक प्रभावित रहते हैं।' 
                    : 'Example: Heavy rainfall causes waterlogging near the school entrance, making access difficult for students and residents.'
                  }
                  className="w-full p-4 rounded-2xl border border-slate-200 text-sm leading-relaxed focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              {/* Severity & Affected Estimation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'गंभीरता का स्तर' : 'Severity Level'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['LOW', 'MEDIUM', 'HIGH'] as SeverityLevel[]).map((sev) => (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSeverity(sev)}
                        className={`py-2.5 rounded-xl text-xs font-extrabold border transition ${
                          severity === sev
                            ? sev === 'HIGH' 
                              ? 'bg-rose-500 text-white border-rose-600'
                              : 'bg-brand-600 text-white border-brand-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'प्रभावित लोग (अनुमानित)' : 'Estimated People Affected'}
                  </label>
                  <input
                    type="number"
                    value={estimatedPeople}
                    onChange={(e) => setEstimatedPeople(Number(e.target.value))}
                    min={10}
                    step={50}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* AI Engine Assistant Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-brand-50/60 border border-indigo-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>{language === 'hi' ? 'जनसेतु एआई इंजन v2 सहायक' : 'JanSetu AI Engine v2 Assistant'}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">Live</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'hi' ? 'समस्या के आधार पर श्रेणी व संस्थान का स्वतः सुझाव प्राप्त करें' : 'Auto-classify domain, severity & match Jharkhand institutions'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunAiTriage}
                    disabled={isAiTriaging || (!title && !description)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition active:scale-95"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAiTriaging ? 'animate-spin' : ''}`} />
                    <span>{isAiTriaging ? (language === 'hi' ? 'विश्लेषण...' : 'Analyzing...') : (language === 'hi' ? '🤖 एआई से स्वतः जांचें' : '🤖 Auto-Analyze with AI')}</span>
                  </button>
                </div>

                {liveAiTriage && (
                  <div className="mt-3 pt-3 border-t border-indigo-200/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/90 border border-indigo-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Suggested Category</span>
                      <strong className="text-slate-900">{liveAiTriage.category}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 border border-indigo-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimated Urgency</span>
                      <strong className="text-amber-700">{liveAiTriage.urgency} ({liveAiTriage.severity})</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 border border-indigo-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Match</span>
                      <strong className="text-indigo-700 truncate block">
                        {liveAiTriage.institutionMatches[0]?.name || 'BIT Mesra, Ranchi'}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
                >
                  <span>{language === 'hi' ? 'स्थान विवरण पर जाएं' : 'Proceed to Location'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: LOCATION (JHARKHAND-FIRST FLOW) */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
              {language === 'hi' ? 'चरण 2 • सटीक स्थान की पहचान' : 'Step 2 • Pinpoint Location'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {language === 'hi' ? 'समस्या का स्थान सही होना आवश्यक है ताकि संबंधित नगर पालिका व स्थानीय विश्वविद्यालय से संपर्क हो सके।' : 'Accurate location ensures the right district body and local engineering institution are matched.'}
            </p>

            <div className="space-y-6">
              
              {/* Geolocation Detection Banner */}
              <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-brand-800 uppercase tracking-wide block">
                      {t('detected_location', 'Detected Location')}
                    </span>
                    <div className="text-base font-extrabold text-slate-900 mt-0.5">
                      📍 {locality}, {city}, {district}
                    </div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">
                      {district}, {stateName} — {pincode}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={locDetecting}
                  className="px-3.5 py-2 rounded-xl bg-white border border-brand-300 text-brand-700 text-xs font-bold hover:bg-brand-100 transition shrink-0"
                >
                  {locDetecting ? (language === 'hi' ? 'पहचान हो रही है...' : 'Detecting...') : (language === 'hi' ? 'जीपीएस पुनः पहचानें' : 'Re-Detect GPS')}
                </button>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative h-44 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-70" />
                <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md">
                  <span className="text-xs font-bold text-slate-800">
                    📍 {locality}, {city}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Lat: {latitude.toFixed(4)}° N • Lng: {longitude.toFixed(4)}° E ({district}, {stateName})
                  </span>
                </div>
              </div>

              {/* Explicit Question: Is this location correct? */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                      {t('location_confirm_question', 'Is this location correct?')}
                    </span>
                    <span className="text-xs text-slate-500">
                      {locality}, {city}, {district}, {stateName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsManualLocation(true)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                        isManualLocation 
                          ? 'bg-slate-200 text-slate-800 border-slate-300' 
                          : 'bg-white text-brand-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t('btn_change_location', 'Change Location')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('btn_yes_continue', 'Yes, Continue')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Manual Correction Fields for Jharkhand */}
              {isManualLocation && (
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {language === 'hi' ? 'मैन्युअल स्थान दर्ज करें (झारखंड)' : 'Manual Location Details (Jharkhand)'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_district', 'District')} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setCity(e.target.value);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white font-semibold text-slate-800"
                      >
                        {JHARKHAND_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_block', 'Block')}
                      </label>
                      <input
                        type="text"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        placeholder="e.g. Ramgarh Block / Gola / Patratu"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_city', 'Village / Town / City')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Ramgarh Cantonment"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_area', 'Area / Locality / Ward')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Dushad Mohalla, Ward 12"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_state', 'State')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Jharkhand (Default State)"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-100 text-slate-600 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('label_pincode', 'Pincode')}
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 829122"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" /> {t('btn_back', 'Back to Details')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
                >
                  <span>{language === 'hi' ? 'प्रमाण फ़ाइलें जोड़ें' : 'Proceed to Evidence'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: EVIDENCE */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
              {language === 'hi' ? 'चरण 3 • फोटो एवं प्रमाण जोड़ें' : 'Step 3 • Upload Evidence'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {language === 'hi' 
                ? 'फोटो, वीडियो या दस्तावेज़ जोड़ने से इंजीनियरिंग टीम और अधिकारियों को सटीक स्थिति समझने में मदद मिलती है।' 
                : 'Photos, videos or documents help engineering labs and government officials understand the ground situation.'
              }
            </p>

            <div className="space-y-6">
              {/* Hidden Real File Inputs */}
              <input 
                type="file" 
                ref={cameraInputRef} 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                onChange={(e) => handleRealFileUpload(e, 'image')} 
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={(e) => handleRealFileUpload(e, 'image')} 
              />
              <input 
                type="file" 
                ref={videoInputRef} 
                accept="video/*" 
                className="hidden" 
                onChange={(e) => handleRealFileUpload(e, 'video')} 
              />
              <input 
                type="file" 
                ref={docInputRef} 
                accept=".pdf,.doc,.docx,application/pdf" 
                multiple 
                className="hidden" 
                onChange={(e) => handleRealFileUpload(e, 'document')} 
              />
              
              {/* Media Picker Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'फोटो खींचें' : 'Take Photo'}</span>
                  <span className="text-[10px] text-slate-400">Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'गैलरी से चुनें' : 'From Gallery'}</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'वीडियो क्लिप' : 'Upload Video'}</span>
                  <span className="text-[10px] text-slate-400">MP4, MOV</span>
                </button>

                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'दस्तावेज़ / पत्र' : 'Documents'}</span>
                  <span className="text-[10px] text-slate-400">PDF, DOC</span>
                </button>
              </div>

              {/* Uploaded File Previews */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'संलग्न फ़ाइलें' : 'Attached Files'} ({evidenceFiles.length})
                </span>

                {evidenceFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {file.type === 'image' && (
                        <img
                          src={file.url}
                          alt="preview"
                          className="w-12 h-12 rounded-xl object-cover border shrink-0"
                        />
                      )}
                      {file.type === 'video' && (
                        <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                          <Video className="w-6 h-6" />
                        </div>
                      )}
                      {file.type === 'document' && (
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB • {language === 'hi' ? 'अपलोड किया गया' : 'Uploaded'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" /> {t('btn_back', 'Back to Location')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
                >
                  <span>{language === 'hi' ? 'समीक्षा करें' : 'Review Submission'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: REVIEW & CONFIRM */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-6">
              {language === 'hi' ? 'चरण 4 • दर्ज विवरण की समीक्षा' : 'Step 4 • Review Your Problem Report'}
            </h2>

            <form onSubmit={handleSubmitProblem} className="space-y-6">
              
              {/* Problem Section Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                    {category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-brand-700 hover:underline"
                  >
                    {language === 'hi' ? 'संशोधित करें' : 'Edit'}
                  </button>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {title || 'Waterlogging near government school entrance'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {description || 'Heavy rainfall causes waterlogging near the school entrance, making access difficult for students and residents.'}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>{language === 'hi' ? 'गंभीरता:' : 'Severity:'} <strong className="text-slate-800">{severity}</strong></span>
                  <span>•</span>
                  <span>{language === 'hi' ? 'प्रभावित लोग:' : 'Affected:'} <strong className="text-slate-800">{estimatedPeople} citizens</strong></span>
                </div>
              </div>

              {/* Location Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t('label_district', 'Location')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-brand-700 hover:underline"
                  >
                    {language === 'hi' ? 'संशोधित करें' : 'Edit'}
                  </button>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{locality}, {block}, {city}, {district}, {stateName} — {pincode}</span>
                </div>
              </div>

              {/* Evidence Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'hi' ? 'संलग्न प्रमाण फ़ाइलें' : 'Evidence Attached'} ({evidenceFiles.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-bold text-brand-700 hover:underline"
                  >
                    {language === 'hi' ? 'संशोधित करें' : 'Edit'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {evidenceFiles.map(f => (
                    <span key={f.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Pre-Triage Pipeline Preview */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    {language === 'hi' ? 'जनसेतु एआई प्री-ट्राएज सक्रिय' : 'JanSetu AI Engine Pre-Triage Active'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-200/70 text-indigo-800 ml-auto">
                    v2.0 Connected
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi'
                    ? 'जमा करने पर, एआई इंजन स्वतः इस समस्या को झारखंड के संबद्ध विश्वविद्यालयों (उदा. बीआईटी मेसरा, आईआईटी धनबाद) के साथ मैच करेगा और स्थानीय प्रशासन को प्रेषित करेगा।'
                    : 'Upon submission, the AI engine will classify domain vectors and trigger recommendation pipelines to partner Jharkhand universities.'
                  }
                </p>
              </div>

              {/* Citizen Accuracy Confirmation */}
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  {language === 'hi'
                    ? 'मैं पुष्टि करता/करती हूँ कि दी गई जानकारी मेरी सर्वोत्तम जानकारी के अनुसार सही है और यह एक वास्तविक नागरिक समस्या है।'
                    : 'I confirm that the information provided is accurate to the best of my knowledge and represents a genuine community observation in Jharkhand.'
                  }
                </span>
              </label>

              {/* Navigation & Submit */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" /> {t('btn_back', 'Back to Evidence')}
                </button>
                <button
                  type="submit"
                  disabled={!isConfirmed}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition active:scale-95"
                >
                  <span>{language === 'hi' ? 'समस्या दर्ज करें' : 'SUBMIT PROBLEM'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: SUCCESS & 7-STAGE PIPELINE LAUNCH */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card text-center max-w-2xl mx-auto">
            
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सफलतापूर्वक पंजीकृत' : 'Registered Successfully'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              "{language === 'hi' ? 'आपकी समस्या अब समाधान की यात्रा पर है।' : 'Your problem is now on its journey.'}"
            </h2>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto my-4">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                JanSetu Tracking ID
              </span>
              <span className="font-mono text-xl font-black text-brand-700">
                {createdIssueId || 'JS-2026-001245'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              {language === 'hi'
                ? 'हमने ज़मीनी सत्यापन के लिए स्थानीय ज़िला प्रशासन को सूचित किया है और बीआईटी मेसरा, आईआईटी धनबाद आदि के लिए एआई मैचिंग सक्रिय कर दी है।'
                : 'We have notified the local district authority for on-site verification and activated the AI matching system for partner engineering universities.'
              }
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/citizen/issues/${createdIssueId || 'JS-2026-001245'}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
              >
                <span>{language === 'hi' ? 'समस्या की प्रगति देखें' : 'TRACK MY PROBLEM'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
              >
                {language === 'hi' ? 'अन्य समस्या दर्ज करें' : 'REPORT ANOTHER PROBLEM'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

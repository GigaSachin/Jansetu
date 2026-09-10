import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { IssuesProvider } from './context/IssuesContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ExploreProblemsPage } from './pages/ExploreProblemsPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ImpactPage } from './pages/ImpactPage';
import { AboutPage } from './pages/AboutPage';

// Auth Pages
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { CitizenLoginPage } from './pages/auth/CitizenLoginPage';
import { GovernmentLoginPage } from './pages/auth/GovernmentLoginPage';
import { UniversityLoginPage } from './pages/auth/UniversityLoginPage';
import { IndustryLoginPage } from './pages/auth/IndustryLoginPage';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { CitizenReportPage } from './pages/citizen/CitizenReportPage';
import { CitizenIssueDetailPage } from './pages/citizen/CitizenIssueDetailPage';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';

// University Pages
import { UniversityDashboard } from './pages/university/UniversityDashboard';
import { UniversityChallengesPage } from './pages/university/UniversityChallengesPage';
import { UniversityWorkspacePage } from './pages/university/UniversityWorkspacePage';

// Government Pages
import { GovtDashboard } from './pages/government/GovtDashboard';

// Industry Pages
import { IndustryDashboard } from './pages/industry/IndustryDashboard';

// Common Pages
import { NotificationsPage } from './pages/common/NotificationsPage';

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <IssuesProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-brand-500 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Core Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/explore" element={<ExploreProblemsPage />} />
                  <Route path="/explore/:id" element={<ProblemDetailPage />} />
                  <Route path="/solutions" element={<SolutionsPage />} />
                  <Route path="/impact" element={<ImpactPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* Role Selection & Login Routes */}
                  <Route path="/roles" element={<RoleSelectionPage />} />
                  <Route path="/login" element={<Navigate to="/roles" replace />} />
                  <Route path="/login/citizen" element={<CitizenLoginPage />} />
                  <Route path="/login/government" element={<GovernmentLoginPage />} />
                  <Route path="/login/university" element={<UniversityLoginPage />} />
                  <Route path="/login/industry" element={<IndustryLoginPage />} />

                  {/* Citizen Portal Routes (Protected) */}
                  <Route path="/citizen/dashboard" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenDashboard /></ProtectedRoute>} />
                  <Route path="/citizen/report" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenReportPage /></ProtectedRoute>} />
                  <Route path="/citizen/issues/:id" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenIssueDetailPage /></ProtectedRoute>} />
                  <Route path="/citizen/profile" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenProfilePage /></ProtectedRoute>} />

                  {/* University Portal Routes (Protected) */}
                  <Route path="/university/dashboard" element={<ProtectedRoute allowedRoles={['university']}><UniversityDashboard /></ProtectedRoute>} />
                  <Route path="/university/challenges" element={<ProtectedRoute allowedRoles={['university']}><UniversityChallengesPage /></ProtectedRoute>} />
                  <Route path="/university/workspace/:id" element={<ProtectedRoute allowedRoles={['university']}><UniversityWorkspacePage /></ProtectedRoute>} />

                  {/* Government Portal Routes (Protected) */}
                  <Route path="/government/dashboard" element={<ProtectedRoute allowedRoles={['government']}><GovtDashboard /></ProtectedRoute>} />

                  {/* Industry / CSR Portal Routes (Protected) */}
                  <Route path="/industry/dashboard" element={<ProtectedRoute allowedRoles={['industry']}><IndustryDashboard /></ProtectedRoute>} />

                  {/* Common Feature Routes */}
                  <Route path="/notifications" element={<NotificationsPage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </IssuesProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

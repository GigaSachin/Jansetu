import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssuesContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Bell, 
  Menu, 
  X, 
  PlusCircle, 
  User, 
  LogOut, 
  Shield, 
  GraduationCap, 
  Building2, 
  Users, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  
  const { user, role, isAuthenticated, switchRole, logout } = useAuth();
  const { unreadNotificationCount } = useIssues();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setRoleSwitcherOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('nav_how_it_works', 'How It Works'), path: '/how-it-works' },
    { label: t('nav_explore', 'Explore Problems'), path: '/explore' },
    { label: t('nav_solutions', 'Solutions'), path: '/solutions' },
    { label: t('nav_impact', 'Impact'), path: '/impact' },
    { label: t('nav_about', 'About'), path: '/about' },
  ];

  const getRoleDashboardLink = () => {
    switch (role) {
      case 'citizen': return '/citizen/dashboard';
      case 'government': return '/government/dashboard';
      case 'university': return '/university/dashboard';
      case 'industry': return '/industry/dashboard';
      default: return '/citizen/dashboard';
    }
  };

  const roleMeta = {
    citizen: { label: t('role_citizen', 'Citizen'), icon: Users, color: 'text-brand-600 bg-brand-50 border-brand-200' },
    government: { label: t('role_govt', 'Govt Authority'), icon: Shield, color: 'text-amber-800 bg-amber-50 border-amber-200' },
    university: { label: t('role_univ', 'University Hub'), icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    industry: { label: t('role_industry', 'Industry / CSR'), icon: Building2, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Logo size="md" showTagline={false} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-brand-700 bg-brand-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Language / Dialect Toggle */}
            <div className="flex items-center rounded-xl bg-slate-100/90 p-1 border border-slate-200/90 text-xs font-bold">
              {[
                { id: 'en', label: 'EN' },
                { id: 'hi', label: 'हिन्दी' },
                { id: 'nag', label: 'नागपुरी' },
                { id: 'kho', label: 'खोरठा' },
                { id: 'sat', label: 'संताली' }
              ].map((langItem) => (
                <button
                  key={langItem.id}
                  type="button"
                  onClick={() => setLanguage(langItem.id as any)}
                  className={`px-2 py-1 rounded-lg transition text-[11px] ${
                    language === langItem.id ? 'bg-white text-brand-800 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title={`Switch language to ${langItem.label}`}
                >
                  {langItem.label}
                </button>
              ))}
            </div>

            {/* Instant Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleSwitcherOpen(!roleSwitcherOpen);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/80 text-slate-700 transition"
                title="Switch Active Perspective / Role"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span className="hidden sm:inline">Role:</span>
                <span className="capitalize text-brand-700 font-bold">{role ? roleMeta[role].label : 'Select'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    {t('nav_switch_role', 'Switch Perspective')}
                  </div>
                  {(['citizen', 'government', 'university', 'industry'] as const).map((r) => {
                    const Meta = roleMeta[r];
                    const Icon = Meta.icon;
                    const isCurrent = role === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setRoleSwitcherOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                          isCurrent ? 'bg-brand-50 text-brand-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-brand-600" />
                          <span>{Meta.label}</span>
                        </div>
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </Link>
            )}

            {/* Primary Action Button: Report a Problem */}
            <Link
              to="/citizen/report"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-brand-900/10 hover:shadow-md transition active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav_report', 'Report a Problem')}</span>
            </Link>

            {/* User Profile / Dashboard Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setRoleSwitcherOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-100 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-sm font-bold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
                        {role && roleMeta[role] ? roleMeta[role].label : 'Citizen'}
                      </div>
                    </div>

                    <Link
                      to={getRoleDashboardLink()}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition"
                    >
                      <Sparkles className="w-4 h-4 text-brand-600" />
                      <span>{t('nav_dashboard', 'My Dashboard')}</span>
                    </Link>

                    <Link
                      to="/citizen/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>{t('nav_profile', 'Profile & Settings')}</span>
                    </Link>

                    <div className="my-1 border-t border-slate-100"></div>

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav_logout', 'Sign Out')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/roles"
                className="text-sm font-bold text-blue-700 hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50/60 transition"
              >
                {t('nav_login', 'Log in')}
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Language Toggle Mobile */}
            <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === 'en' ? 'bg-white text-brand-800 font-black shadow-xs' : 'text-slate-500'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === 'hi' ? 'bg-white text-brand-800 font-black shadow-xs' : 'text-slate-500'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fade-in">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <Link
              to="/citizen/report"
              className="min-h-[48px] w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition"
            >
              <PlusCircle className="w-5 h-5 text-brand-200" />
              <span>{t('nav_report', 'Report a Problem')}</span>
            </Link>

            <Link
              to="/roles"
              className="min-h-[44px] w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>{t('nav_login', 'Switch Perspective / Login')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

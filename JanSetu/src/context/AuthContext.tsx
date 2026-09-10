import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, UserProfile, Institution } from '../types';
import { MOCK_USERS, MOCK_INSTITUTIONS } from '../data/mockData';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  role: Role | null;
  isAuthenticated: boolean;
  selectedInstitution: Institution | null;
  setSelectedInstitution: (inst: Institution | null) => void;
  loginAsRole: (role: Role, customData?: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  switchRole: (role: Role) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEMO_CREDENTIALS: Record<Role, { email: string; pass: string }> = {
  citizen: { email: 'citizen@jansetu.in', pass: 'Citizen@123' },
  government: { email: 'government@jharkhand.gov.in', pass: 'Gov@123' },
  university: { email: 'dean@bitmesra.ac.in', pass: 'Uni@123' },
  industry: { email: 'csr@tatasteel.com', pass: 'Csr@123' }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(() => {
    const saved = localStorage.getItem('jansetu_role');
    return (saved as Role) || null;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedRole = localStorage.getItem('jansetu_role') as Role;
    if (savedRole && MOCK_USERS[savedRole]) {
      const savedUser = localStorage.getItem('jansetu_user');
      return savedUser ? JSON.parse(savedUser) : MOCK_USERS[savedRole];
    }
    return null;
  });

  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(() => {
    const saved = localStorage.getItem('jansetu_selected_institution');
    return saved ? JSON.parse(saved) : MOCK_INSTITUTIONS[0];
  });

  useEffect(() => {
    if (role && user) {
      localStorage.setItem('jansetu_role', role);
      localStorage.setItem('jansetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jansetu_role');
      localStorage.removeItem('jansetu_user');
    }
  }, [role, user]);

  useEffect(() => {
    if (selectedInstitution) {
      localStorage.setItem('jansetu_selected_institution', JSON.stringify(selectedInstitution));
    } else {
      localStorage.removeItem('jansetu_selected_institution');
    }
  }, [selectedInstitution]);

  const loginAsRole = async (newRole: Role, customData?: Partial<UserProfile>) => {
    setRole(newRole);
    const baseUser = MOCK_USERS[newRole];
    const finalUser: UserProfile = {
      ...baseUser,
      ...customData,
      role: newRole,
      institution: newRole === 'university' && selectedInstitution ? selectedInstitution.name : baseUser.institution
    };
    setUser(finalUser);

    // Attempt backend JWT authentication in background
    try {
      const creds = DEMO_CREDENTIALS[newRole];
      if (creds) {
        await authService.login(creds.email, creds.pass);
      }
    } catch {
      // Offline fallback
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    authService.logout();
  };

  const switchRole = async (newRole: Role) => {
    await loginAsRole(newRole);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        selectedInstitution,
        setSelectedInstitution,
        loginAsRole,
        logout,
        switchRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

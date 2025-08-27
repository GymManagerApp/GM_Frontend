import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthState = {
  token: string | null;
  loading: boolean;
};

export type AuthContextType = {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; phone: string; city: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem('auth_token');
        if (t) setToken(t);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 600));
    const fakeToken = 'demo-token';
    await AsyncStorage.setItem('auth_token', fakeToken);
    setToken(fakeToken);
  };

  const register = async (data: { name: string; email: string; phone: string; city: string; password: string }) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    const fakeToken = 'demo-token';
    await AsyncStorage.setItem('auth_token', fakeToken);
    setToken(fakeToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setToken(null);
  };

  const value = useMemo(() => ({ token, loading, login, register, logout }), [token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

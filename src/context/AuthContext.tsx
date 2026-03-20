import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMe, logout as apiLogout } from '@/api/auth';
import type { User } from '@/api/auth';

interface AuthCtx {
  user: User | null;
  token: string | null;
  loading: boolean;
  setAuth: (user: User, token: string) => void;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('gc_token');
    if (!saved) { setLoading(false); return; }
    getMe(saved).then(data => {
      if (data.user) {
        setUser(data.user);
        setToken(saved);
      } else {
        localStorage.removeItem('gc_token');
      }
    }).finally(() => setLoading(false));
  }, []);

  const setAuth = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('gc_token', t);
  };

  const signOut = async () => {
    if (token) await apiLogout(token);
    setUser(null);
    setToken(null);
    localStorage.removeItem('gc_token');
  };

  return <Ctx.Provider value={{ user, token, loading, setAuth, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginRequest, registerRequest } from '../api/auth';
import { TOKEN_KEY } from '../api/axiosClient';

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
}

interface AuthContextValue {
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (isTokenValid(stored)) {
      setToken(stored);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setIsLoading(false);
  }, []);

  const email = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token).email;
    } catch {
      return null;
    }
  }, [token]);

  const login = async (emailInput: string, password: string) => {
    const { access_token } = await loginRequest(emailInput, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    setToken(access_token);
  };

  const register = async (emailInput: string, password: string) => {
    const { access_token } = await registerRequest(emailInput, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    setToken(access_token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const value: AuthContextValue = {
    email,
    isAuthenticated: isTokenValid(token),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}

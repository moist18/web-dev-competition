import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('eatwise_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate that parsed user has required fields
        if (parsedUser && parsedUser.id && parsedUser.username && parsedUser.email) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          // Invalid user object, clear it
          localStorage.removeItem('eatwise_user');
        }
      } catch (error) {
        // Invalid JSON, clear it
        localStorage.removeItem('eatwise_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call the API
    // For demo purposes, accept any username/password
    const mockUser: User = {
      id: '1',
      username: username,
      email: `${username}@example.com`,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('eatwise_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // Mock signup
    const mockUser: User = {
      id: Date.now().toString(),
      username,
      email,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('eatwise_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('eatwise_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
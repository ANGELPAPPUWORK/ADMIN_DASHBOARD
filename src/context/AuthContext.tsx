import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  user_type: string;
  is_active: boolean;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    username: 'admin',
    first_name: 'Admin',
    last_name: 'User',
    user_type: 'admin',
    is_active: true,
    credits: 1000
  });

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
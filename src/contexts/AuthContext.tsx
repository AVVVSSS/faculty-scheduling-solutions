
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'faculty' | 'staff';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'admin' | 'faculty' | 'staff') => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, hardcode a user
      if (email === 'admin@example.com' && password === 'password') {
        const user = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin' as const
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful');
        return Promise.resolve();
      } else if (email === 'faculty@example.com' && password === 'password') {
        const user = {
          id: '2',
          email: 'faculty@example.com',
          name: 'Faculty User',
          role: 'faculty' as const
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful');
        return Promise.resolve();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      return Promise.reject(error);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'admin' | 'faculty' | 'staff') => {
    try {
      // In a real app, this would be an API call
      // For demo, just create a user object
      const user = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Account created successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

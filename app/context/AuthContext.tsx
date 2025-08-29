import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'member' | 'trainer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthState: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode JWT and check expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider invalid tokens as expired
  }
};

// Helper function to decode user data from JWT
const getUserFromToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.userId || payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role || 'member'
    };
  } catch (error) {
    console.error('Error extracting user from token:', error);
    return null;
  }
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    
  const isAuthenticated = !!token && !!user;

  // Check authentication state on app start
  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('userData');

      if (storedToken && storedUser) {
        // Check if token is expired
        if (isTokenExpired(storedToken)) {
          // Token expired, clear storage
          await AsyncStorage.multiRemove(['authToken', 'userData']);
          setToken(null);
          setUser(null);
        } else {
          // Token valid, restore auth state
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      // Clear potentially corrupted data
      await AsyncStorage.multiRemove(['authToken', 'userData']);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (authToken: string, userData: User) => {
    try {
      // Validate token before storing
      if (isTokenExpired(authToken)) {
        throw new Error('Token is expired');
      }

      // Store in AsyncStorage
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Update state
      setToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['authToken', 'userData']);
      
      // Clear state
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Check auth state on component mount
  useEffect(() => {
    checkAuthState();
  }, []);

  // Set up token expiration checking interval
  useEffect(() => {
    if (token) {
      const checkTokenExpiration = () => {
        if (isTokenExpired(token)) {
          logout();
        }
      };

      // Check every minute
      const interval = setInterval(checkTokenExpiration, 60000);
      
      return () => clearInterval(interval);
    }
  }, [token]);

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export context for advanced usage
export { AuthContext };

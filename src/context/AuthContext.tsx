import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse, VerifyOTPResponse } from '../services/api';
import { apiService } from '../services/api';

interface AuthContextType {
  token: string | null;
  user: LoginResponse['user'] | null;
  wallet: LoginResponse['wallet'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: LoginResponse['user'], wallet: LoginResponse['wallet']) => Promise<void>;
  logout: () => Promise<void>;
  setAuthData: (token: string, user: LoginResponse['user'], wallet: LoginResponse['wallet']) => void;
  saveFcmToken: (fcmToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [wallet, setWallet] = useState<LoginResponse['wallet'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        logout();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const loadAuthData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('auth_user');
      const storedWallet = await AsyncStorage.getItem('auth_wallet');
      
      console.log('Loading auth data:', { storedToken, storedUser, storedWallet });
      
      if (storedToken && storedUser && storedWallet) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setWallet(JSON.parse(storedWallet));
        console.log('Auth data loaded successfully');
      }
    } catch (error) {
      console.error('Failed to load auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (authToken: string, authUser: LoginResponse['user'], authWallet: LoginResponse['wallet']) => {
    try {
      console.log('Saving auth data:', { authToken, authUser, authWallet });
      await AsyncStorage.setItem('auth_token', authToken);
      await AsyncStorage.setItem('auth_user', JSON.stringify(authUser));
      await AsyncStorage.setItem('auth_wallet', JSON.stringify(authWallet));
      setToken(authToken);
      setUser(authUser);
      setWallet(authWallet);
      console.log('Auth data saved successfully');
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
      await AsyncStorage.removeItem('auth_wallet');
      await AsyncStorage.removeItem('user_phone');
      setToken(null);
      setUser(null);
      setWallet(null);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  };

  const setAuthData = (authToken: string, authUser: LoginResponse['user'], authWallet: LoginResponse['wallet']) => {
    setToken(authToken);
    setUser(authUser);
    setWallet(authWallet);
  };

  const saveFcmToken = async (fcmToken: string) => {
    if (!token) {
      console.log('No auth token available, cannot save FCM token');
      return;
    }

    try {
      console.log('Saving FCM token to backend:', fcmToken);
      const res = await apiService.saveFcmToken(token, fcmToken);
      console.log('FCM token saved successfully:', res);
    } catch (error) {
      console.error('Failed to save FCM token:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        wallet,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        setAuthData,
        saveFcmToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

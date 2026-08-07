/**
 * TapCash App
 * Mobile payment application
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { NotificationToast } from './src/components/NotificationToast';
import { useMessaging } from './src/hooks/useMessaging';
import { notificationListeners } from './src/utils/notificationListeners';
import { useAuth } from './src/context/AuthContext';

const queryClient = new QueryClient();

function AppContent() {
  const { fcmToken } = useMessaging();
  const { saveFcmToken, isAuthenticated } = useAuth();

  useEffect(() => {
    notificationListeners();
  }, []);

  useEffect(() => {
    if (fcmToken && isAuthenticated) {
      saveFcmToken(fcmToken);
    }
  }, [fcmToken, isAuthenticated, saveFcmToken]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <RootNavigator />
      <NotificationToast />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

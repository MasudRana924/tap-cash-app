/**
 * TapCash App
 * Mobile payment application
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { NotificationToast } from './src/components/NotificationToast';
import NotificationModal from './src/components/NotificationModal';
import { useMessaging } from './src/hooks/useMessaging';
import { notificationListeners, setForegroundNotificationCallback } from './src/utils/notificationListeners';
import { useAuth } from './src/context/AuthContext';

const queryClient = new QueryClient();

function AppContent() {
  const { fcmToken } = useMessaging();
  const { saveFcmToken, isAuthenticated } = useAuth();
  const [notificationModal, setNotificationModal] = useState({
    visible: false,
    title: '',
    body: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Set up the callback to show custom modal for foreground notifications
    setForegroundNotificationCallback((title, body, imageUrl) => {
      setNotificationModal({
        visible: true,
        title,
        body,
        imageUrl: imageUrl || '',
      });
    });

    notificationListeners();
  }, []);

  useEffect(() => {
    if (fcmToken && isAuthenticated) {
      saveFcmToken(fcmToken);
    }
  }, [fcmToken, isAuthenticated, saveFcmToken]);

  const handleCloseNotificationModal = () => {
    setNotificationModal({
      visible: false,
      title: '',
      body: '',
      imageUrl: '',
    });
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <RootNavigator />
      <NotificationToast />
      <NotificationModal
        visible={notificationModal.visible}
        title={notificationModal.title}
        body={notificationModal.body}
        imageUrl={notificationModal.imageUrl}
        onClose={handleCloseNotificationModal}
      />
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

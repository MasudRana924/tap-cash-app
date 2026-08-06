import { useCallback, useEffect, useState } from 'react';
import { getMessaging } from '@react-native-firebase/messaging';
import { usePermissions } from './usePermissions';
import { Platform } from 'react-native';

export const useMessaging = () => {
  const { userNotificationPermission } = usePermissions();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const getTokens = useCallback(async () => {
    try {
      const hasPermission = await userNotificationPermission();
      if (!hasPermission) return null;

      const messagingInstance = getMessaging();

      if (Platform.OS === 'ios') {
        await messagingInstance.registerDeviceForRemoteMessages();
      }

      const token = await messagingInstance.getToken();
      console.log('FCM Token => ', token);
      setFcmToken(token);
      return token;
    } catch (error: any) {
      console.error('Error in useMessaging - getTokens:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return null;
    }
  }, [userNotificationPermission]);

  useEffect(() => {
    if (!fcmToken) {
      getTokens();
    }
  }, [fcmToken, getTokens]);

  return {
    getTokens,
    fcmToken,
  };
};


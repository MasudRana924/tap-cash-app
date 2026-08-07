import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getMessaging, onNotificationOpenedApp, getInitialNotification } from '@react-native-firebase/messaging';

export const useNotificationNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const messagingInstance = getMessaging();

    const unsubscribeOpened = onNotificationOpenedApp(messagingInstance, (data: any) => {
      console.debug('Notification opened from background:', data);
      navigation.navigate('Notification' as never);
    });

    getInitialNotification(messagingInstance)
      .then((data: any) => {
        if (data) {
          console.debug('Notification opened from quit state:', data);
          navigation.navigate('Notification' as never);
        }
      });

    return () => {
      unsubscribeOpened();
    };
  }, [navigation]);
};

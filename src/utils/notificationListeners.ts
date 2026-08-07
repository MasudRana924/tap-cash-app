import { Alert } from 'react-native';
import {
  getMessaging,
  setBackgroundMessageHandler,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';

export const notificationListeners = () => {
  const messagingInstance = getMessaging();

  // Quit/Background Notification
  setBackgroundMessageHandler(messagingInstance, async (data: any) => {
    console.debug('Received quit/background app notification', data);
    // Handle background related things from here
  });

  const unsubscribeOnMessage = onMessage(messagingInstance, async (data: any) => {
    console.debug('Received foreground app notification', data);
    const { title, body } = data?.notification as any;
    Alert.alert(
      'Foreground Notification',
      `${title}\n${body}\n${JSON.stringify(data?.data, null, 2)}`
    );
    // Handle foreground related things from here
  });

  // Background Notification - when user taps notification while app is in background
  onNotificationOpenedApp(messagingInstance, async (data: any) => {
    console.debug('Open App from background state', data);
    // Navigation will be handled by useNotificationNavigation hook
  });

  // When app is opened from a notification while in quit state
  getInitialNotification(messagingInstance)
    .then(async (data: any) => {
      console.debug('Open App from closed state', data);
      // Navigation will be handled by useNotificationNavigation hook
    });

  return () => {
    unsubscribeOnMessage();
  };
};

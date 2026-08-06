import { getMessaging } from '@react-native-firebase/messaging';
import { getGlobalShowNotification } from '../context/NotificationContext';

export const notificationListeners = () => {
  const messagingInstance = getMessaging();

  messagingInstance.setBackgroundMessageHandler(async (data: any) => {
    console.debug('Received quit/background app notification', data);
  });

  const unsubscribeOnMessage = messagingInstance.onMessage(async (data: any) => {
    console.debug('Received foreground app notification', data);
    const { title, body } = data?.notification || {};
    
    const showNotification = getGlobalShowNotification();
    if (showNotification) {
      showNotification({
        title: title || 'Notification',
        body: body || '',
        data: data?.data,
      });
    }
  });

  messagingInstance.onNotificationOpenedApp(async (data: any) => {
    console.debug('Open App from background state', data);
  });

  messagingInstance
    .getInitialNotification()
    .then(async (data: any) => {
      console.debug('Open App from closed state', data);
    });

  return () => {
    unsubscribeOnMessage();
  };
};


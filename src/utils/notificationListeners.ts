import {
  getMessaging,
  setBackgroundMessageHandler,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';

// Global callback for foreground notifications
let foregroundNotificationCallback: ((title: string, body: string, imageUrl?: string) => void) | null = null;

export const setForegroundNotificationCallback = (callback: (title: string, body: string, imageUrl?: string) => void) => {
  foregroundNotificationCallback = callback;
};

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
    const imageUrl = data?.data?.image_url || data?.notification?.image;

    // Call the callback to show custom modal
    if (foregroundNotificationCallback) {
      foregroundNotificationCallback(title || 'Notification', body || '', imageUrl);
    }
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

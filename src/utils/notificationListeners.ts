import {
  getMessaging,
  setBackgroundMessageHandler,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGlobalShowNotification } from '../context/NotificationContext';

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
    const imageUrl = data?.data?.image_url || data?.notification?.image_url || data?.notification?.android?.imageUrl || data?.notification?.ios?.imageUrl;
    const notificationType = data?.data?.type;

    // Handle group savings invitation notifications
    if (notificationType === 'group_savings_invitation') {
      const groupSavingsId = data?.data?.group_savings_id;
      const globalShow = getGlobalShowNotification();
      
      // Store invitation data for later use
      await AsyncStorage.setItem('pending_group_savings_invitation', JSON.stringify({
        groupSavingsId,
        title: title || 'Group Savings Invitation',
        body: body || 'You have been invited to join a group savings',
      }));
      
      // Show toast notification
      if (globalShow) {
        globalShow({
          title: title || 'Group Savings Invitation',
          body: body || 'You have been invited to join a group savings',
          data: { type: 'group_savings_invitation', groupSavingsId },
        });
      }
      return;
    }

    // Handle group savings deduction notifications
    if (notificationType === 'group_savings_deduction') {
      const groupSavingsId = data?.data?.group_savings_id;
      const amount = data?.data?.amount;
      const globalShow = getGlobalShowNotification();
      
      // Show toast notification
      if (globalShow) {
        globalShow({
          title: title || 'Group Savings Contribution',
          body: body || `Amount deducted: ${amount}`,
          data: { type: 'group_savings_deduction', groupSavingsId },
        });
      }
      return;
    }

    // Call the callback to show custom modal for other notifications
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

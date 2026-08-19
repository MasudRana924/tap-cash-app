import {
  getMessaging,
  setBackgroundMessageHandler,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';

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
      
      Alert.alert(
        title || 'Group Savings Invitation',
        body || 'You have been invited to join a group savings',
        [
          {
            text: 'Reject',
            onPress: () => handleRejectInvitation(groupSavingsId),
            style: 'destructive'
          },
          {
            text: 'Accept',
            onPress: () => handleAcceptInvitation(groupSavingsId),
            style: 'default'
          }
        ]
      );
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

// Handle accept invitation
const handleAcceptInvitation = async (groupSavingsId: string) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) {
      Alert.alert('Error', 'You need to be logged in to accept invitations');
      return;
    }

    const response = await apiService.acceptGroupSavingsInvitation(token, groupSavingsId);
    Alert.alert('Success', response.successMessage);
  } catch (error: any) {
    Alert.alert('Error', error.errorMessage || 'Failed to accept invitation');
  }
};

// Handle reject invitation
const handleRejectInvitation = async (groupSavingsId: string) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) {
      Alert.alert('Error', 'You need to be logged in to reject invitations');
      return;
    }

    const response = await apiService.rejectGroupSavingsInvitation(token, groupSavingsId);
    Alert.alert('Success', response.successMessage);
  } catch (error: any) {
    Alert.alert('Error', error.errorMessage || 'Failed to reject invitation');
  }
};

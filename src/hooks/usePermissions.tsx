import { Alert } from 'react-native';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  NotificationOption,
  RationaleObject,
} from 'react-native-permissions';

export const notificationOptions: NotificationOption[] = [
  'badge',
  'sound',
  'providesAppSettings',
  'alert',
];

export const dialogConfig: RationaleObject = {
  title: 'App would like to send notification',
  message: 'Stay up to date with notification',
  buttonPositive: 'Open',
  buttonNegative: 'Cancel',
};

export const usePermissions = () => {
  const userNotificationPermission = async () => {
    try {
      const { status: isGranted } = await checkNotifications();

      if (isGranted === 'granted') {
        return true;
      } else {
        const { status: reqGrant } = await requestNotifications(
          notificationOptions,
          dialogConfig,
        );

        if (reqGrant === 'granted') return true;

        if (reqGrant === 'blocked') {
          Alert.alert(
            dialogConfig.title,
            dialogConfig.message,
            [
              {
                text: dialogConfig.buttonNegative,
              },
              {
                text: dialogConfig.buttonPositive,
                onPress: () => openSettings('notifications'),
              },
            ],
          );
        }
      }
    } catch (error: any) {
      console.error('Error in usePermissions - userNotificationPermission:', error);
    }
  };

  return { userNotificationPermission };
};

import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';

interface NotificationModalProps {
  visible: boolean;
  title: string;
  body: string;
  imageUrl?: string;
  onClose: () => void;
  navigationRef?: React.RefObject<NavigationContainerRef<RootStackParamList> | null>;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  imageUrl,
  onClose,
  navigationRef,
}) => {
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 1 second
      const timer = setTimeout(() => {
        handleClose();
      }, 30000);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handlePress = () => {
    handleClose();
    // Navigate to NotificationsScreen using navigation ref
    if (navigationRef?.current) {
      navigationRef.current.navigate('Notifications' as never);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {Platform.OS === 'ios' ? (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={20}
              reducedTransparencyFallbackColor="rgba(26, 26, 46, 0.85)"
            />
          ) : null}
          <TouchableOpacity
            style={styles.content}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="notifications" size={40} color="#666" />
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                Paylo
              </Text>
              <Text style={styles.body} numberOfLines={3}>
                Notification
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  container: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.85)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(26, 26, 46, 0.85)',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  body: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 16,
  },

});

export default NotificationModal;

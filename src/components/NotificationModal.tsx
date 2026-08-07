import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
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
  title,
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
                {title}
              </Text>
              {/* <Text style={styles.body} numberOfLines={3}>
                {body}
              </Text> */}
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
    paddingTop: 40,
  },
  container: {
    marginHorizontal: 16,
    backgroundColor: '#F8623F',
    borderRadius: 12,
     borderWidth: 1,
    borderColor: '#F8623F',
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
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

});

export default NotificationModal;

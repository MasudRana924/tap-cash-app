import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotification } from '../context/NotificationContext';

export const NotificationToast: React.FC = () => {
  const { notification, hideNotification } = useNotification();
  const insets = useSafeAreaInsets();
  const [slideAnim] = React.useState(new Animated.Value(-200));

  React.useEffect(() => {
    if (notification) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [notification, slideAnim]);

  if (!notification) {
    return null;
  }

  const { title, body } = notification;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: insets.top + 10,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
      <TouchableOpacity
        style={styles.toast}
        activeOpacity={0.9}
        onPress={hideNotification}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔔</Text>
        </View>
        <View style={styles.contentContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {body && <Text style={styles.body}>{body}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  toast: {
    backgroundColor: '#F8623F',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F8623F',
   
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    // flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11182e',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

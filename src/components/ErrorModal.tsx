import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface ErrorModalProps {
  visible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  errorMessage,
  onClose,
}) => {
  const slideAnim = React.useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          activeOpacity={1}
          onPress={handleClose}
        >
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} style={styles.content}>
              {/* Error Icon */}
              <View style={styles.iconContainer}>
                <Icon name="close-circle" size={48} color="#EF4444" />
              </View>

              {/* Title */}
              <Text style={styles.title}>Paylo</Text>

              {/* Error Message */}
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <View style={styles.divider} />
              {/* Okay Button */}
              <TouchableOpacity style={styles.okayButton} onPress={handleClose}>
                <Text style={styles.okayButtonText}>Okay</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    // marginHorizontal: 20,
    // marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    // padding: 24,
    paddingTop:24,
    paddingBottom:24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11182e',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  divider: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#F8623F',
  
    width: '100%',
    // marginVertical: 16,
  },
  okayButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    
  },
  okayButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8623F',
  },
});

export default ErrorModal;

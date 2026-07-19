import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PINModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PINModal: React.FC<PINModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (visible) {
      setPin('');
    }
  }, [visible]);

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(prev => prev + key);
      if (pin.length === 3) {
        setTimeout(() => {
          onSuccess();
        }, 300);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter PIN</Text>
            <View style={styles.placeholder} />
          </View>

          {/* PIN Display */}
          <View style={styles.pinSection}>
            <Text style={styles.sectionTitle}>Enter your 4-digit PIN</Text>
            <View style={styles.pinDisplay}>
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.pinDotContainer,
                    pin.length > index && styles.pinDotContainerFocused,
                  ]}
                >
                  <View
                    style={[
                      styles.pinDot,
                      pin.length > index && styles.pinDotFilled,
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Custom Keyboard */}
          <View style={styles.keyboard}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'].map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key,
                  key === '' && styles.keyEmpty,
                  key === 'back' && styles.keyBack,
                ]}
                onPress={() => key && handleKeyPress(key)}
                disabled={key === ''}
                activeOpacity={0.7}
              >
                {key === 'back' ? (
                  <Icon name="backspace-outline" size={24} color="#333" />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  pinSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinDotContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pinDotContainerFocused: {
    borderColor: '#37c667',
    backgroundColor: '#F0FDF4',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D1D5DB',
  },
  pinDotFilled: {
    backgroundColor: '#37c667',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  key: {
    width: '31%',
    aspectRatio: 1.6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  keyEmpty: {
    backgroundColor: 'transparent',
  },
  keyBack: {
    backgroundColor: '#F8F9FA',
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1C1C1E',
  },
});

export default PINModal;

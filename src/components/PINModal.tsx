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
                  style={[styles.pinDot, pin.length > index && styles.pinDotFilled]}
                />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  pinSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  pinDotFilled: {
    backgroundColor: '#37c667',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: '31%',
    aspectRatio: 1.5,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyEmpty: {
    backgroundColor: 'transparent',
  },
  keyBack: {
    backgroundColor: '#F5F5F5',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});

export default PINModal;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const PINScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState(['', '', '', '']);
  const pinInputs = useRef<(TextInput | null)[]>([]);

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      pinInputs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit.length === 1)) {
      setTimeout(() => {
        navigation.navigate('Success' as never);
      }, 300);
    }
  };

  const handlePinKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      pinInputs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter PIN</Text>
          <View style={styles.placeholder} />
        </View>

        {/* PIN Input Section */}
        <View style={styles.pinSection}>
          <Text style={styles.sectionTitle}>Enter your 4-digit PIN</Text>
          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={(input) => {
                  pinInputs.current[index] = input;
                }}
                style={styles.pinInput}
                value={digit}
                onChangeText={(value) => handlePinChange(index, value)}
                onKeyPress={({ nativeEvent: { key } }) => handlePinKeyPress(index, key)}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry
                autoFocus={index === 0}
              />
            ))}
          </View>
        </View>

        {/* Receiver Information */}
        <View style={styles.receiverCard}>
          <View style={styles.receiverInfo}>
            <View style={styles.receiverAvatar}>
              <Text style={styles.receiverAvatarText}>JD</Text>
            </View>
            <View style={styles.receiverDetails}>
              <Text style={styles.receiverName}>John Doe</Text>
              <Text style={styles.receiverPhone}>+880 1712-345678</Text>
            </View>
          </View>
        </View>

        {/* Amount Card */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountValue}>৳ 1,000.00</Text>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, !pin.every((d) => d.length === 1) && styles.confirmButtonDisabled]}
          onPress={() => pin.every((d) => d.length === 1) && navigation.navigate('Success' as never)}
          disabled={!pin.every((d) => d.length === 1)}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
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
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  pinInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#F5F5F5',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  receiverCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  receiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  receiverAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  receiverDetails: {
    flex: 1,
  },
  receiverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  receiverPhone: {
    fontSize: 14,
    color: '#666',
  },
  amountCard: {
    backgroundColor: '#6b7280',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  amountLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#6b7280',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PINScreen;

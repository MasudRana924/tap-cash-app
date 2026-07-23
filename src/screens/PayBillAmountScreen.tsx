import React, { useState, useRef, useEffect } from 'react';
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
import PINModal from '../components/PINModal';

const PayBillAmountScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [showPINModal, setShowPINModal] = useState(false);
  const amountInputRef = useRef<TextInput>(null);
  const availableBalance = '৳ 25,450.00';

  useEffect(() => {
    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  }, []);

  const handleConfirm = () => {
    if (amount.length > 0) {
      setShowPINModal(true);
    }
  };

  const handlePINSuccess = () => {
    setShowPINModal(false);
    navigation.navigate('Success' as never);
  };

  const handlePINCancel = () => {
    setShowPINModal(false);
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
          <Text style={styles.headerTitle}>Pay Bill</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <View style={styles.amountInputContainer}>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              placeholder="৳0.00"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              textAlign="center"
              textAlignVertical="center"
              selectionColor="#6b7280"
            />
          </View>
        </View>

        {/* Available Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>{availableBalance}</Text>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, amount.length === 0 && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={amount.length === 0}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PIN Modal */}
      <PINModal
        visible={showPINModal}
        onClose={handlePINCancel}
        onSuccess={handlePINSuccess}
      />
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
    marginBottom: 30,
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
  amountSection: {
    marginBottom: 30,
  },
  amountInputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceCard: {
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceAmount: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
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

export default PayBillAmountScreen;

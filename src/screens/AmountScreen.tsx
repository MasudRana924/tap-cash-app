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
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PINModal from '../components/PINModal';

const AmountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
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
          <Text style={styles.headerTitle}>Send Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>Enter Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>৳</Text>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Available Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceCard: {
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#37c667',
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

export default AmountScreen;

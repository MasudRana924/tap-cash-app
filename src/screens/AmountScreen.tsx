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
  const [note, setNote] = useState('');
  const [showPINModal, setShowPINModal] = useState(false);
  const amountInputRef = useRef<TextInput>(null);
  const availableBalance = '৳52,340.00';

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

  const quickAmounts = ['500', '1,000', '2,000', '5,000'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Amount</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Recipient Info */}
        <View style={styles.recipientContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NI</Text>
          </View>
          <View style={styles.recipientDetails}>
            <Text style={styles.recipientName}>Nadia</Text>
            <Text style={styles.recipientPhone}>+8801700000002</Text>
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount (BDT)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>৳</Text>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              selectionColor="#6b7280"
            />
          </View>
          <Text style={styles.balanceAmount}>Balance: {availableBalance}</Text>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmountContainer}>
          {quickAmounts.map((amt) => (
            <TouchableOpacity 
              key={amt} 
              style={styles.quickAmountButton}
              onPress={() => setAmount(amt.replace(',', ''))}
            >
              <Text style={styles.quickAmountText}>৳{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note Section */}
        <View style={styles.noteSection}>
          <Text style={styles.noteLabel}>Note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="What's this for?"
            placeholderTextColor="#999"
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Summary Section */}
        {amount.length > 0 && !isNaN(Number(amount)) && Number(amount) > 0 && (
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Fee</Text>
              <Text style={styles.summaryValue}>৳5.00</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>Total Amount</Text>
              <Text style={styles.summaryValueBold}>৳{(Number(amount) + 5).toFixed(2)}</Text>
            </View>
          </View>
        )}

        <View style={styles.flexSpacer} />

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.confirmButton, amount.length === 0 && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={amount.length === 0}
        >
          <Text style={[styles.confirmButtonText, amount.length === 0 && styles.confirmButtonTextDisabled]}>Continue</Text>
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#797c83',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  recipientDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recipientPhone: {
    fontSize: 14,
    color: '#999',
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: 48,
    fontWeight: '500',
    color: '#8e96a3',
    marginRight: 10,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
    paddingVertical: 0,
  },
  balanceAmount: {
    fontSize: 13,
    color: '#999',
  },
  quickAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickAmountButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  noteSection: {
    marginBottom: 30,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  noteInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
  },
  flexSpacer: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#6b7280',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#d6d9df',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: '#9ea7b4',
  },
  summarySection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  summaryLabelBold: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  summaryValueBold: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AmountScreen;

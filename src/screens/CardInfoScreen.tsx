import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PINModal from '../components/PINModal';

const CardInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, cardType } = route.params as any;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [showPINModal, setShowPINModal] = useState(false);

  const handleContinue = () => {
    if (cardNumber.length > 0 && expiryDate.length > 0 && cvv.length > 0 && cardHolderName.length > 0) {
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

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Card Information</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Amount Display */}
          <View style={styles.amountDisplay}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>৳{amount}</Text>
          </View>

          {/* Card Type Display */}
          <View style={styles.cardTypeDisplay}>
            <Text style={styles.cardTypeLabel}>Card Type</Text>
            <Text style={styles.cardTypeValue}>{cardType === 'visa' ? 'Visa' : 'MasterCard'}</Text>
          </View>

          {/* Card Number */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#999"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          {/* Expiry Date and CVV */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputSection, styles.halfInput]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputSection, styles.halfInput]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#999"
                value={cvv}
                onChangeText={setCVV}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          {/* Card Holder Name */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card holder name"
              placeholderTextColor="#999"
              value={cardHolderName}
              onChangeText={setCardHolderName}
              autoCapitalize="words"
            />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (cardNumber.length === 0 || expiryDate.length === 0 || cvv.length === 0 || cardHolderName.length === 0) && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={cardNumber.length === 0 || expiryDate.length === 0 || cvv.length === 0 || cardHolderName.length === 0}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Modal */}
      <PINModal
        visible={showPINModal}
        onClose={handlePINCancel}
        onSuccess={handlePINSuccess}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  amountDisplay: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11182e',
  },
  cardTypeDisplay: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },
  cardTypeLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  cardTypeValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11182e',
  },
  inputSection: {
    marginBottom: 20,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#11182e',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  continueButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CardInfoScreen;

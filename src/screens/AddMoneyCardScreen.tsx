import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddMoneyCardScreen = () => {
  const navigation = useNavigation();
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleContinue = () => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (cardType && cleanedCardNumber.length === 16 && expiryDate.length === 5 && cvc.length === 3) {
      navigation.navigate('AddMoneyAmount' as never);
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    if (text.length === 2 && !text.includes('/')) {
      return text + '/';
    }
    return text;
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
    }
  };

  const handleExpiryDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiryDate(cleaned));
    }
  };

  const handleCvcChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      setCvc(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Money</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Card Type Selection */}
          <View style={styles.cardTypeSection}>
            <Text style={styles.sectionTitle}>Select Card Type</Text>
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={styles.cardTypeOption}
                onPress={() => setCardType('visa')}
              >
                <View style={styles.radioContainer}>
                  <View style={[styles.radioCircle, cardType === 'visa' && styles.radioSelected]}>
                    {cardType === 'visa' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.cardTypeText}>Visa</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardTypeOption}
                onPress={() => setCardType('mastercard')}
              >
                <View style={styles.radioContainer}>
                  <View style={[styles.radioCircle, cardType === 'mastercard' && styles.radioSelected]}>
                    {cardType === 'mastercard' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.cardTypeText}>Mastercard</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Number */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputWrapper}>
              <Icon name="card-outline" size={20} color="#999" style={styles.inputIconAbsolute} />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          {/* Expiry Date & CVC */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputSection, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputSection, styles.halfWidth]}>
              <Text style={styles.inputLabel}>CVC</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#999"
                value={cvc}
                onChangeText={handleCvcChange}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!cardType || cardNumber.replace(/\s/g, '').length !== 16 || expiryDate.length !== 5 || cvc.length !== 3) &&
                styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!cardType || cardNumber.replace(/\s/g, '').length !== 16 || expiryDate.length !== 5 || cvc.length !== 3}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  cardTypeSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cardTypeOption: {
    flex: 1,
    padding: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#6b7280',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6b7280',
  },
  cardTypeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  inputSection: {
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
    marginRight: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIconAbsolute: {
    position: 'absolute',
    left: 15,
    top: 19,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 58,
    paddingHorizontal: 15,
    paddingLeft: 45,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#6b7280',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
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

export default AddMoneyCardScreen;

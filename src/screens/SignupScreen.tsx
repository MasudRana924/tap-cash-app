import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiService } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const phoneInputRef = useRef<TextInput>(null);
  const referralInputRef = useRef<TextInput>(null);
  const pinInputRef = useRef<TextInput>(null);

  const signupMutation = useMutation({
    mutationFn: async () => {
      return apiService.signup(name, '+880' + phone, pin);
    },
    onSuccess: async (data) => {
      if (data.successMessage) {
        await AsyncStorage.setItem('user_phone', '+880' + phone);
        navigation.navigate('OTP' as never);
      }
    },
    onError: (error: any) => {
      setErrorMessage(error.errorMessage || error.error || 'Signup failed. Please try again.');
    },
  });

  const handleSignup = () => {
    setErrorMessage('');
    signupMutation.mutate();
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* <Text style={styles.payloText}>Paylo</Text> */}
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>
            Let's set up your money transfer account. Enter your details below.
          </Text>

          {/* Name Input */}
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          {/* Phone Input with Bangladesh Flag */}
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.flag}>🇧🇩</Text>
              <Text style={styles.countryCode}>+880</Text>
            </View>
            <TextInput
              ref={phoneInputRef}
              style={styles.phoneInput}
              placeholder="1XXX-XXXXXX"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* PIN — single normal secure input field */}
          <Text style={styles.inputLabel}>PIN</Text>
          <View style={styles.pinFieldWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#9ea3ad" style={styles.pinFieldIcon} />
            <TextInput
              ref={pinInputRef}
              style={styles.pinFieldInput}
              placeholder="Create a 4-digit PIN"
              placeholderTextColor="#bbb"
              value={pin}
              onChangeText={(text) => {
                if (text.length <= 4) setPin(text);
              }}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          </View>

          {/* Referral Code */}
          <TextInput
            ref={referralInputRef}
            style={styles.input}
            placeholder="Referral Code (Optional)"
            placeholderTextColor="#999"
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="none"
          />

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, signupMutation.isPending && styles.continueButtonDisabled]}
            onPress={handleSignup}
            disabled={signupMutation.isPending}
          >
            <Text style={styles.continueButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {/* Back to Login */}
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Spinner visible={signupMutation.isPending} textStyle={styles.spinnerText} />
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
  content: {
    flex: 1,
  },
  payloText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#11182e',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11182e',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRightWidth: 0,
    width: 95,
    height: 58,
    marginRight: 8,
  },
  flag: {
    fontSize: 16,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '400',
    color: '#11182e',
  },
  phoneInput: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    fontSize: 16,
    color: '#11182e',
  },
  input: {
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    color: '#11182e',
  },
  pinFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    height: 58,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  pinFieldIcon: {
    marginRight: 10,
  },
  pinFieldInput: {
    flex: 1,
    fontSize: 16,
    color: '#11182e',

  },
  requirements: {
    marginBottom: 20,
    marginLeft: 5,
  },
  requirementText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  checkbox: {
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#84CC16',
    borderColor: '#84CC16',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  continueButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    color: '#11182e',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#11182e',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#c5c9d1',
  },
  spinnerText: {
    color: '#11182e',
  },
});

export default SignupScreen;

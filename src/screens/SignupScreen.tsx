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

const SignupScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [activeField, setActiveField] = useState<'phone' | 'password' | 'referral'>('phone');

  const phoneInputRef = useRef<TextInput>(null);
  const referralInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignup = () => {
    navigation.navigate('OTP' as never);
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
          <Text style={styles.payloText}>Paylo</Text>
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>
            Let's set up your money transfer account. Enter your details below.
          </Text>

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
              onFocus={() => setActiveField('phone')}
              autoFocus={true}
            />
          </View>

          {/* Password Input (4-digit PIN like Login) */}
          <Text style={styles.inputLabel}>Pin</Text>
          <View>
            <TextInput
              ref={passwordInputRef}
              style={styles.hiddenInput}
              value={password}
              onChangeText={(text) => {
                if (text.length <= 4) setPassword(text);
              }}
              keyboardType="number-pad"
              maxLength={4}
              onFocus={() => setActiveField('password')}
            />
            <TouchableOpacity
              style={styles.pinContainer}
              activeOpacity={1}
              onPress={() => passwordInputRef.current?.focus()}
            >
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.pinInput,
                    activeField === 'password' && password.length === index && styles.pinInputActive,
                  ]}
                >
                  <Text style={styles.pinInputText}>
                    {password.length > index ? '•' : ''}
                  </Text>
                </View>
              ))}
            </TouchableOpacity>
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
            onFocus={() => setActiveField('referral')}
          />

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSignup}
          >
            <Text style={styles.continueButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
  },
  payloText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37c667',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#4f5866',
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
    color: '#333',
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
    color: '#333',
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
    color: '#333',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  pinInput: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  pinInputActive: {
    borderColor: '#37c667',
  },
  pinInputText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
    backgroundColor: '#6b7280',
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
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#37c667',
    fontWeight: '600',
  },
});

export default SignupScreen;

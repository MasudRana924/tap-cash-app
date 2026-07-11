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

import CustomKeyboard from '../components/CustomKeyboard';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [activeField, setActiveField] = useState<'phone' | 'password' | 'referral'>('phone');

  const phoneInputRef = useRef<TextInput>(null);
  const referralInputRef = useRef<TextInput>(null);

  const handleSignup = () => {
    navigation.navigate('OTP' as never);
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleKeyboardPress = (key: string) => {
    if (activeField === 'phone') {
      if (key === 'back') {
        setPhone((prev) => prev.slice(0, -1));
      } else {
        setPhone((prev) => prev + key);
      }
    } else if (activeField === 'password') {
      if (key === 'back') {
        setPassword((prev) => prev.slice(0, -1));
      } else if (password.length < 4) {
        setPassword((prev) => prev + key);
      }
    } else if (activeField === 'referral') {
      if (key === 'back') {
        setReferralCode((prev) => prev.slice(0, -1));
      } else {
        setReferralCode((prev) => prev + key);
      }
    }
  };

  const handlePinPress = () => {
    setActiveField('password');
    phoneInputRef.current?.blur();
    referralInputRef.current?.blur();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>
            Let's set up your money transfer account. Enter your details below.
          </Text>

          {/* Phone Input with Bangladesh Flag */}
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
              showSoftInputOnFocus={false}
              onFocus={() => setActiveField('phone')}
              autoFocus={true}
            />
          </View>

          {/* Password Input (4-digit PIN like Login) */}
          <TouchableOpacity
            style={styles.pinContainer}
            activeOpacity={1}
            onPress={handlePinPress}
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

          {/* Referral Code */}
          <TextInput
            ref={referralInputRef}
            style={styles.input}
            placeholder="Referral Code (Optional)"
            placeholderTextColor="#999"
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="none"
            showSoftInputOnFocus={false}
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

          {/* Custom Keyboard below button/links */}
          <CustomKeyboard onKeyPress={handleKeyboardPress} />
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinInput: {
    width: 70,
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#37c667',
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

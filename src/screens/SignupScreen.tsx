import React, { useState } from 'react';
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

const SignupScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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
              style={styles.phoneInput}
              placeholder="1XXX-XXXXXX"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Referral Code */}
          <TextInput
            style={styles.input}
            placeholder="Referral Code (Optional)"
            placeholderTextColor="#999"
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="none"
          />

          {/* Terms Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={styles.checkbox}
            >
              <View
                style={[
                  styles.checkboxInner,
                  agreeTerms && styles.checkboxChecked,
                ]}
              >
                {agreeTerms && (
                  <Icon name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the TapCash Terms and Conditions and Privacy Policy
            </Text>
          </View>

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
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
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
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
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

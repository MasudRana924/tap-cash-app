import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import authBg from '../assets/auth-bg.png';
import ErrorModal from '../components/ErrorModal';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const [activePinIndex, setActivePinIndex] = useState(0);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const phoneInputRef = useRef<TextInput>(null);
  const pinInputRef = useRef<TextInput>(null);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const phoneNumber = '+880' + phone;
      return apiService.login(phoneNumber, pin);
    },
    onSuccess: async (data) => {
      console.log('Login API Response:', data);
      console.log('Token:', data.token);
      console.log('User:', data.user);
      console.log('Wallet:', data.wallet);
      await login(data.token, data.user, data.wallet);
      navigation.navigate('MainHome' as never);
    },
    onError: (error: any) => {
      console.error('Login Error:', error);
      setErrorMessage(error.errorMessage || error.error || 'Login failed. Please try again.');
      setErrorModalVisible(true);
    },
  });

  const handleLogin = async () => {
    setErrorModalVisible(false);
    loginMutation.mutate();
  };

  const handleSignup = () => navigation.navigate('Signup' as never);

  // ── Loading ────────────────────────────────────────────
  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#11182e" />
  //     </View>
  //   );
  // }

  // ── UI ────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={authBg} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>

          {/* Language Toggle */}
          <View style={styles.languageContainer}>
            <View style={styles.languageToggleContainer}>
              {(['EN', 'BN'] as const).map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.languageOption, language === lang && styles.languageOptionActive]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text style={[styles.languageOptionText, language === lang && styles.languageOptionTextActive]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* <Text style={styles.payloText}>Paylo</Text> */}
          <Text style={styles.appTitle}>
            Let's get started!
          </Text>

          {/* ── FULL MODE ── */}
          <Text style={styles.welcomeTitle}>
            Welcome back! Enter your details to login.
          </Text>

          {/* Phone input */}
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

          {/* Single PIN text input */}
          <Text style={styles.inputLabel}>PIN</Text>
          <View style={styles.pinFieldWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#9ea3ad" style={styles.pinFieldIcon} />
            <TextInput
              ref={pinInputRef}
              style={styles.pinFieldInput}
              placeholder="Enter your 4-digit PIN"
              placeholderTextColor="#bbb"
              value={pin}
              onChangeText={(text) => { if (text.length <= 4) setPin(text); }}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          </View>

          <View style={styles.loginRow}>
            <TouchableOpacity
              style={[styles.loginButton, loginMutation.isPending && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loginMutation.isPending}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.biometricButton}>
              <Icon name="finger-print" size={24} color="#F8623F" />
            </TouchableOpacity>
          </View>

          {/* Error Modal */}
          <ErrorModal
            visible={errorModalVisible}
            errorMessage={errorMessage}
            onClose={() => setErrorModalVisible(false)}
          />

          <TouchableOpacity onPress={handleSignup} style={styles.bottomLink}>
            <Text style={styles.bottomLinkText}>
              Don't have an account?{' '}
              <Text style={styles.bottomLinkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Spinner visible={loginMutation.isPending} textStyle={styles.spinnerText} />
    </KeyboardAvoidingView>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  // Language
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  languageToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  languageOption: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  languageOptionActive: { backgroundColor: '#11182e' },
  languageOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  languageOptionTextActive: { color: '#fff' },
  // Titles
  payloText: {
    fontSize: 22,
    fontWeight: 'bold',
   
    color: '#11182e',
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11182e',
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 14,
    color: '#11182e',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 8,
  },
  // Phone input
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    width: 95,
    height: 58,
    marginRight: 8,
  },
  flag: { fontSize: 16, marginRight: 8 },
  countryCode: { fontSize: 16, fontWeight: '400', color: '#11182e' },
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
  // Single PIN field (full mode)
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
  pinFieldIcon: { marginRight: 10 },
  pinFieldInput: {
    flex: 1,
    fontSize: 16,
    color: '#11182e',

  },
  // 4-box PIN (PIN-only mode)
  pinBoxSection: {
    marginBottom: 20,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  pinBox: {
    width: 58,
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinBoxActive: {
    borderColor: '#11182e',
    backgroundColor: '#f0f1f3',
  },
  pinBoxText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11182e',
    textAlign: 'center',
  },
  // Buttons
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  loginButtonDisabled: { backgroundColor: '#c5c9d1' },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  biometricButton: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  bottomLink: { marginTop: 20 },
  bottomLinkText: {
    color: '#11182e',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomLinkBold: {
    color: '#11182e',
    fontWeight: '600',
  },
  // Saved phone card
  savedPhoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6f8',
    borderRadius: 14,
    padding: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  savedPhoneAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#11182e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savedPhoneLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  savedPhoneNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11182e',
  },
  switchBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#e8e9ec',
  },
  switchBtnText: {
    fontSize: 13,
    color: '#11182e',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  spinnerText: {
    color: '#11182e',
  },
});

export default LoginScreen;

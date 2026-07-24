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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [phone, setPhone]             = useState('');
  const [pin, setPin]                 = useState('');
  const [language, setLanguage]       = useState<'EN' | 'BN'>('EN');
  const [savedPhone, setSavedPhone]   = useState<string | null>(null);
  const [isLoading, setIsLoading]     = useState(true);
  const [activePinIndex, setActivePinIndex] = useState(0);

  const phoneInputRef   = useRef<TextInput>(null);
  const pinInputRef     = useRef<TextInput>(null);
  const pinBoxInputRef  = useRef<TextInput>(null);
console.log('LoginScreen rendered. savedPhone:', savedPhone, 'isLoading:', isLoading);
  // Read AsyncStorage on mount AND every time screen is focused
  useEffect(() => {
    const loadPhone = () => {
      setIsLoading(true);
      setPin('');
      AsyncStorage.getItem('user_phone')
        .then((stored) => setSavedPhone(stored))
        .catch(() => setSavedPhone(null))
        .finally(() => setIsLoading(false));
    };

    // Run immediately on mount
    loadPhone();

    // Also re-run whenever this screen comes back into focus
    const unsubscribe = navigation.addListener('focus', loadPhone);
    return unsubscribe;
  }, [navigation]);

  // Auto-focus PIN box when in PIN-only mode
  useEffect(() => {
    if (!isLoading && savedPhone) {
      const t = setTimeout(() => pinBoxInputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isLoading, savedPhone]);

  // ── Handlers ──────────────────────────────────────────
  const handleLogin = async () => {
    if (savedPhone) {
      navigation.navigate('MainHome' as never);
    } else {
      try {
        await AsyncStorage.setItem('user_phone', '+880' + phone);
      } catch (_) {}
      navigation.navigate('MainHome' as never);
    }
  };

  const handleSignup = () => navigation.navigate('Signup' as never);

  const handleSwitchAccount = async () => {
    await AsyncStorage.removeItem('user_phone');
    setSavedPhone(null);
    setPin('');
    setTimeout(() => phoneInputRef.current?.focus(), 200);
  };

  // ── Loading ────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#11182e" />
      </View>
    );
  }

  // ── UI ────────────────────────────────────────────────
  return (
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

          {/* ── PIN-ONLY MODE (phone already saved) ── */}
          {savedPhone ? (
            <>
              {/* Saved phone display — NO input field */}
              <View style={styles.savedPhoneCard}>
                <View style={styles.savedPhoneAvatar}>
                  <Icon name="person" size={22} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.savedPhoneLabel}>Logged in as</Text>
                  <Text style={styles.savedPhoneNumber}>{savedPhone}</Text>
                </View>
                <TouchableOpacity onPress={handleSwitchAccount} style={styles.switchBtn}>
                  <Text style={styles.switchBtnText}>Switch</Text>
                </TouchableOpacity>
              </View>

              {/* 4-box PIN */}
              <Text style={styles.inputLabel}>Enter your PIN</Text>
              <View style={styles.pinBoxSection}>
                <TextInput
                  ref={pinBoxInputRef}
                  style={styles.hiddenInput}
                  value={pin}
                  onChangeText={(text) => {
                    if (text.length <= 4) {
                      setPin(text);
                      setActivePinIndex(text.length);
                    }
                  }}
                  onFocus={() => setActivePinIndex(pin.length)}
                  onBlur={() => setActivePinIndex(-1)}
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.pinContainer}
                  activeOpacity={1}
                  onPress={() => pinBoxInputRef.current?.focus()}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.pinBox,
                        activePinIndex === index && styles.pinBoxActive,
                      ]}
                    >
                      <Text style={styles.pinBoxText}>
                        {pin.length > index ? '•' : ''}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
              </View>

              <View style={styles.loginRow}>
                <TouchableOpacity
                  style={[styles.loginButton, pin.length < 4 && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={pin.length < 4}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.biometricButton}>
                  <Icon name="finger-print" size={24} color="#11182e" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSwitchAccount} style={styles.bottomLink}>
                <Text style={styles.bottomLinkText}>
                  Not you?{' '}
                  <Text style={styles.bottomLinkBold}>Use a different account</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* ── FULL MODE (first time / switched account) ── */}
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
                  autoFocus
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
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.biometricButton}>
                  <Icon name="finger-print" size={24} color="#F8623F" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSignup} style={styles.bottomLink}>
                <Text style={styles.bottomLinkText}>
                  Don't have an account?{' '}
                  <Text style={styles.bottomLinkBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
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
});

export default LoginScreen;

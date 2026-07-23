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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const [activeField, setActiveField] = useState<'phone' | 'pin'>('phone');

  const phoneInputRef = useRef<TextInput>(null);

  const pinInputRef = useRef<TextInput>(null);

  const handleLogin = () => {
    navigation.navigate('MainHome' as never);
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Language Toggle at top right */}
          <View style={styles.languageContainer}>
            <View style={styles.languageToggleContainer}>
              <TouchableOpacity
                style={[styles.languageOption, language === 'EN' && styles.languageOptionActive]}
                onPress={() => setLanguage('EN')}
              >
                <Text style={[styles.languageOptionText, language === 'EN' && styles.languageOptionTextActive]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.languageOption, language === 'BN' && styles.languageOptionActive]}
                onPress={() => setLanguage('BN')}
              >
                <Text style={[styles.languageOptionText, language === 'BN' && styles.languageOptionTextActive]}>BN</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logo centered */}
          {/* <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View> */}

          <Text style={styles.payloText}>Paylo</Text>
          <Text style={styles.appTitle}>Let's get started!</Text>
          <Text style={styles.welcomeTitle}>Welcome back! Enter your details to login.</Text>

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

          {/* PIN Input */}
          <Text style={styles.inputLabel}>Pin</Text>
          <View>
            <TextInput
              ref={pinInputRef}
              style={styles.hiddenInput}
              value={pin}
              onChangeText={(text) => {
                if (text.length <= 4) setPin(text);
              }}
              keyboardType="number-pad"
              maxLength={4}
              onFocus={() => setActiveField('pin')}
            />
            <TouchableOpacity
              style={styles.pinContainer}
              activeOpacity={1}
              onPress={() => pinInputRef.current?.focus()}
            >
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.pinInput,
                    activeField === 'pin' && pin.length === index && styles.pinInputActive,
                  ]}
                >
                  <Text style={styles.pinInputText}>
                    {pin.length > index ? '•' : ''}
                  </Text>
                </View>
              ))}
            </TouchableOpacity>
          </View>

          <View style={styles.loginRow}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.biometricButton}>
              <Icon name="finger-print" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign Up</Text></Text>
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
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    // marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  languageToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  languageOption: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  languageOptionActive: {
    backgroundColor: '#6b7280',
  },
  languageOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  languageOptionTextActive: {
    color: '#fff',
  },
  payloText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeTitle: {
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
    // borderTopRightRadius: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    fontSize: 16,
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
    borderColor: '#6b7280',
  },
  pinInputText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
  },
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
  signupText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#6b7280',
    fontWeight: '600',
  },
});

export default LoginScreen;

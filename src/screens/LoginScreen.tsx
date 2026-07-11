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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');

  const handleLogin = () => {
    navigation.navigate('MainHome' as never);
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
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

          <Text style={styles.appTitle}>Let's get started!</Text>
          <Text style={styles.welcomeTitle}>Welcome back! Enter your details to login.</Text>

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

          {/* PIN Input */}
          <View style={styles.pinContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                style={styles.pinInput}
                placeholder="•"
                placeholderTextColor="#999"
                value={pin[index]}
                onChangeText={(value) => handlePinChange(index, value)}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry
                textAlign="center"
              />
            ))}
          </View>

          <View style={styles.loginRow}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.biometricButton}>
              <Icon name="finger-print" size={24} color="#37c667" />
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
    borderColor: '#37c667',
  },
  languageOption: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  languageOptionActive: {
    backgroundColor: '#37c667',
  },
  languageOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  languageOptionTextActive: {
    color: '#fff',
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
    paddingHorizontal: 15,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    color: '#333',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#37c667',
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
    color: '#37c667',
    fontWeight: '600',
  },
});

export default LoginScreen;

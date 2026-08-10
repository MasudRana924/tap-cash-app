import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authBg from '../assets/auth-bg.png';

const OTPScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPhone = async () => {
      const storedPhone = await AsyncStorage.getItem('user_phone');
      setPhoneNumber(storedPhone);
    };
    loadPhone();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const otpInputRef = React.useRef<TextInput>(null);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = [React.useRef<TextInput>(null), React.useRef<TextInput>(null), React.useRef<TextInput>(null), React.useRef<TextInput>(null)];

  const handleOtpChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    
    // Update full OTP string
    const fullOtp = newOtpValues.join('');
    setOtp(fullOtp);
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOTPMutation = useMutation({
    mutationFn: async () => {
      if (!phoneNumber) throw new Error('Phone number not found');
      return apiService.verifyOTP(phoneNumber, otp);
    },
    onSuccess: async (data) => {
      await login(data.token, data.user, data.wallet);
      navigation.navigate('MainHome' as never);
    },
    onError: (error: any) => {
      setErrorMessage(error.errorMessage || error.error || 'OTP verification failed. Please try again.');
    },
  });

  const handleVerify = () => {
    setErrorMessage('');
    verifyOTPMutation.mutate();
  };

  const handleResend = () => {
    setTimer(300); // Reset timer on resend
    // Handle resend OTP logic
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={authBg} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="chevron-back-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verify</Text>
          </View>

          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            We sent a 4-digit OTP to your phone
          </Text>
          <Text style={styles.emailText}>{phoneNumber || '+880XXXXXXXXX'}</Text>

          {/* Code Label */}
          <Text style={styles.codeLabel}>Enter OTP</Text>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={[
                  styles.otpInput,
                  otpValues[index] && styles.otpInputActive,
                ]}
                value={otpValues[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleOtpKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                secureTextEntry
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            style={[styles.verifyButton, verifyOTPMutation.isPending && styles.verifyButtonDisabled]} 
            onPress={handleVerify}
            disabled={verifyOTPMutation.isPending}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {/* Resend Code / Timer */}
          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>{formatTime()}</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <Spinner visible={verifyOTPMutation.isPending}  textStyle={styles.spinnerText} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 40,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#11182e',
    textAlign: 'center',
  },
  otpInputActive: {
    borderColor: '#11182e',
  },
  otpInputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#11182e',
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timerText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  verifyButtonDisabled: {
    backgroundColor: '#c5c9d1',
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

export default OTPScreen;

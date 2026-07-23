import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const OTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
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

  const handleVerify = () => {
    navigation.navigate('MainHome' as never);
  };

  const handleResend = () => {
    setTimer(300); // Reset timer on resend
    // Handle resend OTP logic
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Enter Code</Text>
          </View>

          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            A verification code will be sent to your email
          </Text>
          <Text style={styles.emailText}>mi***@gmail.com</Text>

          {/* Code Label */}
          <Text style={styles.codeLabel}>Code</Text>

          {/* OTP Inputs */}
          <View>
            <TextInput
              ref={otpInputRef}
              style={styles.hiddenInput}
              value={otp}
              onChangeText={(text) => {
                if (text.length <= 6) setOtp(text);
              }}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus={true}
            />
            <TouchableOpacity 
              style={styles.otpContainer}
              activeOpacity={1}
              onPress={() => otpInputRef.current?.focus()}
            >
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.otpInput,
                    otp.length === index && styles.otpInputActive,
                  ]}
                >
                  <Text style={styles.otpInputText}>
                    {otp[index] || ''}
                  </Text>
                </View>
              ))}
            </TouchableOpacity>
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpInputActive: {
    borderColor: '#37c667',
  },
  otpInputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
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
    backgroundColor: '#6b7280',
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
});

export default OTPScreen;

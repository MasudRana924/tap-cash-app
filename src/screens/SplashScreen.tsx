import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('has_seen_onboarding');
      
      if (isAuthenticated) {
        navigation.navigate('MainHome' as never);
      } else if (hasSeenOnboarding === 'true') {
        navigation.navigate('Login' as never);
      } else {
        navigation.navigate('Onboarding' as never);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Pay<Text style={styles.logoGray}>lo</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Using the same background color as Onboarding
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 56,
    fontWeight: '900',
    color: '#5b6161',
    letterSpacing: -1.5,
  },
  logoGray: {
    color: '#5b6161',
  },
});

export default SplashScreen;

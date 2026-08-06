import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const QRScreen = () => {
  const navigation = useNavigation<any>();

  // User's unique identifier for QR code - in real app this would come from user context
  const userQRData = JSON.stringify({
    userId: '123456789',
    phone: '+8801700000000',
    name: 'Sarah',
    type: 'payment'
  });

  const handleScanQR = () => {
    // Navigate to scan screen
    navigation.navigate('ScanQR');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR Code</Text>
          <View style={styles.placeholder} />
        </View>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCode
            value={userQRData}
            size={250}
            color="#F8623F"
            backgroundColor="#FFFFFF"
            logoSize={60}
            logoBackgroundColor="#F8623F"
            logoBorderRadius={12}
            quietZone={10}
          />
        </View>

        {/* Scan Button */}
        <TouchableOpacity style={styles.scanButton} onPress={handleScanQR}>
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  qrContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    alignSelf: 'center',
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  scanButtonText: {
    color: '#F8623F',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScreen;

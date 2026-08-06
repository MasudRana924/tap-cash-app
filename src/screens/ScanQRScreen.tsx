import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ScanQRScreen = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeRead = ({ data }: any) => {
    if (scanned) return;
    setScanned(true);

    try {
      const qrData = JSON.parse(data);
      Alert.alert(
        'QR Code Scanned',
        `User: ${qrData.name}\nPhone: ${qrData.phone}`,
        [
          {
            text: 'Cancel',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
          {
            text: 'Send Money',
            onPress: () => {
              // Navigate to send money screen with scanned user data
              // @ts-ignore - navigation typing
              navigation.navigate('SendMoney', { scannedUser: qrData });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Invalid QR Code', 'This QR code is not valid for payments');
      setScanned(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <View style={{ width: 40 }} />
        </View>

        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onBarCodeRead={handleBarCodeRead}
          androidCameraPermissionOptions={{
            title: 'Camera Permission',
            message: 'We need your permission to use your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={styles.scanCorner} />
              <View style={[styles.scanCorner, styles.scanCornerRight]} />
              <View style={[styles.scanCorner, styles.scanCornerBottom]} />
              <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
            </View>
            <Text style={styles.scanText}>
              {scanned ? 'QR Code Scanned!' : 'Align QR code within the frame'}
            </Text>
          </View>
        </RNCamera>

        {!scanned && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A2E',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanArea: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#F8623F',
    top: -2,
    left: -2,
  },
  scanCornerRight: {
    left: 'auto',
    right: -2,
    borderTopWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 4,
  },
  scanCornerBottom: {
    top: 'auto',
    bottom: -2,
    borderTopWidth: 0,
    borderBottomWidth: 4,
  },
  scanCornerBottomRight: {
    left: 'auto',
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 4,
  },
  scanText: {
    marginTop: 30,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  rescanButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  rescanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanQRScreen;

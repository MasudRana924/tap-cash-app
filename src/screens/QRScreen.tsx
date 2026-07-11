import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QRScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>QR Code</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Scan to pay or receive</Text>
      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Scan QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  qrContainer: {
    marginBottom: 30,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 40,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScreen;

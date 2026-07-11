import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SuccessScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('MainHome' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Icon name="checkmark" size={60} color="#fff" />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Money Sent!</Text>
        <Text style={styles.successMessage}>
          Your money has been sent successfully to John Doe
        </Text>

        {/* Transaction Details */}
        <View style={styles.transactionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Recipient</Text>
            <Text style={styles.detailValue}>John Doe</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <Text style={styles.detailValue}>+880 1712-345678</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>৳ 1,000.00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>TXN123456789</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>Jul 11, 2026, 9:30 PM</Text>
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 30,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#37c667',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  transactionDetails: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#37c667',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SuccessScreen;

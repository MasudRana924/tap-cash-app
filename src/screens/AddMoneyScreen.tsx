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
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

const AddMoneyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Add Money" />

        {/* Payment Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('BankSelection' as never)}
          >
            <View style={styles.optionIconContainer}>
              <Icon name="bank-outline" size={32} color="#11182e" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Bank to Paylo</Text>
              <Text style={styles.optionSubtitle}>Transfer bank to paylo account</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" style={styles.optionArrow} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => (navigation as any).navigate('AddMoneyAmount', { method: 'card' })}
          >
            <View style={styles.optionIconContainer}>
              <Icon name="card-outline" size={32} color="#11182e" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Card to Paylo</Text>
              <Text style={styles.optionSubtitle}>Transfer bank to paylo account</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" style={styles.optionArrow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
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
  optionsSection: {
    marginTop: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  optionArrow: {
    marginLeft: 12,
  },
});

export default AddMoneyScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Bank {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const AddMoneyScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const banks: Bank[] = [
    { id: '1', name: 'Dutch Bangla Bank', logo: '💳', color: '#E31837' },
    { id: '2', name: 'Brac Bank', logo: '🏦', color: '#003366' },
    { id: '3', name: 'City Bank', logo: '🏛️', color: '#00A651' },
    { id: '4', name: 'Sonali Bank', logo: '🏦', color: '#006633' },
    { id: '5', name: 'Pubali Bank', logo: '🏛️', color: '#800000' },
    { id: '6', name: 'Eastern Bank', logo: '💳', color: '#003399' },
    { id: '7', name: 'Prime Bank', logo: '🏦', color: '#0066CC' },
    { id: '8', name: 'AB Bank', logo: '💳', color: '#003366' },
  ];

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bank: Bank) => {
    navigation.navigate('AddMoneyCard' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Input */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search bank..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Banks List */}
        <View style={styles.banksSection}>
          <Text style={styles.sectionTitle}>Select Bank</Text>
          {filteredBanks.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={styles.bankItem}
              onPress={() => handleBankSelect(bank)}
            >
              <View style={[styles.bankLogoContainer, { backgroundColor: bank.color + '20' }]}>
                <Text style={styles.bankLogo}>{bank.logo}</Text>
              </View>
              <Text style={styles.bankName}>{bank.name}</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
          {filteredBanks.length === 0 && (
            <Text style={styles.noResults}>No banks found</Text>
          )}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
  },
  searchSection: {
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 18,
    minHeight: 58,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  banksSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  bankLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bankLogo: {
    fontSize: 24,
  },
  bankName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  noResults: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddMoneyScreen;

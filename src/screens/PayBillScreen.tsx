import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const PayBillScreen = () => {
  const navigation = useNavigation();

  const billCategories: BillCategory[] = [
    { id: '1', name: 'Electricity', icon: 'flash-outline', color: '#FFD93D' },
    { id: '2', name: 'Gas', icon: 'flame-outline', color: '#FF6B6B' },
    { id: '3', name: 'Water', icon: 'water-outline', color: '#4ECDC4' },
    { id: '4', name: 'Internet', icon: 'wifi-outline', color: '#6BCB77' },
    { id: '5', name: 'TV', icon: 'tv-outline', color: '#E50914' },
    { id: '6', name: 'Phone', icon: 'call-outline', color: '#45B7D1' },
  ];

  const handleCategorySelect = (category: BillCategory) => {
    navigation.navigate('PayBillAmount' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pay Bill</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Icon name="receipt-outline" size={20} color="#37c667" />
          <Text style={styles.infoText}>Pay your utility bills instantly</Text>
        </View>

        {/* Bill Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Select Bill Type</Text>
          {billCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(category)}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: category.color + '20' }]}>
                <Icon name={category.icon as any} size={24} color={category.color} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
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
  categoriesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});

export default PayBillScreen;

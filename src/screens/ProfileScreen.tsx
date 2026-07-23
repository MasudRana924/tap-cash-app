import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const accountItems = [
    { id: '1', icon: 'person-outline', label: 'Edit Profile' },
    { id: '2', icon: 'card-outline', label: 'My Cards' },
    { id: '3', icon: 'shield-checkmark-outline', label: 'Security' },
    { id: '4', icon: 'notifications-outline', label: 'Notifications' },
  ];

  const supportItems = [
    { id: '5', icon: 'help-circle-outline', label: 'Help & Support' },
    { id: '6', icon: 'document-text-outline', label: 'Terms & Conditions' },
    { id: '7', icon: 'information-circle-outline', label: 'About' },
  ];

  const renderMenuItem = (item: { id: string; icon: string; label: string }, isLast: boolean) => (
    <TouchableOpacity key={item.id} style={[styles.menuItem, isLast && styles.menuItemLast]}>
      <Icon name={item.icon as any} size={22} color="#333" />
      <Text style={styles.menuLabel}>{item.label}</Text>
      <Icon name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileRow}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Jennifer Smith</Text>
            <Text style={styles.phone}>+880 1712-345678</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="create-outline" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Balance Strip */}
        <View style={styles.balanceStrip}>
          <View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>৳ 25,450.00</Text>
          </View>
          <Icon name="eye-outline" size={20} color="rgba(255,255,255,0.7)" />
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuGroup}>
          {accountItems.map((item, index) =>
            renderMenuItem(item, index === accountItems.length - 1)
          )}
        </View>

        {/* Support Section */}
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuGroup}>
          {supportItems.map((item, index) =>
            renderMenuItem(item, index === supportItems.length - 1)
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>TapCash v1.0.0</Text>
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceStrip: {
    backgroundColor: '#6b7280',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  balanceLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuGroup: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    marginTop: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5E5',
    backgroundColor: '#FFF5F5',
  },
  logoutText: {
    fontSize: 15,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ccc',
    marginTop: 20,
    paddingBottom: 20,
  },
});

export default ProfileScreen;

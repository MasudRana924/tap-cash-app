import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    { id: '1', icon: 'person-outline', label: 'Edit Profile', color: '#37c667' },
    { id: '2', icon: 'card-outline', label: 'My Cards', color: '#4ECDC4' },
    { id: '3', icon: 'settings-outline', label: 'Settings', color: '#45B7D1' },
    { id: '4', icon: 'shield-checkmark-outline', label: 'Security', color: '#96CEB4' },
    { id: '5', icon: 'help-circle-outline', label: 'Help & Support', color: '#FFEAA7' },
    { id: '6', icon: 'document-text-outline', label: 'Terms & Conditions', color: '#DDA0DD' },
    { id: '7', icon: 'information-circle-outline', label: 'About', color: '#98D8C8' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with back button */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Jennifer Smith</Text>
          <Text style={styles.phone}>+880 1712-345678</Text>
          <Text style={styles.emailJennifer}>jennifer.smith@email.com</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>৳ 25,450.00</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Icon name={item.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Icon name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TapCash v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#37c667',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  emailJennifer: {
    fontSize: 14,
    color: '#999',
  },
  balanceCard: {
    backgroundColor: '#37c667',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;

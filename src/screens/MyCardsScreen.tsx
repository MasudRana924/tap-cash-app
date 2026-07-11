import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const MyCardsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Cards</Text>
        <Text style={styles.subtitle}>Manage your payment methods</Text>

        {/* Virtual Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardChip}>
              <Icon name="wifi" size={24} color="#FFD700" />
            </View>
            <Text style={styles.cardType}>Virtual Card</Text>
          </View>
          <Text style={styles.cardNumber}>**** **** **** 4589</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>Jennifer Doe</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>12/28</Text>
            </View>
          </View>
        </View>

        {/* Add New Card Button */}
        <TouchableOpacity style={styles.addCardButton}>
          <Icon name="add-circle-outline" size={32} color="#84CC16" />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>

        {/* Card Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Card Actions</Text>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="lock-closed-outline" size={24} color="#333" />
            <Text style={styles.actionText}>Freeze Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="settings-outline" size={24} color="#333" />
            <Text style={styles.actionText}>Card Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="document-text-outline" size={24} color="#333" />
            <Text style={styles.actionText}>Card Statement</Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  cardChip: {
    width: 50,
    height: 35,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    marginBottom: 30,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#84CC16',
    borderStyle: 'dashed',
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#84CC16',
    marginLeft: 10,
  },
  actionsSection: {
    marginBottom: 100,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});

export default MyCardsScreen;

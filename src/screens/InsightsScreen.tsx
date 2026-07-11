import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const InsightsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Track your spending habits</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="trending-up" size={24} color="#84CC16" />
            <Text style={styles.cardTitle}>Monthly Spending</Text>
          </View>
          <Text style={styles.cardAmount}>$2,450.00</Text>
          <Text style={styles.cardSubtitle}>+12% from last month</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="wallet" size={24} color="#7C3AED" />
            <Text style={styles.cardTitle}>Total Savings</Text>
          </View>
          <Text style={styles.cardAmount}>$5,320.00</Text>
          <Text style={styles.cardSubtitle}>Great progress!</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="pie-chart" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Categories</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>Food & Dining</Text>
            <Text style={styles.categoryAmount}>$450</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>Transportation</Text>
            <Text style={styles.categoryAmount}>$320</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>Shopping</Text>
            <Text style={styles.categoryAmount}>$280</Text>
          </View>
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default InsightsScreen;

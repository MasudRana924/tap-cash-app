import React from 'react';
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

interface CardType {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const CardSelectionScreen = () => {
  const navigation = useNavigation();

  const cardTypes: CardType[] = [
    { id: 'visa', name: 'Visa', logo: '💳', color: '#1A1F71' },
    { id: 'mastercard', name: 'MasterCard', logo: '💳', color: '#EB001B' },
    { id: 'amex', name: 'Amex', logo: '💳', color: '#006FCF' },
  ];

  const handleCardSelect = (card: CardType) => {
    (navigation as any).navigate('AddMoneyAmount', { method: 'card', cardType: card.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Card Type</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Card Types */}
        <View style={styles.cardsSection}>
          {cardTypes.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.cardItem}
              onPress={() => handleCardSelect(card)}
            >
              <View style={[styles.cardLogoContainer, { backgroundColor: card.color + '20' }]}>
                <Text style={styles.cardLogo}>{card.logo}</Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardName}>{card.name}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" style={styles.cardArrow} />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  cardsSection: {
    marginTop: 10,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardLogo: {
    fontSize: 24,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11182e',
  },
  cardArrow: {
    marginLeft: 12,
  },
});

export default CardSelectionScreen;

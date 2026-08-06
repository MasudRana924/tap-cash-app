import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuickAmountButtonsProps {
  amounts: string[];
  selectedAmount?: string;
  onSelectAmount: (amount: string) => void;
  layout?: 'row' | 'grid';
}

const QuickAmountButtons: React.FC<QuickAmountButtonsProps> = ({
  amounts,
  selectedAmount,
  onSelectAmount,
  layout = 'row',
}) => {
  return (
    <View style={layout === 'row' ? styles.quickAmountContainer : styles.quickAmountGrid}>
      {amounts.map((amount) => (
        <TouchableOpacity
          key={amount}
          style={[
            layout === 'row' ? styles.quickAmountButton : styles.quickAmountItem,
            selectedAmount === amount && styles.quickAmountSelected,
          ]}
          onPress={() => onSelectAmount(amount)}
        >
          <Text
            style={[
              layout === 'row' ? styles.quickAmountText : styles.quickAmountGridText,
              selectedAmount === amount && styles.quickAmountTextSelected,
            ]}
          >
            ৳{amount}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickAmountButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  quickAmountItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quickAmountGridText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11182e',
  },
  quickAmountSelected: {
    backgroundColor: '#11182e',
    borderColor: '#11182e',
  },
  quickAmountTextSelected: {
    color: '#fff',
  },
});

export default QuickAmountButtons;

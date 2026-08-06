import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showCurrencySymbol?: boolean;
  autoFocus?: boolean;
  keyboardType?: 'numeric' | 'decimal-pad' | 'phone-pad';
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeText,
  placeholder = '৳0.00',
  showCurrencySymbol = false,
  autoFocus = true,
  keyboardType = 'decimal-pad',
}) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  return (
    <View style={styles.amountSection}>
      {showCurrencySymbol && <Text style={styles.amountLabel}>Amount (BDT)</Text>}
      <View style={showCurrencySymbol ? styles.amountInputContainerWithSymbol : styles.amountInputContainer}>
        {showCurrencySymbol && <Text style={styles.currencySymbol}>৳</Text>}
        <TextInput
          ref={inputRef}
          style={showCurrencySymbol ? styles.amountInputWithSymbol : styles.amountInput}
          placeholder={showCurrencySymbol ? '0' : placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          selectionColor="#11182e"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  amountSection: {
    marginBottom: 30,
  },
  amountLabel: {
    fontSize: 14,
    color: '#8e96a3',
    marginBottom: 10,
  },
  amountInputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  amountInputContainerWithSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8e96a3',
    marginRight: 10,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11182e',
  },
  amountInputWithSymbol: {
    flex: 1,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#11182e',
  },
});

export default AmountInput;

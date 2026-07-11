import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
  style?: any;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress, style }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

  return (
    <View style={[styles.keyboard, style]}>
      {keys.map((key, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.key,
            key === '' && styles.keyEmpty,
            key === 'back' && styles.keyBack,
          ]}
          onPress={() => key && onKeyPress(key)}
          disabled={key === ''}
        >
          {key === 'back' ? (
            <Icon name="backspace-outline" size={24} color="#333" />
          ) : (
            <Text style={styles.keyText}>{key}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  key: {
    width: '31%',
    aspectRatio: 1.5,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyEmpty: {
    backgroundColor: 'transparent',
  },
  keyBack: {
    backgroundColor: '#F5F5F5',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
});

export default CustomKeyboard;

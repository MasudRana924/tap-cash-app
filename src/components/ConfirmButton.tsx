import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface ConfirmButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = '#11182e',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.confirmButton,
        disabled && styles.confirmButtonDisabled,
        { backgroundColor: disabled ? '#ccc' : backgroundColor },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.confirmButtonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmButton;

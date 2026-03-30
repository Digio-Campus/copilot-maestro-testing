import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export const CustomButton = ({ title, onPress, variant = 'primary', isLoading, testID }: any) => {
  const isPrimary = variant === 'primary';
  const isOutlined = variant === 'outlined';
  const isSecondary = variant === 'secondary';

  const containerStyle = [
    styles.button,
    isPrimary && styles.buttonPrimary,
    isOutlined && styles.buttonOutlined,
    isSecondary && styles.buttonSecondary,
  ];

  const textStyle = [
    styles.buttonText,
    isPrimary && styles.buttonTextPrimary,
    isOutlined && styles.buttonTextOutlined,
    isSecondary && styles.buttonTextSecondary,
  ];

  return (
    <TouchableOpacity
      testID={testID}
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
  },
  buttonPrimary: { 
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: { 
    backgroundColor: COLORS.secondary,
  },
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: '700',
  },
  buttonTextPrimary: {
    color: COLORS.white,
  },
  buttonTextSecondary: {
    color: COLORS.text,
  },
  buttonTextOutlined: {
    color: COLORS.primary,
  },
});

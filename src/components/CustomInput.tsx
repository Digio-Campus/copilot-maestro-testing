import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';

export const CustomInput = ({ label, placeholder, secureTextEntry, value, onChangeText, keyboardType, testID, rightElement }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, isFocused && { color: COLORS.primary }]}>{label}</Text>
      <View 
        style={[
          styles.inputWrapper, 
          isFocused ? styles.inputWrapperFocused : styles.inputWrapperBlurred,
          { flexDirection: 'row', alignItems: 'center' }
        ]}
      >
        <TextInput
          testID={testID}
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightElement && (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { 
    marginBottom: SPACING.lg,
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginBottom: SPACING.sm,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    height: 58,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  inputWrapperBlurred: {
    borderColor: COLORS.border,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    ...SHADOWS.light,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
  },
  input: { 
    fontSize: 16, 
    color: COLORS.text,
    fontWeight: '500',
  },
  rightElement: {
    marginLeft: SPACING.sm,
  },
});

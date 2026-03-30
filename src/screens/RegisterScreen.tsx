import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Platform, Pressable, TouchableOpacity } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const RegisterScreen = ({ name, setName, email, setEmail, password, setPassword, handleRegister, isLoading, navigateTo, errorMessage, successMessage }: any) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Standardized Naming for programmatic analysis
  const nameInput = (
    <CustomInput testID="register_full_input" label="Full Name" placeholder="Jane Doe" value={name} onChangeText={setName} />
  );
  
  const emailInput = (
    <CustomInput testID="register_email_input" 
      label="Email Address" 
      placeholder="test@example.com" 
      value={email} 
      onChangeText={setEmail}
      keyboardType="email-address"
    />
  );
  
  const passwordInput = (
    <CustomInput testID="register_password_input" 
      label="Password" 
      placeholder="6+ characters" 
      secureTextEntry={!showPassword}
      value={password} 
      onChangeText={setPassword} 
      rightElement={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={24} 
            color={COLORS.textLight} 
          />
        </TouchableOpacity>
      }
    />
  );

  const registerButton = (
    <CustomButton testID="register_create_button" title="Create Account" onPress={handleRegister} isLoading={isLoading} />
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            
            <View style={styles.card}>
              <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: '#eff6ff' }]}>
                  <Ionicons name="person-add" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Join our community and start testing.</Text>
              </View>

              <View style={styles.form}>
                {errorMessage ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={20} color={COLORS.error} />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}

                {successMessage ? (
                  <View style={styles.successBox}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                    <Text style={styles.successText}>{successMessage}</Text>
                  </View>
                ) : null}
                
                {nameInput}
                {emailInput}
                {passwordInput}
                {registerButton}

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
                  <TouchableOpacity testID="register_login_button" onPress={() => navigateTo('login')}>
                    <Text style={styles.linkText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  keyboardView: { 
    flex: 1,
  },
  safeArea: { 
    flex: 1, 
  },
  contentContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    paddingHorizontal: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: SPACING.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: COLORS.text, 
    marginBottom: SPACING.xs,
  },
  subtitle: { 
    fontSize: 15, 
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.sm,
  },
  form: { 
    width: '100%',
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: SPACING.xl,
  },
  footerText: { 
    fontSize: 14, 
    color: COLORS.textLight,
  },
  linkText: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: COLORS.primary,
  },
  errorBox: { 
    backgroundColor: '#fff1f2', 
    padding: SPACING.md, 
    borderRadius: RADIUS.md, 
    marginBottom: SPACING.lg, 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecdd3',
  },
  errorText: { 
    color: COLORS.error, 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: SPACING.sm,
    flex: 1,
  },
  successBox: { 
    backgroundColor: '#ecfdf5', 
    padding: SPACING.md, 
    borderRadius: RADIUS.md, 
    marginBottom: SPACING.lg, 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  successText: { 
    color: COLORS.success, 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: SPACING.sm,
    flex: 1,
  },
});

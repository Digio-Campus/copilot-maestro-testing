import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Platform, Pressable, TouchableOpacity } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const LoginScreen = ({ email, setEmail, password, setPassword, handleLogin, isLoading, navigateTo, errorMessage }: any) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Standardized Naming for programmatic analysis
  const emailInput = (
    <CustomInput testID="login_email_input" 
      label="Email Address" 
      placeholder="test@example.com" 
      value={email} 
      onChangeText={setEmail}
      keyboardType="email-address"
    />
  );
  
  const passwordInput = (
    <CustomInput testID="login_password_input" 
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

  const loginButton = (
    <CustomButton testID="login_sign_button" title="Sign In" onPress={handleLogin} isLoading={isLoading} />
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            
            <View style={styles.card}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <Ionicons name="flash" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>
              </View>

              <View style={styles.form}>
                {errorMessage ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={20} color={COLORS.error} />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}
                
                {emailInput}
                {passwordInput}
                {loginButton}

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  <TouchableOpacity testID="login_register_button" onPress={() => navigateTo('register')}>
                    <Text style={styles.linkText}>Sign Up</Text>
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
});

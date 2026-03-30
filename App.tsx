import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { COLORS } from './src/constants/theme';

// Initial Mock Data (10 items)
const INITIAL_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Activity Item ${i + 1}`,
  description: `This is the description for item number ${i + 1}. Realistic and testable content.`,
  isLiked: false,
}));

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  
  // Simulated Database State
  const [registeredUser, setRegisteredUser] = useState<any>(null); // { name, email, password }
  const [loggedInUser, setLoggedInUser] = useState<any>(null); // { email }

  // Form Field State (temporary)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Content State
  const [items, setItems] = useState(INITIAL_DATA);

  const navigateTo = (screen: string) => {
    setErrorMessage('');
    setSuccessMessage('');
    // Protected routing logic for Home
    if (screen === 'home' && !loggedInUser) {
      setCurrentScreen('login');
      return;
    }
    setCurrentScreen(screen);
  };

  const validateAuth = () => {
    // Robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    
    // Safety check for password length
    const passLength = password?.length ?? 0;
    if (passLength < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateAuth()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Simulate API call using a Promise
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check against registered user
      if (!registeredUser) {
        throw new Error('User not found. Please register first.');
      }
      
      if (email === registeredUser.email && password === registeredUser.password) {
        setLoggedInUser({ email: registeredUser.email });
        setCurrentScreen('home'); 
      } else {
        throw new Error('Incorrect email or password.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (!validateAuth()) return;

    setErrorMessage('');
    setSuccessMessage('Registration successful! Redirecting...');
    
    // Save to simulated database
    setRegisteredUser({ name, email, password });
    
    setTimeout(() => {
      navigateTo('login');
    }, 2000);
  };

  const toggleLike = (id: string) => {
    setItems((prevItems: any) => prevItems.map((item: any) => 
      item.id === id ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems((prevItems: any) => prevItems.filter((item: any) => item.id !== id));
  };

  const addNewItem = () => {
    const newId = Date.now().toString();
    const newItem = {
      id: newId,
      title: `Task ${items.length + 1}`,
      description: `Added on ${new Date().toLocaleTimeString()}. Interaction is key.`,
      isLiked: false,
    };
    setItems((prev: any) => [newItem, ...prev]);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoggedInUser(null);
      setEmail('');
      setPassword('');
      setName('');
      navigateTo('login');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {currentScreen === 'login' && (
        <LoginScreen 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          isLoading={isLoading}
          navigateTo={navigateTo}
          errorMessage={errorMessage}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen 
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleRegister={handleRegister}
          isLoading={isLoading}
          navigateTo={navigateTo}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}

      {currentScreen === 'home' && loggedInUser && (
        <HomeScreen 
          email={loggedInUser.email}
          items={items}
          logout={logout}
          toggleLike={toggleLike}
          removeItem={removeItem}
          addNewItem={addNewItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});

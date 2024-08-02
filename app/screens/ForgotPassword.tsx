import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (e) {
      console.error('Forgot Password error:', e); // Log error details
      if (e.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (e.code === 'auth/user-not-found') {
        setError('No user found with this email address');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7', // Soft background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Arial', // Add custom font if available
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    fontFamily: 'Arial', // Add custom font if available
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    width: '85%',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontFamily: 'Arial', // Add custom font if available
  },
  button: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial', // Add custom font if available
  },
  error: {
    marginTop: 15,
    fontSize: 16,
    color: 'red',
    fontFamily: 'Arial', // Add custom font if available
  },
});

export default ForgotPassword;

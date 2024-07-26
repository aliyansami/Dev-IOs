import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
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
    backgroundColor: '#e0f7fa', // Light blue gradient background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#00796b',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export default ForgotPassword;

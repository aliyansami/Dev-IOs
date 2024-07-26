import React, {useEffect} from 'react';
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
import {useAuthStore} from '../../store';
import { useNavigation } from '@react-navigation/native';

const Signup: React.FC = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    error,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setError,
    clearAuth,
  } = useAuthStore();
  const navigation = useNavigation();
  useEffect(() => {
    // Clear all fields and error when the component mounts
    clearAuth();
  }, [clearAuth]);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: name,
        });
        Alert.alert('Success', 'User registered successfully');
        clearAuth(); // Clear fields and error on successful registration
      } else {
        setError('Failed to register user');
      }
    } catch (er1) {
      console.error('Signup error:', er1); // Log error details
      if (er1.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (er1.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (er1.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 15,
    width: '85%',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#00796b',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 15,
    fontSize: 16,
    color: 'red',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#00796b',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Signup;

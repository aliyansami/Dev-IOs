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
import {useAuthStore} from '../../store'; // Adjust the path as needed
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login: React.FC = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const {email, password, error, setEmail, setPassword, setError, clearAuth} =
    useAuthStore();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(inputEmail, inputPassword);
      // Update Zustand store
      setEmail(inputEmail);
      setPassword(inputPassword);
      setError('');
      Alert.alert('Success', 'User Logged In successfully');
      console.log('Logged In');
    } catch (e) {
      setError('Authentication failed. Please check your credentials.');
      Alert.alert('Incorrect email or Password');
      clearAuth(); // Clear auth details on error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={inputEmail}
        onChangeText={setInputEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={inputPassword}
        onChangeText={setInputPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
  },
  linkText: {
    color: '#00796b',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Login;

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigation = useNavigation();

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {email: '', password: ''},
      validationSchema,
      onSubmit: async values => {
        try {
          await auth().signInWithEmailAndPassword(
            values.email,
            values.password,
          );
          navigation.navigate('Home');
        } catch (e) {
          Alert.alert('Incorrect email or password');
        }
      },
    });

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/element5-digital-acrBf9BlfvE-unsplash.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="transparent" // Hide placeholder text
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        {touched.email && errors.email && (
          <Text style={styles.error}>{errors.email}</Text>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="transparent" // Hide placeholder text
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        {touched.password && errors.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.linkText}>New to Scratch?</Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.createAccountText}>Create Account Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.7, // Transparent effect
    borderBottomRightRadius: 150, // Curved bottom-right corner
  },
  overlay: {
    position: 'absolute',
    top: 190, // Adjust as needed
    left: 15, // Align overlay with the image edge
    right: 0,
    zIndex: 1, // Ensure overlay is above the image
    alignItems: 'center', // Center align overlay content
  },
  title: {
    fontSize: 22, // Slightly larger for better emphasis
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Arial',
  },
  subtitle: {
    fontSize: 15, // Slightly larger for better emphasis
    color: '#666',
    marginBottom: 30,
    fontFamily: 'Arial',
  },
  form: {
    marginTop: 220, // To position form below the image and overlay
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 8, // Increased margin for better spacing
    fontFamily: 'Arial',
  },
  input: {
    height: 45, // Increased height for better touch interaction
    borderBottomColor: '#cccccc', // Grey bottom border
    borderBottomWidth: 1, // Bottom border width
    paddingHorizontal: 10, // Added padding for better readability
    backgroundColor: 'transparent', // Make background transparent
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#4CAF50', // Light green color
    borderRadius: 8, // Slightly more rounded corners
    paddingVertical: 12, // Reduced padding for a slimmer appearance
    paddingHorizontal: 30, // Reduced padding for a slimmer appearance
    marginBottom: 15, // Increased margin for better spacing
    width: '80%', // Adjust width as needed
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center', // Center text in button
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    fontFamily: 'Arial',
  },
  linkText: {
    color: '#999999',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Arial',
    textAlign: 'center', // Center text
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center', // Center items horizontally
  },
  createAccountButton: {
    marginTop: 5,
  },
  createAccountText: {
    color: '#66bb6a', // Light green color
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Arial',
    textAlign: 'center', // Center text
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end', // Position at the end of the input container
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#999999', // Grey color for "Forgot Password?"
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Arial',
  },
});

export default Login;

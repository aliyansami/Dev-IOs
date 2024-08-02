import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const {width} = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  name: Yup.string().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
});

const Signup: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    dateOfBirth: Date;
  }) => {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      if (user) {
        await user.updateProfile({displayName: values.name});

        try {
          await firestore().collection('users').doc(user.uid).set({
            name: values.name,
            email: values.email,
            dateOfBirth: values.dateOfBirth.toDateString(),
            followers: 0,
            totalLikes: 0,
          });
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('Home');
        } catch (firestoreError) {
          Alert.alert('Signup Error', 'Unable to store user data.');
        }
      }
    } catch (authError) {
      Alert.alert('Signup Error', 'Unable to register.');
    }
  };

  return (
    <ImageBackground
      source={require('../images/christiann-koepke-b9xUX3HR5nQ-unsplash.jpg')} // Add your background image path
      style={styles.backgroundImage}
      imageStyle={{opacity: 1}} // Adjust the opacity for transparency effect
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          dateOfBirth: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="transparent"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="transparent"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
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
                  placeholderTextColor="transparent"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="transparent"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpenDatePicker(true)}>
                <Text>
                  {dateOfBirth
                    ? dateOfBirth.toDateString()
                    : 'Select Date of Birth'}
                </Text>
              </TouchableOpacity>
              {touched.dateOfBirth && errors.dateOfBirth && (
                <Text style={styles.error}>{errors.dateOfBirth}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={openDatePicker}
              date={dateOfBirth || new Date()}
              mode="date"
              onConfirm={date => {
                setOpenDatePicker(false);
                setDateOfBirth(date);
                setFieldValue('dateOfBirth', date);
              }}
              onCancel={() => setOpenDatePicker(false)}
            />
          </View>
        )}
      </Formik>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen with the image
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add white background with opacity for transparency
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 5, // Reduced marginBottom for tighter spacing
  },
  label: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 0, // Reduced marginBottom for tighter spacing
    fontFamily: 'Arial',
  },
  input: {
    height: 45,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: 'Arial',
  },
});

export default Signup;

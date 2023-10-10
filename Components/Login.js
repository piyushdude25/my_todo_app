import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleSignin = async () => {
    const userData = {
      email,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://myserver-ylrk.onrender.com/api/mytodo/login',
        userData,
      );
      console.log(response);
      setIsLoading(false);
      if (response.status === 200) {
        setEmail('');
        setPassword('');

        // Save user information in local storage
        AsyncStorage.setItem('my_user', JSON.stringify(response.data));
        // Alert.alert('Welcome back! You have successfully logged in.');
        setLoginMessage('Login successful');

        // setIsLoggedIn(true); // Set the user as logged in

        navigation.navigate('Home');
      } else {
        console.log('Authentication failed');
        // Display an error message or take appropriate action
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Hide "uploading message"

      // Show error alert
      Alert.alert(
        'Oops! Something went wrong. Please check your credentials and try again.',
      );
      setLoginMessage('Login failed. Please try again.');
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    // Password validation (check if password contains at least one special character and one number)
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;

    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!specialCharacterRegex.test(text)) {
      setPasswordError('Password must contain at least one special character.');
    } else if (!numberRegex.test(text)) {
      setPasswordError('Password must contain at least one number.');
    } else {
      setPasswordError('');
    }
  };

  const handleFieldFocus = field => {
    switch (field) {
      case 'name':
        setIsNameFocused(true);
        break;
      case 'email':
        setIsEmailFocused(true);
        break;
      case 'password':
        setIsPasswordFocused(true);
        break;
      default:
        break;
    }
  };

  const handleFieldBlur = field => {
    switch (field) {
      case 'name':
        setIsNameFocused(false);
        break;
      case 'email':
        setIsEmailFocused(false);
        break;
      case 'password':
        setIsPasswordFocused(false);
        break;
      default:
        break;
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{flex: 1, resizeMode: 'cover'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>TODO</Text>
              <Text style={styles.subheading}>`Empower Your Daily Routine`</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.lineContainer}>
                <View style={styles.horizontalLine} />
                <Text style={styles.label}>Login</Text>
                <View style={styles.horizontalLine} />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    isEmailFocused ? styles.inputFocused : null,
                  ]}
                  placeholder="Email Id:"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      isPasswordFocused ? styles.inputFocused : null,
                      passwordError ? styles.inputError : null,
                    ]}
                    placeholder="Password :"
                    value={password}
                    onChangeText={handlePasswordChange}
                    onFocus={() => handleFieldFocus('password')}
                    onBlur={() => handleFieldBlur('password')}
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    style={styles.passwordVisibilityIcon}
                    onPress={handlePasswordVisibility}>
                    {isPasswordVisible ? (
                      <Image
                        source={require('../assets/cartoon-eyes.png')}
                        style={{width: 30, height: 30}}
                      />
                    ) : (
                      <Image
                        source={require('../assets/eyes.png')}
                        style={{width: 30, height: 30}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSignin}
                  disabled={isLoading}>
                  {isLoading ? (
                    <Text style={styles.loginButtonText}>Updating...</Text>
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>
                <Text>
                  If You have not account?{' '}
                  {/* <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterScreen")}
                > */}
                  <Text
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.loginLink}>
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'flex-start',
    height: 600,
  },
  loginButton: {
    backgroundColor: '#F8B50F',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: 'rgb(127,187,91)',
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 1,
    height: 43,
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  passwordInput: {
    flex: 1,
    color: 'black',
    fontWeight: 'normal',
  },
  passwordVisibilityIcon: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
  textContainer: {},
  heading: {
    fontSize: 26,
    color: '#39588f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    marginTop: 5,
    fontSize: 16.5,
    color: '#39588f',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    borderRadius: 7,
    alignItems: 'center',
  },
  lineContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#000', // You can change the color as needed
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10, // Adjust as needed
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 7,
    width: '100%',
  },
  input: {
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.75)',
    fontWeight: 'normal',
    width: '100%',
    height: 43,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 5,
    padding: 6,
    borderColor: 'grey',
  },
  button: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  loginLink: {
    fontWeight: 'bold',
    color: 'rgb(80,58,141)',
    textDecorationLine: 'underline',
  },
  inputFocused: {
    padding: 5,
    borderColor: '#F8B50F', // Change to the desired color for focused input fields
    borderWidth: 2, // Change to the desired border width for focused input fields
  },

  // Style for input fields with errors
  inputError: {
    padding: 5,
    borderColor: 'red', // Change to the desired color for input fields with errors
    borderWidth: 2, // Change to the desired border width for input fields with errors
  },
});

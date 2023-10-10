import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export const PasswordScreen = () => {
  const [async_Data, setasync_Data] = useState(null);
  // console.log('async_Data:', async_Data);

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('my_user');
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setasync_Data(parsedData);
      } else {
        console.log('No data found in storage');
      }
    } catch (error) {
      console.log('Error retrieving data from storage:', error);
    }
  };
  useEffect(() => {
    getDataFromStorage();
  }, []);

  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const correctPassword = async_Data?.password;

  const handleLogin = () => {
    if (password === correctPassword) {
      navigation.navigate('MyIdPass', {async_Data}); // Navigate to the protected page
    } else {
      alert('Incorrect password. Try again.'); // Show an error message
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter the password to access the protected page:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      
      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        <Text style={styles.signupButtonText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.Navbutton}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.ecgImg}
              source={require('../assets/todo.png')}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>To-Do</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Navbutton}
          onPress={() => navigation.navigate('PasswordScreen')}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.ecgImg}
              source={require('../assets/id1.png')}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>My Id Pass</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Navbutton}
          onPress={() => navigation.navigate('DailyRoutine')}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.ecgImg}
              source={require('../assets/daily.png')}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Daily Routine</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingLeft: 10,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(172,218,242,0.75)',
    height: 61,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  Navbutton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'relative',
    width: 100,
  },
  buttonText: {
    color: 'black',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ecgImg: {
    width: 40,
    height: 40,
  },
  signupButton: {
    backgroundColor: 'rgb(127,187,91)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 5,
  },
  signupButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

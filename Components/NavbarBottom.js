import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export const NavbarBottom = () => {
  const navigation = useNavigation();
 

  return (
    <View style={styles.bottomRow}>
      <TouchableOpacity
        style={styles.Navbutton}
        onPress={() => navigation.navigate('Home')}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.ecgImg}
            source={require('../assets/home.png')}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Navbutton}
        onPress={() => navigation.navigate('PasswordScreen')}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.ecgImg}
            source={require('../assets/home.png')}
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
            source={require('../assets/home.png')}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Daily Routine</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8B50F',
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
});

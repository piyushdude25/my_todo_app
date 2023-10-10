import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const StartRegister = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
      <View style={styles.MainContainer}>
        <View>
          {/* <Image
            source={require('../assets/mechnic.png')}
            style={styles.MechnicImage}
            resizeMode="contain"
            alt="Mechnic-image"
          /> */}
          <Text
            style={{
              fontSize: 60,
              textAlign: 'center',
              marginBottom: 5,
              color: 'green',fontWeight:'bold'
            }}>
            `Start Organizing Your Life`
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')}>
          <View>
            <Text style={styles.text5}>Register Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 5,
    width: '95%',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'rgba(224,95,156,0.85)',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    borderWidth: 1,
  },
  text5: {
    fontSize: 27,
    color: 'black',
  },
  ContinueBtn: {
    marginTop: 15,
  },
  MechnicImage: {
    width: 350,
    height: 400,
    margin: 'auto',
  },
});

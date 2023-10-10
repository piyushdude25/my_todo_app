import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NavbarBottom} from './NavbarBottom';

export const Home = () => {
  const navigation = useNavigation();
  const [async_Data, setasync_Data] = useState(null);
  console.log('async_Data1:', async_Data);
  const [myIdData, setmyIdData] = useState('');
  console.log('myIdData:', myIdData);

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('my_user');
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setasync_Data(parsedData);
        fetchMyIdData(parsedData?._id); 
      } else {
        console.log('No data found in storage');
      }
    } catch (error) {
      console.log('Error retrieving data from storage:', error);
    }
  };
  useEffect(() => {
    getDataFromStorage();
    // fetchMyIdData();
  }, []);

  const fetchMyIdData = userId => {
    if (userId) {
      axios
        .get(`https://myserver-ylrk.onrender.com/api/mytodo/get_user/${userId}`)
        .then(response => {
          return response.data;
        })
        .then(data => {
          setmyIdData(data);
        })
        .catch(error => {
          console.error('Failed to fetch customer data:', error);
        });
    }
  };

  const capitalizedWord = async_Data?.email
    ? async_Data.email.charAt(0).toUpperCase() + async_Data.email.slice(1)
    : '';

  const handleLogout = async () => {
    // Clear user data from local storage
    try {
      await AsyncStorage.removeItem('my_user');
      navigation.navigate('Login'); // Navigate to the RegisterScreen after logout
    } catch (error) {
      console.log('Error while logging out:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{flex: 1, resizeMode: 'cover'}}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        // refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text
              style={{
                fontSize: 25,
                // fontWeight: 'bold',
                color: 'black',
                // borderWidth: 1,
                width: 150,
              }}>
              Hello,
              {capitalizedWord ? capitalizedWord.split('@')[0] : 'ReLogin...'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // borderWidth: 1,
                width: 100,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => fetchMyIdData(myIdData?._id)}>
                <Image
                  source={require('../assets/reload.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 20}}
                // onPress={() => navigation.navigate('MyAccount')}
                onPress={handleLogout}>
                <Image
                  source={require('../assets/logout.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 3, marginTop: 50}}>
            <View style={styles.boxs2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ImpUrgent', {myIdData});
                }}>
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: 'rgba(243,165,191,0.75)',
                    padding: 15,
                    gap: 1,
                    marginRight: 5,
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 40, textAlign: 'center'}}>
                    {myIdData ? myIdData.imp_urgent.length : '--'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Important
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Urgent
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ImpNotUrgent', {myIdData});
                }}>
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: 'rgba(254,246,163,0.75)',
                    padding: 15,
                    gap: 1,
                    marginRight: 5,
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 40, textAlign: 'center'}}>
                    {myIdData ? myIdData.imp_not_urgent.length : '--'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Important
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Not Urgent
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* //////////////////////////////// */}

            <View style={styles.boxs2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NotImpUrgent', {myIdData});
                }}>
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: 'rgba(172,218,242,0.75)',
                    padding: 15,
                    gap: 1,
                    marginRight: 5,
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 40, textAlign: 'center'}}>
                    {myIdData ? myIdData.not_imp_urgent.length : '--'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Not Important
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Urgent
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NotImpNotUrgent', {myIdData});
                }}>
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: 'rgba(181,212,152,0.75)',
                    padding: 15,
                    gap: 1,
                    marginRight: 5,
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 40, textAlign: 'center'}}>
                    {myIdData ? myIdData.not_imp_not_urgent.length : '--'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Not Important
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Not Urgent
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* /////////////////////// */}
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={styles.Navbutton}
              onPress={() => navigation.navigate('Home')}>
              <View style={styles.buttonContent}>
                <Image
                  style={styles.ecgImg}
                  source={require('../assets/todo1.png')}
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
                  source={require('../assets/id.png')}
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
          {/* ///////////////// */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  boxs2: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 10,
    height: 120,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
  },
  icons: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 25,
  },

  Btncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(255,186,191)',
    backgroundColor: 'rgb(255,186,191)',
    height: 40,
    width: 130,
  },
  onDuty: {
    borderColor: 'green',
    backgroundColor: 'rgb(218,254,189)',
  },
  offDuty: {
    borderColor: 'red',
    backgroundColor: 'rgb(255,186,191)',
  },
  greensliderText: {
    color: 'rgb(83,151,22)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 9,
    marginLeft: 10,
  },
  redsliderText: {
    color: 'rgb(250,3,0)',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: 'rgba(226,230,153,0.75)',
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

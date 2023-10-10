import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const DailyRoutine = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState('');

  const [userData, setUserData] = useState([]);
  console.log('userData:', userData);

  const [async_Data, setasync_Data] = useState('');
  // console.log('async_Data:', async_Data);

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('my_user');
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setasync_Data(parsedData);
        fetchUserData(parsedData?._id);
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

  const handleSubmit = async () => {
    try {
      const data = {
        daily_routine: [{task: task}],
      };

      if (async_Data && async_Data._id) {
        const response = await axios.post(
          `https://myserver-ylrk.onrender.com/api/mytodo/daily_routine/${async_Data._id}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200) {
          // Update the userData state with the new data
          fetchUserData(async_Data._id); // Pass the user ID
        } else {
          throw new Error('Error: ' + response.status);
        }
      } else {
        console.error('async_Data or async_Data._id is missing1');
      }
    } catch (error) {
      console.error(error);
    }
    setTask('');
  };

  
  const fetchUserData = userId => {
    if (userId) {
      axios
        .get(`https://myserver-ylrk.onrender.com/api/mytodo/get_user/${userId}`)
        .then(response => {
          return response.data;
        })
        .then(data => {
          setUserData(data.daily_routine);
        })
        .catch(error => {
          console.error('Failed to fetch customer data:', error);
        });
    }
  };
  //   useEffect(() => {
  //     fetchUserData();
  //   }, []);

  const handleDelete = async taskId => {
    try {
      if (async_Data && async_Data._id) {
        const response = await axios.delete(
          `https://myserver-ylrk.onrender.com/api/mytodo/daily_routine/${async_Data._id}/delete/${taskId}`,
        );

        if (response.status === 200) {
          // Task deleted successfully, fetch updated user data
          fetchUserData();
        } else {
          console.error('Failed to delete task:', response.status);
        }
      } else {
        console.error('async_Data or async_Data._id is missing3');
      }
    } catch (error) {
      console.error('An error occurred while deleting task:', error);
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
           
          <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
            My Daily Routine Update:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Daily Routine"
            onChangeText={text => setTask(text)}
            value={task}
          />

          <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
            <Text style={styles.signupButtonText}>Submit</Text>
          </TouchableOpacity>

          <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
            My Data:
          </Text> 

          <View>
            {userData.map((item, index) => (
              <View key={item._id} style={styles.taskItem}>
                <View style={styles.taskNumberContainer}>
                  <Text style={styles.taskNumber}>Task {index + 1}.</Text>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Image
                      style={styles.cancelIcon}
                      source={require('../assets/cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{width: '100%', fontSize: 18, fontWeight: 'bold'}}>
                  {item.task}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* //////////////// */}
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
              source={require('../assets/daily1.png')}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Daily Routine</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* /////////////////// */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scrollViewContent: {
    // alignItems: 'flex-start',
    // height: '100%',
    // width: '90%',
  },
  taskItem: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  taskNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  taskNumber: {
    marginRight: 10,
  },
  cancelIcon: {
    width: 25,
    height: 25,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(84,193,90,0.75)',
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
  input: {
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.75)',
    fontWeight: 'normal',
    width: '100%',
    height: 43,
    borderWidth: 0.5,
    marginBottom: 5,
    borderRadius: 5,
    padding: 5,
    borderColor: 'grey',
  },
});

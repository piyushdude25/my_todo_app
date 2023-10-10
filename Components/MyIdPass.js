import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

export const MyIdPass = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const async_Data = route.params.async_Data;
  console.log('async_Data:xxx:', async_Data._id);

  const [name, setName] = useState('');
  const [myid, setMyId] = useState('');
  const [mypassword, setMyPassword] = useState('');
  const [message, setMessage] = useState('');

  const [userData, setUserData] = useState([]);
  console.log('userData:', userData);

  const handleSubmit = async () => {
    try {
      const data = {
        name: name,
        myid: myid,
        mypassword: mypassword,
      };
      if (async_Data && async_Data._id) {
        const response = await axios.post(
          `https://myserver-ylrk.onrender.com/api/mytodo/my_id_pass/${async_Data._id}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200) {
          // Update the userData state with the new data
          fetchUserData();
        } else {
          throw new Error('Error: ' + response.status);
        }
      } else {
        console.error('async_Data or async_Data._id is missing');
      }
    } catch (error) {
      console.error(error);
    }
    setName('');
    setMyId('');
    setMyPassword('');
  };

  const fetchUserData = async () => {
    try {
      if (async_Data && async_Data._id) {
        const response = await axios.get(
          `https://myserver-ylrk.onrender.com/api/mytodo/get_user/${async_Data._id}`,
        );

        if (response.status === 200) {
          const userData = response.data;
          setUserData(userData.persional_data);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } else {
        console.error('async_Data or async_Data._id is missing');
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async taskId => {
    // console.log(async_Data._id, taskId);
    try {
      if (async_Data && async_Data._id) {
        const response = await axios.delete(
          `https://myserver-ylrk.onrender.com/api/mytodo/my_id_pass/${async_Data._id}/delete/${taskId}`,
        );

        if (response.status === 200) {
          // Task deleted successfully, fetch updated user data
          fetchUserData();
        } else {
          console.error('Failed to delete task:', response.status);
        }
      } else {
        console.error('async_Data or async_Data._id is missing');
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
        <View>
          <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
            My ID Pass Update:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="My ID"
            onChangeText={text => setMyId(text)}
            value={myid}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setMyPassword(text)}
            value={mypassword}
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
                  <Text style={styles.taskNumber}>
                    {index + 1}. {item.name}
                  </Text>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Image
                      style={styles.cancelIcon}
                      source={require('../assets/cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{width: '100%', fontSize: 18, fontWeight: 'bold'}}>
                  <Text style={{fontSize: 16}}>ID:</Text> {item.myid}
                </Text>
                <Text style={{width: '100%', fontSize: 18, fontWeight: 'bold'}}>
                  <Text style={{fontSize: 16}}>Pass:</Text> {item.mypassword}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    </ImageBackground>
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
  taskItem: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(2,71,1)',
  },
  cancelIcon: {
    width: 25,
    height: 25,
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

import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StartContinue} from './Components/StartContinue';
import {StartRegister} from './Components/StartRegister';
import {Home} from './Components/Home';
import {Login} from './Components/Login';
import {Signup} from './Components/Signup';
import {ImpUrgent} from './Components/ImpUrgent';
import {NotFound} from './Components/NotFound';
import {MyIdPass} from './Components/MyIdPass';
import {PasswordScreen} from './Components/PasswordScreen';
import {ImpNotUrgent} from './Components/ImpNotUrgent';
import {NotImpUrgent} from './Components/NotImpUrgent';
import {NotImpNotUrgent} from './Components/NotImpNotUrgent';
import {DailyRoutine} from './Components/DailyRoutine';
import {NavbarBottom} from './Components/NavbarBottom';

const Stack = createNativeStackNavigator();
const App = () => {
  const [myIdData, setmyIdData] = useState('');
  console.log('myIdData........', myIdData);

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('my_user');
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setmyIdData(parsedData);
      }
    } catch (error) {
      console.log('Error retrieving data from storage:', error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  if (myIdData === undefined || '' || null) {
    return null;  
  }

  // const navigation = useNavigation();

  // function shouldShowNavbarBottom() {
  //   const visibleScreens = [
  //     'StartContinue',
  //     'StartRegister',
  //     'Login',
  //     'Signup',
  //   ];
  //   return visibleScreens.includes(navigation.getCurrentRoute().name);
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {myIdData ? (
          <Stack.Screen name="StartContinue" component={StartContinue} />
        ) : (
          <Stack.Screen name="StartRegister" component={StartRegister} />
        )}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="MyIdPass" component={MyIdPass} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen name="ImpUrgent" component={ImpUrgent} />
        <Stack.Screen name="ImpNotUrgent" component={ImpNotUrgent} />
        <Stack.Screen name="NotImpUrgent" component={NotImpUrgent} />
        <Stack.Screen name="NotImpNotUrgent" component={NotImpNotUrgent} />
        <Stack.Screen name="DailyRoutine" component={DailyRoutine} />
      </Stack.Navigator>
      {/* {shouldShowNavbarBottom() && <NavbarBottom />} */}
    </NavigationContainer>
  );
};

export default App;


// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './source/screens/HomeScreen';
import DetailsScreen from './source/screens/DetailsScreen';
import SplashScreen from './source/screens/Splash';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

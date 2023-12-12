import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/mainScreens/HomeScreen.js';
import WelcomeScreen from '../screens/mainScreens/WelcomeScreen.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import SignUpScreen from '../screens/authScreens/SignUpScreen.js';
import SuggestedSelections from '../screens/starterScreens/SuggestedSelections.js';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="SuggestedSelections" options={{headerShown: false}} component={SuggestedSelections} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
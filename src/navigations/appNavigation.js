import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/mainScreens/HomeScreen.js';
import WelcomeScreen from '../screens/mainScreens/WelcomeScreen.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import SignUpScreen from '../screens/authScreens/SignUpScreen.js';
import SuggestedSelections from '../screens/starterScreens/SuggestedSelections.js';
import ForgetPassword from '../screens/authScreens/ForgetPassword.js';
import CodeVerification from '../screens/authScreens/CodeVerification.js';
import ChangePassword from '../screens/authScreens/ChangePassword.js';
import PodProfile from '../screens/podcaster/PodProfile.js';
import Parent from './Parent.js';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="SuggestedSelections" options={{headerShown: false}} component={SuggestedSelections} />
        <Stack.Screen name="ForgetPassword" options={{headerShown: false}} component={ForgetPassword} />
        <Stack.Screen name="CodeVerification" options={{headerShown: false}} component={CodeVerification} />
        <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePassword} />
        <Stack.Screen name="PodProfile" options={{headerShown: false}} component={PodProfile} />
        <Stack.Screen name="Parent" options={{headerShown: false}} component={Parent} />
      </Stack.Navigator>
  )
}
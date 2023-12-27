import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CategoryPodcasts from '../screens/podcaster/CategoryPodcasts.js';
import PasswordVerification from '../screens/authScreens/PasswordVerification.js';
import YourVideos from '../screens/podcaster/YourVideos.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../components/Items/CustomLoader.js';
import { SetUserData } from '../redux/SelectedCategorySlice.js';
import UpdatePodProfile from '../screens/podcaster/UpdatePodProfile.js';
import UpdatePodCast from '../screens/podcaster/UpdatePodcast.js';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const dispatch = useDispatch();
  const [isUser, setUser] = useState(false)
  const podcastData = useSelector(state => state.selectedCategory)
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const data = await AsyncStorage.getItem('userData')
  //     const parseData = JSON.parse(data)
  //     dispatch(SetUserData(parseData))
  //     if (parseData.length !== 0) {
  //       setUser(true)
  //     } else {
  //       setUser(false)
  //     }
  //   }
  //   checkUser()
  // }, [])

  // if (!isUser) {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="Loader" options={{ headerShown: false }} component={CustomLoader} />
  //   </Stack.Navigator>
  //   )
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} /> 
      <Stack.Screen name="Parent" options={{ headerShown: false }} component={Parent} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
      <Stack.Screen name="SuggestedSelections" options={{ headerShown: false }} component={SuggestedSelections} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword} />
      <Stack.Screen name="CodeVerification" options={{ headerShown: false }} component={CodeVerification} />
      <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePassword} />
      <Stack.Screen name="PodProfile" options={{ headerShown: false }} component={PodProfile} />
      <Stack.Screen name="CategoryPodcasts" options={{ headerShown: false }} component={CategoryPodcasts} />
      <Stack.Screen name="PasswordVerifcationCode" options={{ headerShown: false }} component={PasswordVerification} />
      <Stack.Screen name="YourVideos" options={{ headerShown: false }} component={YourVideos} />
      <Stack.Screen name="UpdatePodProfile" options={{ headerShown: false }} component={UpdatePodProfile} />
      <Stack.Screen name="UpdatePodcast" options={{ headerShown: false }} component={UpdatePodCast} />

    </Stack.Navigator>
  )
}
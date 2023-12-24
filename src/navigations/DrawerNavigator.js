import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import Main from './Main';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import PodProfile from '../screens/podcaster/PodProfile';
import CreatePodCast from '../screens/podcaster/CreatePodCast';
import PodPosts from '../screens/podcaster/PodPosts';
import UpdatePodCast from '../screens/podcaster/UpdatePodcast';
import CreateShort from '../screens/podcaster/CreateShort';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="Profile"
        component={PodProfile}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Create Podcast"
        component={CreatePodCast}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="Update Podcast"
        component={UpdatePodCast}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="Upload Short"
        component={CreateShort}
        options={{headerShown: false}}
      />
        <Drawer.Screen
        name="Podcast"
        component={PodPosts}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
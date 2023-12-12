import {  Text, Platform,  View } from 'react-native';
import {HomeIcon, ClipboardIcon, ArrowTrendingUpIcon, FilmIcon } from 'react-native-heroicons/solid'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrendingPosts from '../podcaster/TrendingPosts';
import PodPost from '../podcaster/PodPosts';
import PodHome from '../podcaster/PodHome';
import PodSuggestions from '../podcaster/PodSuggestions';
import SuggestedSelections from '../starterScreens/SuggestedSelections';
import { useState } from 'react';

// Thanks for watching
const Tab =createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}
export default function HomeScreen() {
  const [active, setActive] = useState('PodHome')
  const indigo = '#5c6ac4'
  return (
       <Tab.Navigator initialRouteName='PodHome' screenOptions={screenOptions}>
          
          <Tab.Screen 
          name="PodHome" 
          component={PodHome} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View onTouchStart={() => {
                  setActive('PodHome')
                }} className='flex justify-center items-center'> 
                  {/* <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} /> */}
            <HomeIcon size="25" color={active === 'PodHome' ? indigo : 'black'} />

                  <Text className={`${active === 'PodHome' ? 'text-indigo' : 'text-black'}`}>Home</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="PodPost" 
          component={PodPost} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View onTouchStart={() => {
                  setActive('PodPost')
                }} className='flex justify-center items-center'> 
                  {/* <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} /> */}
            <ClipboardIcon size="25" color={active === 'PodPost' ? indigo : 'black'} />

                  <Text className={`${active === 'PodPost' ? 'text-indigo' : 'text-black'}`}>Episodes</Text>
            </View>
              )
            }
          }}
          />
           <Tab.Screen 
          name="SuggestionPosts" 
          component={PodSuggestions} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View onTouchStart={() => {
                  setActive('SuggestionPosts')
                }} className='flex justify-center items-center'> 
                 {/* <Entypo name="wallet" size={24} color={focused ? "#16247d": "#111"} /> */}
            <FilmIcon size="25" color={active === 'SuggestionPosts' ? indigo : 'black'} />
                  <Text className={`${active === 'SuggestionPosts' ? 'text-indigo' : 'text-black'}`}>Suggestions</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="TrendingPosts" 
          component={TrendingPosts} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View onTouchStart={() => {
                  setActive('TrendingPosts')
                }} className='flex justify-center items-center'> 
                 {/* <Entypo name="wallet" size={24} color={focused ? "#16247d": "#111"} /> */}
            <ArrowTrendingUpIcon size="25" color={active === 'TrendingPosts' ? indigo : 'black'} />
                  <Text className={`${active === 'TrendingPosts' ? 'text-indigo' : 'text-black'}`}>Trending</Text>
            </View>
              )
            }
          }}
          />
          
        
          {/* <Tab.Screen
           name="Prices" 
           component={Prices}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View className='flex justify-center items-center'> 
                 <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d": "#111"} />
                  <Text className={`${active === 'PodHome' ? 'text-indigo' : 'text-black'}`}>PRICES</Text>
            </View>
              )
            }
          }}
           /> */}
          {/* <Tab.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View className='flex justify-center items-center'> 
                 <Ionicons name="settings" size={24}  color={focused ? "#16247d": "#111"} />
                  <Text className={`${active === 'PodHome' ? 'text-indigo' : 'text-black'}`}>SETTINGS</Text>
            </View>
              )
            }
          }}
          /> */}
       </Tab.Navigator>
)
}
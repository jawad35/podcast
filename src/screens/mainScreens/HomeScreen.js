import { Text, Platform, View, Dimensions } from 'react-native';
import { HomeIcon, ClipboardIcon, ArrowTrendingUpIcon, FilmIcon } from 'react-native-heroicons/solid'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrendingPosts from '../podcaster/TrendingPosts';
import PodHome from '../podcaster/PodHome';
import PodSuggestions from '../podcaster/PodSuggestions';
import { useEffect, useState } from 'react';
import PodProfile from '../podcaster/PodProfile';
import LoginScreen from '../authScreens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePodCast from '../podcaster/CreatePodCast';
import PodCategories from '../podcaster/PodCategories';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import PodPosts from '../podcaster/PodPosts';
import CategoryPodcasts from '../podcaster/CategoryPodcasts';

// Thanks for watching
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#000"
  }
}
const Stack = createNativeStackNavigator()
const PodCastScreens = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name='PodcastHome' component={PodHome} />
      <Stack.Screen options={{headerShown:false}} name='CreatePodcast' component={CreatePodCast} />
      <Stack.Screen options={{headerShown:false}} name='Podcast' component={PodPosts} />
      <Stack.Screen options={{headerShown:false}} name='CategoryPodcasts' component={CategoryPodcasts} />
    </Stack.Navigator>
  )
}
export default function HomeScreen() {
  const [active, setActive] = useState('PodHome')
  const redish = '#F40000'

  return (
    <Tab.Navigator
      initialRouteName='PodHome' screenOptions={screenOptions}>
      <Tab.Screen
        name="PodHome"
        component={PodCastScreens}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View onTouchStart={() => {
                setActive('PodHome')
              }} className='flex justify-center items-center'>
                {/* <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} /> */}
                <HomeIcon size="25" color={active === 'PodHome' ? redish : 'black'} />

                <Text style={{fontSize:responsiveFontSize(1.5)}} className={`${active === 'PodHome' ? 'text-brown_darker' : 'text-black'}`}>Home</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="PodCategories"
        component={PodCategories}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View onTouchStart={() => {
                setActive('PodCategories')
              }} className='flex justify-center items-center'>
                {/* <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} /> */}
                <ClipboardIcon size="25" color={active === 'PodCategories' ? redish : 'black'} />
                <Text style={{fontSize:responsiveFontSize(1.5)}} className={`${active === 'PodCategories' ? 'text-brown_darker' : 'text-black'}`}>Categories</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="SuggestionPosts"
        component={PodSuggestions}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View onTouchStart={() => {
                setActive('SuggestionPosts')
              }} className='flex justify-center items-center'>
                {/* <Entypo name="wallet" size={24} color={focused ? "#16247d": "#111"} /> */}
                <FilmIcon size="25" color={active === 'SuggestionPosts' ? redish : 'black'} />
                <Text style={{fontSize:responsiveFontSize(1.5)}} className={`${active === 'SuggestionPosts' ? 'text-brown_darker' : 'text-black'}`}>Suggestions</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="TrendingPosts"
        component={TrendingPosts}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View onTouchStart={() => {
                setActive('TrendingPosts')
              }} className='flex justify-center items-center'>
                {/* <Entypo name="wallet" size={24} color={focused ? "#16247d": "#111"} /> */}
                <ArrowTrendingUpIcon size="25" color={active === 'TrendingPosts' ? redish : 'black'} />
                <Text style={{fontSize:responsiveFontSize(1.5)}} className={`${active === 'TrendingPosts' ? 'text-brown_darker' : 'text-black'}`}>Trending</Text>
              </View>
            )
          }
        }}
      />
      {/* <Tab.Screen
        name="PodCastScreens"
        component={PodCastScreens}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View onTouchStart={() => {
                setActive('TrendingPosts')
              }} className='flex justify-center items-center'>
                <ArrowTrendingUpIcon size="25" color={active === 'TrendingPosts' ? redish : 'black'} />
                <Text className={`${active === 'TrendingPosts' ? 'text-brown_darker' : 'text-black'}`}>Trending</Text>
              </View>
            )
          }
        }}
      /> */}


      {/* <Tab.Screen
           name="Prices" 
           component={Prices}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View className='flex justify-center items-center'> 
                 <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d": "#111"} />
                  <Text className={`${active === 'PodHome' ? '' : 'text-black'}`}>PRICES</Text>
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
                  <Text className={`${active === 'PodHome' ? '' : 'text-black'}`}>SETTINGS</Text>
            </View>
              )
            }
          }}
          /> */}
    </Tab.Navigator>
  )
}
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { setItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    // const navigation = useNavigation();

    const handleDone = ()=>{
        // navigation.navigate('Home');
        // setItem('onboarded', '1');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
        
    }
  return (
    <View style={styles.container}>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            // bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('./src/assets/images/fullStar.png')} autoPlay loop />
                        </View>
                    ),
                    title: 'Boost Productivity',
                    subtitle: 'Subscribe this channel to boost your productivity level',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('./src/assets/animations/work.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Work Seamlessly',
                    subtitle: 'Get your work done seamlessly without interruption',
                },
                {
                    backgroundColor: '#a78bfa',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('./src/assets/animations/achieve.json')}/>
                        </View>
                    ),
                    title: 'Achieve Higher Goals',
                    subtitle: 'By boosting your productivity we help you to achieve higher goals',
                },
            ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})



// import { NavigationContainer } from '@react-navigation/native';
// // import AppNavigation from './src/navigations/appNavigation';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import PodProfile from './src/screens/podcaster/PodProfile';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignUpScreen from './src/screens/authScreens/SignUpScreen';
// import LoginScreen from './src/screens/authScreens/LoginScreen';
// import WelcomeScreen from './src/screens/mainScreens/WelcomeScreen';

// const Stack = createNativeStackNavigator()

// const StackScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen options={{headerShown:false}} name='signup' component={PodProfile} />
//       <Stack.Screen options={{headerShown:false}} name='login' component={LoginScreen} />
//     </Stack.Navigator>
//   )
// }

// export default function App() {
//   const Tab = createBottomTabNavigator()
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//        <Tab.Screen options={{
//         tabBarStyle:{display:'none'},
//         headerShown:false
//         }} name='start' component={WelcomeScreen} />
//        <Tab.Screen name='home' component={StackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//     // <AppNavigation />
//   );
// }
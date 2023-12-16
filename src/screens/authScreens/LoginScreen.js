import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ShadowCardStyle } from '../../styles/showcard';
import Auth from '@react-native-firebase/auth'
// subscribe for more videos like this :)
export default function LoginScreen() {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const LoginUser = async () => {
        try {
            if (!email) {
                Alert.alert('Error', 'Email field is required!');
                return;
            }
            if (!password) {
                Alert.alert('Error', 'Password field is required!');
                return;
            }
            const signInMethods = await Auth().fetchSignInMethodsForEmail(email);
            if (signInMethods.length > 0) {
                // User exists
                Alert.alert('User Found', 'This email is associated with an existing account.');
            } else {
                // User does not exist
                const res = await Auth().signInWithEmailAndPassword(email, password)
                console.log(res, 'user')
                // Alert.alert('User Not Found', 'No user found with this email address.');
            }
        } catch (error) {
            // Handle specific error cases
            console.error('Error checking user existence:', error.code);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
                Alert.alert('Invalid Credentials', 'Please check your email and password.');
            } else {
                console.error('Error checking user existence:', error.code);
                Alert.alert('Error', 'An error occurred while checking user existence.');
            }
        }
    }

    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='text-white_color text-xl font-bold'>
                        Login to Your Account
                    </Text>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize='none'
                            placeholder='Email'
                        />
                    </View>
                    <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize='none'
                            placeholder='Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => LoginUser()}>
                        <Text className='text-right text-white_color'>Forgot Password?</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-4 bg-brown_darker rounded-md"
                        onPress={() => LoginUser()}
                    >
                        <Text className="text-lg font-bold text-center text-white_color">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-white_color text-xl font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 rounded-2xl">
                        <View style={[styles.card, styles.elevation]}>
                            <Image source={require('../../assets/icons/google.png')}
                                className="w-10 h-10" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-2xl">
                        <View style={[styles.card, styles.elevation]}>
                            <Image source={require('../../assets/icons/facebook.png')}
                                className="w-10 h-10" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="font-semibold text-white_color">Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-brown_darker"> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10
    },
    elevation: {
        elevation: 3,
        shadowColor: '#52006A',
    },
});
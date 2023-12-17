import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import Auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { ShadowCardStyle } from '../../styles/showcard';
// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [imageLocalPath, setImageLocalPath] = useState('')
    const SignUpUser = async () => {
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
                const userCredential = await Auth().createUserWithEmailAndPassword(email, password);
                await firestore().collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    username: name,
                    followers: [],
                    imageurl: null
                });
                Alert.alert('User Created', 'User created with this email address successfully.');
            }
        } catch (error) {
            console.error('Error checking user existence:', error.message);

            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('User Existence', 'The email address is already in use by another account');
            } else {
                console.error('Error checking user existence:', error.code);
                Alert.alert('Error', 'An error occurred while checking user existence.');
            }
        }
    }


   
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6) }} className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='text-xl text-white_color font-bold'>
                        Create your Account
                    </Text>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={name}
                            onChangeText={(name) => setName(name)}
                            autoCapitalize='none'
                            placeholder='Name'
                        />
                    </View>

                    <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
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
                    {/* <View className='flex-1 justify-center items-center'>
                        {imageLocalPath && <Image className='rounded-lg'  source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
                        <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                            <CustomButtons title={'Upload'} color={'white_color'} onClick={() => openImagePicker()} />
                        </View>
                    </View> */}

                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 bg-brown_darker rounded-md"
                        onPress={() => SignUpUser()}
                    >
                        <Text className="text-lg font-bold text-center text-white_color">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-white_color text-xl font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 rounded-2xl">
                        <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                            <Image source={require('../../assets/icons/google.png')}
                                className="w-10 h-10" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-2xl">
                        <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                            <Image source={require('../../assets/icons/facebook.png')}
                                className="w-10 h-10" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="font-semibold text-white_color">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-brown_darker"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

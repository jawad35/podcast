import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ShadowCardStyle } from '../../styles/showcard';
import CustomButtons from '../../components/Items/CustomButtons';
import { ApiUrl } from '../../constants/globalUrl';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignInButton from '../../components/socialLoginButtons/GoogleSignInButton';
import FacebookSignInButton from '../../components/socialLoginButtons/FacebookSignInButton';
import { LoginController } from '../../components/Controllers/LoginController';



export default function LoginScreen() {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const scatgegory = useSelector(state => state.userData)
    const LoginUser =  () => {
       LoginController(email, password, navigation, false, dispatch)
    };

    return (
        <ScrollView className="flex-1 bg-black" contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6) }}>
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
                    <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize='none'
                            placeholder='Email'
                        />
                    </View>
                    <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]} className='bg-white_color'>
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize='none'
                            placeholder='Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text className='text-right text-white_color'>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: responsiveHeight(3) }}>
                        <CustomButtons title={'Login'} textColor={'white_color'} color={'brown_darker'} onClick={() => LoginUser()} />
                    </View>
                </View>
                <Text className="text-white_color text-xl font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <GoogleSignInButton/>
                    {/* <FacebookSignInButton/> */}
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
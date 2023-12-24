import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ApiUrl } from '../../constants/globalUrl';

// subscribe for more videos like this :)
export default function CodeVerification({route}) {
    const { userData } = route.params
    console.log(userData.user._id)
    const navigation = useNavigation();
    const [code, setCode] = useState('')
    const VerifyCode = async () => {
        try {
            const data = {
                otp:code,
                userid:userData?.user?._id
            }
            console.log(data)
            const response = await ApiUrl.post(`/api/user/verify-email`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Upload response:', response.data);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!');
            console.error('Upload error:', error);
        }
    };
    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <View style={{ marginTop: responsiveHeight(10) }} className="flex-row justify-center">
                  <PodCastTitleLogo/>
                </View>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Verification</Text>
                    <Text className='mt-6 text-lg font-semibold text-white_color'>
                        {/* We sent you a code on that email which your provided
                        for password recovery.{'\n'}
                         */}
                        Please enter the verification code.
                    </Text>
                    <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={code}
                            onChangeText={(code) => setCode(code)}
                            placeholder='Enter Code'
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 bg-red_darker rounded-md"
                    >
                        <Text onPress={() => VerifyCode()} className="text-lg font-bold text-center text-white_color">
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

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
export default function PasswordVerification({ route }) {
    const { otp, id } = route.params
    const navigation = useNavigation();
    const [code, setCode] = useState('')
    const VerifyCode = async () => {
        if (code === otp) {
            navigation.navigate('ChangePassword', { userid: id })

        } else {
            Alert.alert("Error", "Please Enter a valid code")
        }
    };
    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <View className="flex-row justify-center">
                    <PodCastTitleLogo />
                </View>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Verification</Text>
                    <Text className='mt-6 text-lg font-semibold text-white_color'>
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

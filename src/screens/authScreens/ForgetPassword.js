import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';

// subscribe for more videos like this :)
export default function ForgetPassword() {
    const navigation = useNavigation();
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
                        Don't worry.{'\n'}
                        Enter your email and we will send you a verification
                        code to reset your password
                    </Text>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value="john@gmail.com"
                            placeholder='Enter Name'
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 bg-red_darker rounded-md"
                    >
                        <Text onPress={() => navigation.navigate('CodeVerification')} className="text-lg font-bold text-center text-white_color">
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

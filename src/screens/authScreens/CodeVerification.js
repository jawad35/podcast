import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';

// subscribe for more videos like this :)
export default function CodeVerification() {
    const navigation = useNavigation();
    return (
        <ScrollView className="flex-1 bg-white_color">
            <SafeAreaView className="flex">
                <View style={{ marginTop: responsiveHeight(10) }} className="flex-row justify-center">
                    <Text>
                        <Text className='text-blue text-4xl font-extrabold'>PodCast</Text> <Text className='text-indigo text-2xl font-extrabold shadow-xl'>Tonight</Text>
                    </Text>
                </View>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center'>Verification</Text>
                    <Text className='mt-6 text-lg font-semibold'>
                        {/* We sent you a code on that email which your provided
                        for password recovery.{'\n'}
                         */}
                        Please enter the verification code.
                    </Text>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value="36298"
                            placeholder='Enter Name'
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 bg-blue rounded-md"
                    >
                        <Text onPress={() => navigation.navigate('ChangePassword')} className="text-lg font-bold text-center text-white_color">
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

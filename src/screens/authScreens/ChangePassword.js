import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';

// subscribe for more videos like this :)
export default function ChangePassword() {
    const navigation = useNavigation();
    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo/>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Reset Password</Text>
                    <Text className='mt-6 text-lg font-semibold text-white_color'>
                        {/* We sent you a code on that email which your provided
                        for password recovery.{'\n'}
                         */}
                        Create your new password.
                    </Text>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            // value="12347899"
                            secureTextEntry
                            placeholder='Password'
                        />
                    </View>
                    <View className='mt-7' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            // value="12347899"
                            secureTextEntry
                            placeholder='New password'
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 bg-brown_darker rounded-md"
                    >
                        <Text onPress={() => navigation.navigate('Parent')} className="text-lg font-bold text-center text-white_color">
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

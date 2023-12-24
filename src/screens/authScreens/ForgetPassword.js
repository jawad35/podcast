import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ApiUrl } from '../../constants/globalUrl';
import CustomButtons from '../../components/Items/CustomButtons';
import { useNavigation } from '@react-navigation/native';

// subscribe for more videos like this :)
export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const navigation = useNavigation();
    
    const ForgetPassword = async () => {
        try {
            const data = {email:email}
            const response = await ApiUrl.post(`/api/user/forget-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.data.success){
            Alert.alert('Error', response.data.error);
            }
            if (response.data.success){
                Alert.alert('Reset Password', response.data.message);
                }
            console.log('Upload response:', response.data);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!');
            console.error('Upload error:', error);
        }
    };

    // const navigation = useNavigation();
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
                    <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Enter Email'
                        />
                    </View>
                    <View style={{ marginTop: responsiveHeight(3) }}>
                        <CustomButtons title={'Send'} textColor={'white_color'} color={'brown_darker'} onClick={() => navigation.navigate('Parent')} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

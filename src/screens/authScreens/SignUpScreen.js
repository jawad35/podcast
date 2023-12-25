import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ShadowCardStyle } from '../../styles/showcard';
import CustomButtons from '../../components/Items/CustomButtons';
import { launchImageLibrary } from 'react-native-image-picker';
import uuidv4 from 'react-native-uuid';
import { ApiUrl } from '../../constants/globalUrl';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [imageLocalPath, setImageLocalPath] = useState('')
    // const windowHeight = Dimensions.get('window').height;

    const SignUpUser = async () => {

        try {
            if (!fullname) {
                Alert.alert('Error', 'Fullname field is required!');
                return;
            }
            if (!email) {
                Alert.alert('Error', 'Email field is required!');
                return;
            }
            if (!password) {
                Alert.alert('Error', 'Password field is required!');
                return;
            }
            if (!profileImage) {
                Alert.alert('Error', 'Profile image is required!');
                return;
            }
            const formData = new FormData();
            // Append the selected image to FormData
            formData.append('avatar', {
                uri: profileImage.uri,
                type: profileImage.type,
                name: profileImage.fileName || 'image.jpg',
            });

            const randomId = uuidv4.v4()
            formData.append('fullname', fullname)
            formData.append('password', password)
            formData.append('email', email)

            const response = await ApiUrl.post(`/api/user/create`, formData, {
                params: { randomId: randomId },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                const userData = response.data;
                navigation.navigate('CodeVerification', { userData })
                Alert.alert('Verification', 'Verification code Email sent successfully!');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!');

        }
    }
    const openProfilePicker = () => {
        launchImageLibrary({}, (response) => {
            if (!response.didCancel) {
                setProfileImage(response.assets[0])
                setImageLocalPath(response.assets[0].uri)
            }
        });
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6) }} className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>

            <View className="form m-6">
                <Text className='text-xl text-white_color font-bold'>
                    Create your Account
                </Text>
                <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                    <TextInput
                        value={fullname}
                        onChangeText={(fullname) => setFullname(fullname)}
                        autoCapitalize='none'
                        placeholder='Fullname'
                    />
                </View>

                <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]} className='bg-white_color'>
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
                <View className='flex-1 justify-center items-center'>
                    {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
                    <CustomButtons title={'Profile Image'} color={'white_color'} onClick={() => openProfilePicker()} />
                </View>
                <View className={`mt-8`}>
                    <CustomButtons title={'Sign Up'} textColor={'white_color'} color={'brown_darker'} onClick={() => SignUpUser()} />
                </View>
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
                <Text className="font-semibold text-white_color">Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text className="font-semibold text-brown_darker"> Login</Text>
                </TouchableOpacity>
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
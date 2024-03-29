import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// subscribe for more videos like this :)
export default function SignUpScreen() {
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
                    <Text className='text-xl font-bold'>
                        Login to Your Account
                    </Text>
                    <View className='mt-7' style={[styles.card, styles.elevation]}>
                        <TextInput
                            value="john@gmail.com"
                            placeholder='Enter Name'
                        />
                    </View>
                    <View style={[styles.card, styles.elevation]}>
                        <TextInput
                            value="john@gmail.com"
                            placeholder='Enter Name'
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity>
                      <Text className='text-right'>Forgot Password?</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-4 bg-blue rounded-md"
                    >
                        <Text className="text-lg font-bold text-center text-white_color">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-xl font-bold text-center py-5">
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
                            <Image source={require('../../assets/icons/apple.png')}
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
                    <Text className="font-semibold">Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-blue"> Sign Up</Text>
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
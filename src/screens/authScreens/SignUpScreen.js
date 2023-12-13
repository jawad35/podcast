import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6)}} className="flex-1 bg-black">
            <SafeAreaView className="flex">
              <PodCastTitleLogo/>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='text-xl text-white_color font-bold'>
                        Create your Account
                    </Text>
                    <View className='mt-7' style={[styles.card, styles.elevation]}>
                        <TextInput
                            className=""
                            value="john show"
                            placeholder='Enter Name'
                        />
                    </View>

                    <View style={[styles.card, styles.elevation]}>
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
                    {/* <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-4 bg-blue rounded-md"
                        onPress={() => navigation.navigate('SuggestedSelections')}
                    >
                        <Text className="text-lg font-bold text-center text-white_color">
                            Sign Up
                        </Text>
                    </TouchableOpacity> */}


                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-4 bg-brown_darker rounded-md"
                        onPress={() => navigation.navigate('SuggestedSelections')}
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
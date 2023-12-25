import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import UserProfile from '../../components/podcast/UserProfile'
import { ServerUrl } from '../../constants/globalUrl'

const PodProfile = () => {
  const podcastData = useSelector(state => state.selectedCategory)
  return (
    <SafeAreaView className='bg-black h-full'>
      <HeaderTitle icon={true} title={'Profile'} />
      <Text className='text-3xl text-white_color font-bold text-center mt-20'>{podcastData.user.fullname.toUpperCase()}</Text>
      <View className='flex justify-center items-center mt-9'>
        <Image source={{ uri: `http://${ServerUrl}/uploads/${podcastData.user.avatar}` }}
          style={{ height: responsiveHeight(25), width: responsiveWidth(50) }}
          resizeMode='cover'
          className='rounded-full'
        />
      </View>
      <Text className='text-white_color text-center text-lg font-semibold mt-4'>
        {podcastData.user.email}
      </Text>
      {/* <TouchableOpacity
                        style={{ marginTop: responsiveHeight(3) }}
                        className="py-3 mx-5 bg-brown_darker rounded-md"
                    >
                        <Text onPress={() => navigation.navigate('CreatePodcast')} className="text-lg font-bold text-center text-white_color">
                            Update
                        </Text>
                    </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default PodProfile
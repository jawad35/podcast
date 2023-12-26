import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import CustomShadow from '../../components/Items/CustomShadow'
import CustomButtons from '../../components/Items/CustomButtons'
import { ServerUrl } from '../../constants/globalUrl'


const PodProfile = () => {
  const podcastData = useSelector(state => state.selectedCategory)
  const navigation = useNavigation()
  return (
    <SafeAreaView className='bg-black h-full'>
      <ScrollView>
      <HeaderTitle icon={true} title={'Profile'} />
      <Text className='text-3xl text-white_color font-bold text-center mt-20'>{podcastData.user.fullname.toUpperCase()}</Text>
      <View className='flex justify-center items-center mt-9'>
        <Image source={{ uri: `http://${ServerUrl}/uploads/${podcastData.user.avatar}`}}
          style={{ height: responsiveHeight(25), width: responsiveWidth(50) }}
          resizeMode='cover'
          className='rounded-full'
        />
      </View>
        <Text className='text-white_color text-center text-lg font-semibold mt-4'>
        {podcastData.user.email}
        </Text>
          <View className='m-3 mt-7'>
          <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Update Profile'} onClick={() => navigation.navigate("UpdatePodProfile")} />
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PodProfile
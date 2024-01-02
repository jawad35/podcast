import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import CustomShadow from '../../components/Items/CustomShadow'
import CustomButtons from '../../components/Items/CustomButtons'
import { ApiUrl, ServerUrl } from '../../constants/globalUrl'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import podProfileStyles from '../../styles/podProfileStyle'

const PodProfile = () => {
  const podcastData = useSelector(state => state.userData)
  const navigation = useNavigation()
  const [isFollow, setIsFollow] = useState(false)
  const [isData, setIsData] = useState({})


  const FollowUser = async () => {
    try {
      const postData = {
        id:'6592fbce0d485139b0c4ef14',
        userid:'6591b6ad3670f81a483e0817',
        oname:'wajid ali',
        uname:'jawad ali',
        uemail:'j',
        oemail:'w'
      }
      const response = await ApiUrl.post(`/api/user/follow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(true)
        setIsData(response.data)
        Alert.alert("Success", response.data.message)
      } else {
        Alert.alert("Error", response.data.message)
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }
  const UnFollowUser = async () => {
    try {
      const postData = {
        id:'65893f8ab02d832dc079d5c4',
        userid:'6591b6ad3670f81a483e0817'
      }
      const response = await ApiUrl.post(`/api/user/unfollow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(false)
        setIsData(response.data)
        console.log(response.data)
        Alert.alert("Success", response.data.message)
      } else {
        Alert.alert("Error", response.data.message)
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }
  console.log(isData, 'daya')
  return (
    <SafeAreaView className='bg-black flex-1'>
      <HeaderTitle icon={true} title={'Profile'} />
      <ScrollView className='mx-2'>
      <Text className={`text-white_color text-center`} style={{marginTop:moderateVerticalScale(20)}}>{podcastData.user.fullname?.toUpperCase()}</Text>
      <View style={podProfileStyles.profileImageWrapper} className='flex justify-center items-center'>
        <Image source={{ uri: `http://${ServerUrl}/uploads/${podcastData.user.avatar}`}}
          style={podProfileStyles.profileImage}
          resizeMode='cover'
          className='rounded-full'
        />
      </View>
        <Text style={podProfileStyles.emailText}>
        {podcastData.user.email}
        </Text>
        <View style={{display:'flex', justifyContent:'space-around', flexDirection:'row', alignContent:'space-around', marginTop:scale(20)}}>
            <TouchableOpacity style={podProfileStyles.FollowBtn} onPress={isFollow ? UnFollowUser : FollowUser}>
              <Text className='font-semibold'>
                {isFollow ? 'Unfollow' : "Follow"}
              </Text>
              </TouchableOpacity> 
        </View>
        <View style={{display:'flex', justifyContent:'space-around', flexDirection:'row', alignContent:'space-around', marginTop:scale(20), marginHorizontal:scale(40)}}>
           <Text className='text-white_color'>Followers : {isData.followers}</Text>
           <Text className='text-white_color'>Following : {isData.following}</Text>
        </View>
        <View style={podProfileStyles.line}></View>
          {/* <View style={podProfileStyles.bottomView}>
          <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Update Profile'} onClick={() => navigation.navigate("UpdatePodProfile")} />
          </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PodProfile
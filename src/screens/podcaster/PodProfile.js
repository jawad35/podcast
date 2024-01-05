import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { ApiUrl, ServerUrl } from '../../constants/globalUrl'
import { scale, moderateVerticalScale } from 'react-native-size-matters';
import podProfileStyles from '../../styles/podProfileStyle'
import { PencilSquareIcon } from 'react-native-heroicons/solid';
import { CheckIsFollowed } from '../../components/Helper/CheckIsFollowed';
import { defaultProfile } from '../../utils/Constants';

const PodProfile = ({route}) => {
  const podcastData = useSelector(state => state.userData)
  const navigation = useNavigation()
  const [isFollow, setIsFollow] = useState(false)
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [UserData, SetUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const GetUser = async() => {
    const response = await ApiUrl.post(`/api/user/getuser`, {userid:route?.params?.userid } ,{
      headers: {
          'Content-Type': 'application/json',
      }
  });
    if(response.data.success) {
      SetUserData(response.data?.user)
      const isExist = CheckIsFollowed(response.data?.user?.followers, podcastData?.user?.email)
      if (isExist) {
        setIsFollow(true)
      } else {
        setIsFollow(false)
      }
      setFollowing(response.data.user?.following?.length)
      setFollowers(response.data.user?.followers?.length)
    }
  }

  useEffect(() => {
    GetUser()
  }, [route?.params?.userid, podcastData])
  const FollowUser = async () => {
    try {
      setIsLoading(true)
      const postData = {
        id:podcastData.user._id,
        userid:route?.params?.userid,
        oname:UserData.fullname,
        uname:podcastData?.user?.fullname,
        uemail:podcastData?.user?.email,
        oemail:UserData.email
      }
      const response = await ApiUrl.post(`/api/user/follow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(true)
      setIsLoading(false)
        setFollowers(response.data.followers)
        // setRefresh('1')

      } 
    } catch (error) {
      setIsLoading(false)
      Alert.alert("Error", response.data.message)
    }
  }
  const UnFollowUser = async () => {
    try {
      setIsLoading(true)
      const postData = {
        id:podcastData.user._id,
        userid:route?.params?.userid
      }
      const response = await ApiUrl.post(`/api/user/unfollow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(false)
      setIsLoading(false)

        setFollowers(response.data.followers)
        // setFollowing(response.data.following)
        // setRefresh('2')
      }
    } catch (error) {
      setIsLoading(false)

      // Alert.alert("Error", error)
      console.log(err)
    }
  }
  return (
    <SafeAreaView className='bg-black flex-1'>
      <HeaderTitle icon={true} title={'Profile'} />
      <ScrollView className='mx-2'>
        {
          podcastData?.user._id === route?.params?.userid && <View className='flex items-end' style={{margin:scale(20)}}>
            <PencilSquareIcon onPress={() => navigation.navigate("UpdatePodProfile")} size={scale(25)} color={'white'}  />
          </View>
        }
      <Text className={`text-white_color text-center`} style={{marginTop:moderateVerticalScale(20)}}>{UserData?.fullname?.toUpperCase()}</Text>
      <View style={podProfileStyles.profileImageWrapper} className='flex justify-center items-center'>
        <Image source={{ uri: UserData?.avatar ? `${UserData?.avatar}` : defaultProfile}}
          style={podProfileStyles.profileImage}
          resizeMode='cover'
          className='rounded-full'
        />
      </View>
        <Text style={podProfileStyles.emailText}>
        {UserData?.email}
        </Text>

        {
          podcastData?.user?._id !== route?.params?.userid && <View style={{display:'flex', justifyContent:'space-around', flexDirection:'row', alignContent:'space-around', marginTop:scale(20)}}>
          <TouchableOpacity disabled={isLoading} style={podProfileStyles.FollowBtn} onPress={isFollow ? UnFollowUser : FollowUser}>
            <Text className='font-semibold text-black'>
              {isFollow ? isLoading ? 'Unfollowing...' : 'Unfollow' : isLoading ? 'Following...' : 'Follow'}
            </Text>
            </TouchableOpacity> 
      </View>
        }
        
        <View style={{display:'flex', justifyContent:'space-around', flexDirection:'row', alignContent:'space-around', marginTop:scale(20), marginHorizontal:scale(40)}}>
           <Text className='text-white_color'>Followers : {followers}</Text>
           <Text className='text-white_color'>Following : {following}</Text>
        </View>
        <View style={podProfileStyles.line}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PodProfile
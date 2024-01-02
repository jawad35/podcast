import { View, SafeAreaView, TextInput, Alert, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ApiUrl, ServerUrl } from '../../constants/globalUrl'
import CustomButtons from '../../components/Items/CustomButtons'
import uuidv4 from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker'
import { ShadowCardStyle } from '../../styles/showcard'
import { SetUserData } from '../../redux/PodcastUsers'


const UpdatePodProfile = () => {
  const podcastData = useSelector(state => state.userData)
  const [image, setImage] = useState(``)
  const [fullname, setFullname] = useState(podcastData.user.fullname)
  const [imageLocalPath, setImageLocalPath] = useState(`http://${ServerUrl}/uploads/${podcastData.user.avatar}`)
  const dispatch = useDispatch()

  const openImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0])
        setImageLocalPath(response.assets[0].uri)
      }
    });
  };

  const handleUpdatePodcastImage = async (fileName) => {
    try {
      const formData = new FormData();
      // Append the selected image to FormData
      formData.append('avatar', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      formData.append('oldimage', podcastData.user.avatar)
      formData.append('userid', podcastData.user._id)
      const randomId = uuidv4.v4()
      const response = await ApiUrl.post(`/api/user/profile-image-update`, formData, {
        params: { randomId: randomId },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        dispatch(SetUserData(response.data.user))
        Alert.alert("Success", response.data.message)
      } else {
        Alert.alert("Error", response.data.message)
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleUpdatePodcastFullname = async () => {
    try {
      const data = {fullname, userid:podcastData.user._id}
      const response = await ApiUrl.post(`/api/user/profile-fullname-update`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        dispatch(SetUserData(response.data.user))
        Alert.alert("Success", response.data.message)
      } else {
        Alert.alert("Error", response.data.message)
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  return (
    <SafeAreaView className='bg-black flex-1'>
      <HeaderTitle icon={true} title={'Update Profile'} />
      <ScrollView className='mx-4'>
        <Text className='text-3xl text-white_color font-bold text-center mt-20'>{fullname?.toUpperCase()}</Text>
        <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
          <TextInput
            placeholder="Full name"
            value={fullname}
            onChangeText={(name) => setFullname(name)}
          />
        </View>
          <View >
            <CustomButtons textColor={'white_color'} color={'brown_darker'} title={"Update Fullname"} onClick={handleUpdatePodcastFullname} />
          </View>
        <View className='flex justify-center items-center mt-9'>
          <Image source={{ uri: imageLocalPath }}
            style={{ height: responsiveHeight(25), width: responsiveWidth(50) }}
            resizeMode='cover'
            className='rounded-full'
          />
        </View>
         <View className='my-10'>
         <View>
            <CustomButtons title={"New Image"} onClick={openImagePicker} />
          </View>
        {
          image && 
          <View>
            <CustomButtons textColor={'white_color'} color={'brown_darker'} title={"Update Image"} onClick={handleUpdatePodcastImage} />
          </View>
        }
         </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UpdatePodProfile
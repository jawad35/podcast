import { View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ShadowCardStyle } from '../../styles/showcard';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SignUpController } from '../Controllers/SignUpController';
import { LoginController } from '../Controllers/LoginController';
import { SetOverlay, SetUserData } from '../../redux/PodcastUsers';

const GoogleSignInButton = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "614368503988-e1ehghb2klmjoshk3covrmdbibinttcf.apps.googleusercontent.com"
    })
  }, [])
  const signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user
      dispatch(SetOverlay(true))
      const res = await SignUpController(user.name, user.email, userInfo.idToken, '1', user.photo, navigation, true, setIsLoading, dispatch)
      if (res.isExist) {
        await LoginController(user.email, userInfo.idToken, navigation, true, dispatch, setIsLoading)
        return dispatch(SetOverlay(false))
      }
      
      // dispatch(SetOverlay(false))
    } catch (error) {
      dispatch(SetOverlay(false))
    }
  };
  return (
    <TouchableOpacity onPress={signIn} className="p-2 rounded-2xl">
      <View className='bg-white_color py-1 px-2' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
        <Image source={require('../../assets/icons/google.png')}
          className="w-10 h-10" />
      </View>
    </TouchableOpacity>
  )
}

export default GoogleSignInButton
import { View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ShadowCardStyle } from '../../styles/showcard';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SignUpController } from '../Controllers/SignUpController';
import { LoginController } from '../Controllers/LoginController';

const GoogleSignInButton = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
        webClientId:"614368503988-e1ehghb2klmjoshk3covrmdbibinttcf.apps.googleusercontent.com"
    })
}, [])
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user
      const res = await SignUpController(user.name, user.email, userInfo.idToken, user.photo, navigation, true)
      if (res.isExist) {
        await LoginController(user.email, userInfo.idToken, navigation, true, dispatch)
      } else {
        if(res.success) {
          navigation.navigate('Parent')
        }
      }
    } catch (error) {
     
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
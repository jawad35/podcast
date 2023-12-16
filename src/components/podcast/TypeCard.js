import { View, Text, Image } from 'react-native'
import React from 'react'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
const TypeCard = ({title, image}) => {
  return (
    <View className=''>
      <Text className='font-bold text-3xl py-4 text-white_color'>
              {title}
            </Text>
           <View className='flex justify-center items-center'>
           <Image source={image} 
              style={{height: responsiveHeight(40), width:'100%'}}
              resizeMode='cover'
              className='rounded-lg mb-9'
              />
           </View>
    </View>
  )
}

export default TypeCard
import { View, Text, Image } from 'react-native'
import React from 'react'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
const TypeCard = ({title, image}) => {
  return (
    <View className=''>
      <Text className='font-bold text-xl py-2'>
              {title}
            </Text>
           <View className='flex justify-center items-center'>
           <Image source={image} 
              style={{height: responsiveHeight(30), width:'100%'}}
              resizeMode='cover'
              className='rounded-lg'
              />
           </View>
    </View>
  )
}

export default TypeCard
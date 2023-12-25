import { View, Text, Image } from 'react-native'
import React from 'react'
import {responsiveHeight } from 'react-native-responsive-dimensions'
import CustomButtons from '../Items/CustomButtons'
const TypeCard = ({title, image, onClick}) => {
  return (
    <View>
      <Text className='font-bold text-3xl py-4 text-white_color'>
              {title}
            </Text>
           <View className='flex justify-center items-center'>
           <Image source={image} 
              style={{height: responsiveHeight(40), width:'100%'}}
              resizeMode='cover'
              className='rounded-lg mb-9'
              />
              {/* <CustomButtons color={'brown_darker'} textColor={'white_color'} title={'Open'} onClick={onClick}/> */}
           </View>
    </View>
  )
}

export default TypeCard
import { View, Text } from 'react-native'
import React from 'react'

const HeaderTitle = ({title}) => {
  return (
    <View className='bg-blue'>
      <Text className='text-xl text-center m-2 text-white_color font-semibold'>{title}</Text>
      </View>
  )
}

export default HeaderTitle
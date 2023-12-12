import { View, Text } from 'react-native'
import React from 'react'

const NicheItem = (item) => {
  return (
    <View className='m-2'>
      <Text className={`${item['item'].value === false ? 'text-black':'text-white_color'} font-medium text-base`}>{item['item'].title}</Text>
    </View>
  )
}

export default NicheItem
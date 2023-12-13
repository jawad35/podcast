import { View, Text } from 'react-native'
import React from 'react'

const NicheItem = (item, category) => {
  return (
    <View className='m-2'>
      {
        category === false  ? <Text className={`${item['item'].value === false ? 'text-black':'text-white_color'} font-medium text-base`}>{item['item'].title}</Text> : <Text className={`text-black font-medium text-base`}>{item['item'].title}</Text>
      }
    </View>
  )
}

export default NicheItem
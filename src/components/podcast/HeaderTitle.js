import { View, Text } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

const HeaderTitle = ({title}) => {
  return (
    <View className='bg-white_color flex-row items-center'>
      <Text className='ml-2' >
        <ArrowLeftIcon  color={'black'}/>
      </Text>
      <Text className='flex-1 text-xl text-center m-2 text-black font-semibold'>{title}</Text>
      </View>
  )
}

export default HeaderTitle
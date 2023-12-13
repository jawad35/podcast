import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ShadowCardStyle } from '../../styles/showcard'

const CustomShadow = ({children}) => {
  return (
    <TouchableOpacity className="p-2 rounded-2xl">
                        <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                            {children}
                        </View>
                    </TouchableOpacity>
  )
}

export default CustomShadow
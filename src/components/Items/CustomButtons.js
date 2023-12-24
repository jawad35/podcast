import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'

const CustomButtons = ({ title, onClick, color, textColor }) => {
    return (
        <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]} className={`bg-${color ? color : 'white_color'}`}>
<TouchableOpacity
            // style={{ marginTop: responsiveHeight(3) }}
            className={`py-2 mx-2 bg-${color} rounded-md`}
        >
            <Text onPress={onClick} className={`text-lg font-bold text-center text-${textColor}`}>
                {title}
            </Text>
        </TouchableOpacity>
        </View>
        
    )
}

export default CustomButtons
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import customButtonsStyles from '../../styles/customButtonsStyle'

const CustomButtons = ({ title, onClick, color, textColor }) => {
    return (
        <View style={customButtonsStyles.buttonWrapper} className={`bg-${color ? color : 'white_color'}`}>
            <TouchableOpacity
                // style={{ marginTop: responsiveHeight(3) }}
                className={`bg-${color} rounded-md`}
            >
                <Text onPress={onClick} className={`text-center text-${textColor}`}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default CustomButtons
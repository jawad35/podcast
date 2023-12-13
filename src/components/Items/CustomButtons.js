import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const CustomButtons = ({ title, onClick, color, textColor }) => {
    return (
        <TouchableOpacity
            // style={{ marginTop: responsiveHeight(3) }}
            className={`py-3 mx-2 bg-${color} rounded-md`}
        >
            <Text onPress={onClick} className={`text-lg font-bold text-center text-${textColor}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButtons
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import customButtonsStyles from '../../styles/customButtonsStyle'

const CustomButtons = ({ title, onClick, color, textColor, disable, isLoading }) => {
    return (
        <View style={customButtonsStyles.buttonWrapper} className={`bg-${color ? color : 'white_color'}`}>
            <TouchableOpacity
                // style={{ marginTop: responsiveHeight(3) }}
                disabled={disable}
                className={`bg-${color} rounded-md`}
                onPress={onClick}
            >
                <Text  className={`text-center text-${textColor}`}>
                    {
                        isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : title
                    }
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default CustomButtons
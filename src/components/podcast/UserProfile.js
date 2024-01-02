import { Image } from 'react-native'
import React from 'react'
import { ServerUrl } from '../../constants/globalUrl'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const podcastData = useSelector(state => state.userData)
    return (
        <Image source={{ uri: `http://${ServerUrl}/uploads/${podcastData.user.avatar}` }}
            style={{ height: responsiveHeight(5.5), width: responsiveWidth(10.5) }}
            resizeMode='cover'
            className='rounded-full'
        />
    )
}

export default UserProfile
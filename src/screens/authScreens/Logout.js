import { View, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButtons from '../../components/Items/CustomButtons'
import { useDispatch } from 'react-redux'
import { SetUserData } from '../../redux/SelectedCategorySlice'
import { StackActions, useNavigation } from '@react-navigation/native'
import HeaderTitle from '../../components/podcast/HeaderTitle'
const Logout = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(SetUserData([]))
        navigation.dispatch(StackActions.popToTop())
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView className='flex-1'>
            <HeaderTitle icon={true} title={"Logout"} />
            <View className='flex-1 justify-center items-center mx-8'>
                <CustomButtons title={"Logout"} onClick={handleLogout} />
            </View>
        </SafeAreaView>

    )
}

export default Logout
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Switch } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { ApiUrl } from '../../constants/globalUrl';
import { SetUserData } from '../../redux/PodcastUsers';
import { scale } from 'react-native-size-matters';

const CustomDrawerContent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const podcastData = useSelector(state => state.userData)
    const [isEnabled, setIsEnabled] = useState(false);
    const dispatch = useDispatch()
    const handleUpdateUserRole = async (fileName) => {

        try {
            setIsLoading(true)
            const formData = { role: podcastData?.user?.role === '1' ? "2" : "1", userid: podcastData?.user?._id }
            const response = await ApiUrl.post(`/api/user/update-role`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setIsLoading(false)
                setIsEnabled((previousState) => !previousState);
                dispatch(SetUserData(response?.data?.user))
            } else {
                setIsLoading(false)

                Alert.alert("Error", "Something went wrong!")
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Upload error:', error);
        }
    };
    useEffect(() => {
        setIsEnabled(podcastData?.user?.role === '1')
    }, [])
    return (
        <DrawerContentScrollView {...props}>
            {/* Your custom header */}
            <View style={{ padding: scale(16), borderBottomWidth: 1, borderBottomColor: '#ddd' }} >
                <TouchableOpacity className='flex-row items-center '>
                    <Text className='text-black'>Switch to {isEnabled ? 'Podcaster' : 'Listener'}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleUpdateUserRole}
                        value={isEnabled}
                        disabled={isLoading}
                    />
                </TouchableOpacity>
            </View>

            {/* Drawer items */}
            <DrawerItemList {...props} />
            {/* Your custom footer */}
            {/* <TouchableOpacity
        style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#ddd' }}
      >
        <Text style={{ fontSize: 18, color: 'blue' }}>Custom Drawer Footer</Text>
      </TouchableOpacity> */}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

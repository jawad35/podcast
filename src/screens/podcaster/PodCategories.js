import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import nicheItems from '../../data/nicheItems'
import { scale, verticalScale } from 'react-native-size-matters'
import CustomButtons from '../../components/Items/CustomButtons'
import { PodCategoriesStyles } from '../../styles/podCategoriesStyle'
import { LoginController } from '../../components/Controllers/LoginController'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ApiUrl } from '../../constants/globalUrl'
import { getPodcastCategory } from '../../redux/SelectedCategorySlice'
import { SignUpController } from '../../components/Controllers/SignUpController'
import { SetOverlay } from '../../redux/PodcastUsers'
import AsyncStorage from '@react-native-async-storage/async-storage'
const PodCategories = ({ route }) => {
    console.log(route.params, 'je')
    const { email, password, fullname, role, isSocailLogin } = route?.params
    const podcastData = useSelector(state => state.userData)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [niche, setNiche] = useState(nicheItems)
    const [IsDisable, setIsDisable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const onSelect = (index) => {
        setNiche((prevNiche) => {
            return prevNiche.map((item, i) => {
                return i === index ? { ...item, value: !item.value } : item
            }
            )
        }
        );
        // console.log(count)

    }
    // console.log(selectCatgories)
    // const AddCategories = async () => {
    //     const trueValues = niche.filter(item => item.value === true);
    //     const titlesWithTrueValue = trueValues.map(item => item.title)
    //     try {
    //         const postData = {
    //             categories: titlesWithTrueValue,
    //             id: userData?.user?._id
    //         }
    //         const response = await ApiUrl.post(`/api/user/add-categories`, postData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (response.data.success) {
    //             // setIsFollow(false)
    //             // setFollowers(response.data.followers)
    //             // setFollowing(response.data.following)
    //             // setRefresh('2')
    //     setIsLoading(true)
    //             LoginController(userData?.user?.email, password, navigation, false, dispatch, setIsLoading)

    //         }
    //     } catch (error) {
    //         // Alert.alert("Error", error)
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        const countOfTrueValues = niche.filter(item => item.value === true).length;
        if (countOfTrueValues > 3 || countOfTrueValues === 0) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [niche])

    const CreatUser = async() => {
        const trueValues = niche.filter(item => item.value === true);
        const titlesWithTrueValue = trueValues.map(item => item.title)
        const res = await SignUpController(fullname, email, password, role, titlesWithTrueValue, null, navigation, isSocailLogin, setIsLoading)
        if (res.isExist) {
            await LoginController(email, password, navigation, isSocailLogin, dispatch, setIsLoading)
            dispatch(SetOverlay(false))
          } else {
            if (res.success) {
                await AsyncStorage.setItem('isLogged', res?.data?.user._id)
              dispatch(SetOverlay(false))
              navigation.navigate('Parent')
            }
          }
    }
    return (
        <SafeAreaView className='bg-black flex-1'>
            <ScrollView className='px-4' >
                <Text className={`font-bold text-white_color text-center`} style={{ fontSize: scale(20), marginVertical: scale(20) }}>Categories</Text>
                {
                    !podcastData?.user?.email && <Text className={` text-white_color text-center`} style={{ marginVertical: scale(20) }}>Select up to three categories from the list</Text>
                }
                <View style={[PodCategoriesStyles.container, { marginBottom: podcastData?.user?.email && scale(80) }]}>
                    {
                        niche.map((item, index) => {
                            {
                                return <TouchableOpacity
                                    key={index}
                                    className={`bg-white_color m-2 rounded-lg drop-shadow-lg`}
                                    style={[PodCategoriesStyles.box, { backgroundColor: item.value == true ? 'red' : 'white', margin: 6, borderRadius: 10 }]}
                                    onPress={() => {
                                        if (podcastData?.user?.email) {
                                            dispatch(getPodcastCategory(item?.title?.toLowerCase()))
                                            navigation.navigate('CategoryPodcasts')
                                        } else {
                                            onSelect(index)
                                        }
                                    }}
                                >
                                    <Text className={`text-black font-medium text-base`}>{item?.title}</Text>
                                </TouchableOpacity>
                            }
                        })
                    }
                </View>
                {
                    !podcastData?.user?.email && <View style={{ marginVertical: scale(40) }}>
                        <CustomButtons isLoading={isLoading} disable={IsDisable} onClick={CreatUser} color={'brown_darker'} textColor={'white_color'} title={'Done!'} />
                    </View>
                }
            </ScrollView>

        </SafeAreaView>
    )
}




export default PodCategories
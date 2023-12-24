import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useEffect, useRef, useState } from 'react';
import CustomShadow from '../../components/Items/CustomShadow';
import CustomButtons from '../../components/Items/CustomButtons';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import nicheItems from '../../data/nicheItems';
import { launchImageLibrary } from 'react-native-image-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import Video from 'react-native-video';

import { ApiUrl } from '../../constants/globalUrl';
import uuidv4 from 'react-native-uuid';
const UpdatePodCast = () => {
    const podcast = {
        description: 'test des',
        category: 'comedy',
        image: 'http://192.168.10.5:8000/uploads/podprofile.png',
        videos: [
            'http://192.168.10.5:8000/uploads/Recorder_18122023_195130.mp4-b9436e45-9ca3-499a-b2be-7a876fac5753.mp4',
            'http://192.168.10.5:8000/uploads/PodCastDemo.mp4'
        ]
    }
    const [image, setImage] = useState('')
    const [videos, setVideos] = useState([])
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageLocalPath, setImageLocalPath] = useState('')

    useEffect(() => {
        setVideos(podcast.videos)
        setImageLocalPath(podcast.image)
        setDescription(podcast.description)
        setCategory(podcast.category)

    }, [])

    const openVideoPicker = () => {
        const options = {
            mediaType: 'video',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (!response.didCancel) {
                setVideos(prevDataList => [...prevDataList, response.assets[0]])
            }
        });
    };
    const openImagePicker = () => {
        // const options = {
        //   title: 'Select Images',
        //   mediaType: 'photo',
        //   storageOptions: {
        //     skipBackup: true,
        //     path: 'images',
        //   },
        // };
        launchImageLibrary({}, (response) => {
            if (!response.didCancel) {
                setImage(response.assets[0])
                setImageLocalPath(response.assets[0].uri)
            }
        });
    };


    const handleUpload = async () => {
        try {
            const formData = new FormData();
            // Append the selected image to FormData
            formData.append('avatar', {
                uri: image.uri,
                type: image.type,
                name: image.fileName || 'image.jpg',
            });

            videos.forEach((video) => {
                formData.append('videos[]', {
                    uri: video.uri,
                    type: video.type,
                    name: video.fileName,
                });
            });
            const randomId = uuidv4.v4()
            formData.append('description', description)
            formData.append('category', category)
            const response = await ApiUrl.post(`/api/user/upload-podcast`, formData, {
                params: { randomId: randomId },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleDeleteVideo = async (fileName) => {
        try {

            const data = {
                id: '678',
                fileName
            }
            const response = await ApiUrl.post(`/api/user/pvideo-delete`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastImage = async (fileName) => {

        try {
            const formData = new FormData();
            // Append the selected image to FormData
            formData.append('avatar', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            formData.append('oldimage', imageLocalPath)
            const randomId = uuidv4.v4()
            const response = await ApiUrl.post(`/api/user/pimage-update`, formData, {
                params: { randomId: randomId },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastDescription = async (fileName) => {
        try {
            const formData = { description }
            const response = await ApiUrl.post(`/api/user/pdesc-update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastCategory = async () => {
        try {
            const formData = { category }
            const response = await ApiUrl.post(`/api/user/pcategory-update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Upload response:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    const removeLocalVideo = (indexToRemove) => {
        // Create a copy of the array
        const updatedDataList = [...videos];
        // Use splice to remove the object at the specified index
        updatedDataList.splice(indexToRemove, 1);
        // Update the state with the new array
        setVideos(updatedDataList);
    };

    return (
        <ScrollView style={{ flex: 1 }} className="bg-black">
            <SafeAreaView>

                <HeaderTitle title={'Update Podcast'} />
                <CustomShadow>
                    <TextInput
                        value={description}
                        placeholder='Description'
                        textAlignVertical='top'
                        style={{ backgroundColor: 'white' }}
                        className='rounded-lg'
                        onChangeText={text => setDescription(text)}
                        multiline={true}
                        numberOfLines={5}
                        underlineColorAndroid='transparent'
                    />
                </CustomShadow>
                <CustomShadow>
                    <CustomButtons title={'Update Description'} color={'white_color'} onClick={() => handleUpdatePodcastDescription()} />
                </CustomShadow>
                <CustomShadow>
                    <SelectDropdown
                        searchPlaceHolder='Search...'
                        defaultButtonText={category}
                        buttonStyle={{
                            backgroundColor: '#ffffff',
                            borderRadius: 8,
                            borderColor: '#ccc',
                            width: '100%',
                        }}
                        dropdownStyle={{ borderRadius: 8 }}
                        search
                        data={nicheItems.map(item => item.title)}
                        onSelect={(selectedItem, index) => {
                            setCategory(selectedItem)

                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </CustomShadow>
                <CustomShadow>
                    <CustomButtons title={'Update Category'} color={'white_color'} onClick={() => handleUpdatePodcastCategory()} />
                </CustomShadow>
                <View className='flex-1 justify-center items-center'>
                    {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}

                </View>
                <CustomShadow>
                    <CustomButtons title={'Update Image'} color={'white_color'} onClick={() => handleUpdatePodcastImage()} />
                    <CustomButtons title={'Upload Image'} color={'white_color'} onClick={() => openImagePicker()} />
                </CustomShadow>
                <View className='flex-1 justify-center items-center'>
                    <FlatList
                        data={videos}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity
                                key={index}
                                className={`m-2 rounded-lg drop-shadow-lg`}
                                style={{ height: responsiveHeight(17), width: responsiveWidth(15) }}
                            // style={{ backgroundColor: item.value == true ? 'red' : 'blue', margin:6, borderRadius:10 }}

                            >
                                <Text className='text-white_color my-1 bg-red_darker text-center rounded-sm' style={{ fontSize: responsiveFontSize(1.3) }} onPress={() => {
                                    // removeLocalVideo(index)
                                    handleDeleteVideo(item)
                                }}>Remove</Text>
                                <Video style={{ height: '100%' }} paused={false} className='rounded-lg' source={{ uri: item }} width={responsiveWidth(15)} resizeMode='cover' height={responsiveHeight(15)} />

                            </TouchableOpacity>
                        }

                        }
                    />
                </View>
                <CustomShadow>
                    <CustomButtons title={'Upload Video'} color={'white_color'} onClick={() => openVideoPicker()} />
                </CustomShadow>
                <CustomShadow>
                    <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Update'} onClick={handleUpload} />
                </CustomShadow>
            </SafeAreaView>

        </ScrollView>

    );
};

export default UpdatePodCast;
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useState } from 'react';
import CustomShadow from '../../components/Items/CustomShadow';
import CustomButtons from '../../components/Items/CustomButtons';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import nicheItems from '../../data/nicheItems';
import { launchImageLibrary } from 'react-native-image-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ApiUrl } from '../../constants/globalUrl';
import uuidv4 from 'react-native-uuid';
const CreatePodCast = () => {
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [videos, setVideos] = useState([])
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageLocalPath, setImageLocalPath] = useState('')
  const [videoLocalPath, setVideoLocalPath] = useState('')

  const openVideoPicker = () => {
    let videosArray = []

    const options = {
      mediaType: 'video',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {

      if (!response.didCancel) {
        setVideo(response.assets[0])
        setVideos(prevDataList => [...prevDataList, response.assets[0]])
        setVideoLocalPath(response.assets[0].uri)

      }
    });
  };
  const openImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0])
        setImageLocalPath(response.assets[0].uri)
      }
    });
  };


  const handleUpload = async () => {
    if (!description) {
      return Alert.alert("Error", "Description field is required!")
    }
    if (!category) {
      return Alert.alert("Error", "Category field is required!")
    }
    if (!image) {
      return Alert.alert("Error", "Image field is required!")
    }
    if (videos.length === 0) {
      return Alert.alert("Error", "At least one Video is required!")
    }
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
        <HeaderTitle icon={true} title={'Create Podcast'} />
        <CustomShadow>
          <TextInput
            value={description}
            placeholder='Description'
            textAlignVertical='top'
            style={{ backgroundColor: 'white' }}
            className='rounded-lg  mt-5'
            onChangeText={text => setDescription(text)}
            multiline={true}
            numberOfLines={5}
            underlineColorAndroid='transparent'
          />
        </CustomShadow>

        <CustomShadow>
          <SelectDropdown
            searchPlaceHolder='Search...'
            defaultButtonText='Select category'
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
        <View className='flex-1 justify-center items-center'>
          {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}

        </View>
        <CustomShadow>
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
              // style={{ backgroundColor: item.value == true ? 'red' : 'blue', margin:6, borderRadius:10 }}

              >
                <Text className='text-white_color my-1 bg-red_darker text-center rounded-sm' style={{ fontSize: responsiveFontSize(1.3) }} onPress={() => removeLocalVideo(index)}>Remove</Text>
                <Image className='rounded-lg' source={{ uri: item.uri }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />

              </TouchableOpacity>
            }

            }
          />
        </View>
        <CustomShadow>
          <CustomButtons title={'Upload Video'} color={'white_color'} onClick={() => openVideoPicker()} />
        </CustomShadow>
        <CustomShadow>
          <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Create'} onClick={handleUpload} />
        </CustomShadow>
      </SafeAreaView>
    </ScrollView>

  );
};

export default CreatePodCast;
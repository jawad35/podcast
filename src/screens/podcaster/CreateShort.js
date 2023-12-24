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
  import React, { useRef, useState } from 'react';
  import CustomShadow from '../../components/Items/CustomShadow';
  import CustomButtons from '../../components/Items/CustomButtons';
  import HeaderTitle from '../../components/podcast/HeaderTitle';
  import nicheItems from '../../data/nicheItems';
  import storage from '@react-native-firebase/storage';
  import firestore from '@react-native-firebase/firestore';
  import { launchImageLibrary } from 'react-native-image-picker';
  import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
  import axios from 'axios';
  import { ApiUrl } from '../../constants/globalUrl';
  import uuidv4 from 'react-native-uuid';
  const CreateShort = () => {
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [videoLocalPath, setVideoLocalPath] = useState('')

    const openVideoPicker = () => {
      const options = {
        mediaType: 'video',
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        if (!response.didCancel) {
          setVideo(response.assets[0])
          setVideoLocalPath(response.assets[0].uri)
        }
      });
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
          formData.append('short', {
            uri: video.uri,
            type: video.type,
            name: video.fileName,
          });
        const randomId = uuidv4.v4()
        formData.append('description', description)
        formData.append('category', category)
        const response = await ApiUrl.post(`/api/user/upload-short`, formData, {
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
  
    return (
      <ScrollView style={{ flex: 1 }} className="bg-black">
        <SafeAreaView>
  
          <HeaderTitle title={'Create Podcast'} />
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
            {video && <Image className='rounded-lg' source={{ uri: video }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
          </View>
          <CustomShadow>
            <CustomButtons title={'Choose Short'} color={'white_color'} onClick={() => openVideoPicker()} />
          </CustomShadow>
          <CustomShadow>
            <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Upload'} onClick={handleUpload} />
          </CustomShadow>
        </SafeAreaView>
  
      </ScrollView>
  
    );
  };
  
  export default CreateShort;
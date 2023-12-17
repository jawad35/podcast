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
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const CreatePodCast = () => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  // const [data, setData] = useState(nicheItems);
  const [image, setImage] = useState('')
  const [imageLocalPath, setImageLocalPath] = useState('')
  const [videoLocalPath, setVideoLocalPath] = useState('')
  const uploadImage = async () => {
    try {
      const reference = storage().ref(`podcastimages/${Date.now()}.jpg`);
      await reference.putFile(imageLocalPath);

      const remoteUri = await reference.getDownloadURL();
      setImage(remoteUri);

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };
  const openVideoPicker = () => {
    const options = {
      mediaType: 'video',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if(!response.didCancel){
       setVideoLocalPath(response.assets[0].uri)
      }
    });
  };
  const openImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if(!response.didCancel){
        setImageLocalPath(response.assets[0].uri)
      }
    });
  };
  return (
  <ScrollView style={{ flex: 1 }} className="bg-black">
    <SafeAreaView>
   
      <HeaderTitle title={'Create Podcast'} />
      <CustomShadow>
        <TextInput
          value={''}
          placeholder='Description'
          textAlignVertical='top'
          style={{ backgroundColor: 'white' }}
          // onChangeText={text=>this.setState({value:text})}
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
        width:'100%',
      }}
      dropdownStyle={{borderRadius: 8}}
      search
	data={nicheItems.map(item => item.title)}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
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
        {videoLocalPath && <Image className='rounded-lg' source={{ uri: videoLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
       
      </View>
      <CustomShadow>
          <CustomButtons title={'Upload Video'} color={'white_color'} onClick={() => openVideoPicker()} />
        </CustomShadow>
      {/* <SelectList 
        setSelected={handleSelect}
        data={data} 
        boxStyles={{backgroundColor:'white'}}
        dropdownStyles={{
          backgroundColor: "white",
          position: "absolute",
          top: 40,
          width: "100%",
          height:'600%',
          zIndex: 999,
        }}
        
    /> */}
    
      <View className='my-10'>
      <CustomButtons textColor={'white_color'} color={'brown_darker'} title={'Create'} />
      </View>
    </SafeAreaView>

    </ScrollView>
  
  );
};

export default CreatePodCast;
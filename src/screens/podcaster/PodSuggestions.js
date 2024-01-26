import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import SingleReel from '../../components/podcast/SingleReel';
import { ApiUrl } from '../../constants/globalUrl';
import { useSelector } from 'react-redux';
const ReelsScreen = () => {

  const shortsData = useSelector(state => state.userData)
  const [shorts, setShorts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const GetSuggestVidoes = (category) => {
    category?.sort((a, b) => {
      console.log(a, b)
      // Check if category is "Comedy"
      const isComedyA = a.category === "Comedy";
      const isComedyB = b.category === "Comedy";
    
      // Sort by category, with "Comedy" videos coming first
      if (isComedyA && !isComedyB) {
        return -1; // A comes before B
      } else if (!isComedyA && isComedyB) {
        return 1; // B comes before A
      } else {
        return 0; // Keep the order unchanged
      }
    });
  }

  const GetShorts = async () => {
    const response = await ApiUrl.get(`/api/user/get-short-videos`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.success) {
      // GetSuggestVidoes(response.data.shorts)
      setShorts(response.data.shorts.sort( () => Math.random() - 0.5), 'radnom')
    }
  }
  console.log(shorts)
  useEffect(() => {
    GetShorts()
  }, [shortsData.shorts])
  return (
    <View style={{
      width: windowWidth,
      height: windowHeight,
      backgroundColor: 'white',
      position: 'relative',
      backgroundColor: 'black',
    }}>
      {
        shorts.length === 0 ? <View className='flex-1 justify-center items-center'><Text className='text-white_color'>No Videos</Text></View> : <SwiperFlatList
          vertical={true}
          onChangeIndex={handleChangeIndexValue}
          data={shorts}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SingleReel item={item} index={index} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
          )}
          keyExtractor={(item, index) => index}
        />
      }

    </View>
  );
};


export default ReelsScreen;

import React, { useEffect, useState } from 'react';
import { View, Dimensions} from 'react-native';
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
  const GetShorts = async() => {
    const response = await ApiUrl.get(`/api/user/get-short-videos`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if(response.data.success) {
      setShorts(response.data.shorts)
    }
  }
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
      <SwiperFlatList
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
    </View>
  );
};


export default ReelsScreen;

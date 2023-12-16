import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
import CustomShadow from '../../components/Items/CustomShadow';
import CustomButtons from '../../components/Items/CustomButtons';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import nicheItems from '../../data/nicheItems';
  const CreatePodCast = () => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(nicheItems);
    const [selectedCountry, setSelectedCountry] = useState('');
    const searchRef = useRef();
    const onSearch = search => {
      if (search !== '') {
        let tempData = data.filter(item => {
          return item.country.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        setData(tempData);
      } else {
        setData(nicheItems);
      }
    };
    return (
      <ScrollView style={{flex: 1}} className="bg-black">
        <HeaderTitle title={'Create Podcast'}/>
        <CustomShadow>
        <TextInput
            value={''}
            placeholder='Description'
            textAlignVertical='top'
            style={{backgroundColor:'white'}}
            // onChangeText={text=>this.setState({value:text})}
            multiline={true}
            numberOfLines={5}
            underlineColorAndroid='transparent'
        />
        </CustomShadow>

        <CustomShadow>
          <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:'white'
          }}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text style={{fontWeight:'600'}}>
            {selectedCountry == '' ? 'Select Category' : selectedCountry}
          </Text>
        </TouchableOpacity>
        {clicked ? (
          <View
            style={{
              elevation: 5,
              marginTop: 20,
              height: 300,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '90%',
                height: 50,
                alignSelf: 'center',
                borderWidth: 0.2,
                borderColor: '#8e8e8e',
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
              }}
            />
  
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                    }}
                    onPress={() => {
                      setSelectedCountry(item?.title);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '600'}}>{item?.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
        </CustomShadow>
          <CustomButtons textColor={'white_color'}  color={'brown_darker'} title={'Create'}/>
      </ScrollView>
    );
  };
  
  export default CreatePodCast;
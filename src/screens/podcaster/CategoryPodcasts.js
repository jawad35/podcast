import { View, Text, TextInput, ScrollView, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import Categories from '../../components/podcast/Categories'
import { DummyPodcast } from '../../data/dummypodcasts'
import { useSelector } from 'react-redux'
export default function CategoryPodcasts({ navigation }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const scatgegory = useSelector(state => state.selectedCategory)
    console.log(scatgegory.category)
    useEffect(() => {
        const filterPodcastsByCategory = (podcasts, category) => {
            return podcasts.filter(podcast => podcast.catgegory.includes(category));
        };
        const filteredPodcasts = filterPodcastsByCategory(DummyPodcast, scatgegory.category);
        //   console.log(filteredPodcasts);
        setData(filteredPodcasts);
        setFilteredData(filteredPodcasts);
    }, [scatgegory.category]);

    const handleSearch = (text) => {
        // Update the search query and filter the data
        setSearchQuery(text);
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };
    return (
        <SafeAreaView className='flex-1 bg-black'>
            {/* top header */}
            <View>
                <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
                    <View className='rounded-lg flex-1 bg-white' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            // style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View onTouchStart={() => navigation.openDrawer()} className='justify-items-center justify-center'>
                        <Image source={require('../../assets/images/profile_test.png')}
                            style={{ height: responsiveHeight(5.5), width: responsiveWidth(10.5) }}
                            resizeMode='cover'
                            className='rounded-full'
                        />
                        {/* <MagnifyingGlassIcon size={'35'} color={'black'} /> */}
                    </View>
                </View>
                <View>
                    <Categories />
                </View>
                <View>
                    {
                        filteredData.length !== 0 ? <FlatList
                            data={filteredData}
                            renderItem={({ item, index }) => (
                                <Image key={item.id} source={{ uri: item?.image }}
                                    style={{ height: responsiveHeight(40), width: '100%' }}
                                    resizeMode='cover'
                                    className='rounded-lg mb-9'
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        /> : <View className='flex justify-center items-center'>
                            <Text className='text-white_color mt-14'>No data found</Text>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}
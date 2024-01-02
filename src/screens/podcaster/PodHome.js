import { View, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import TypeCard from '../../components/podcast/TypeCard'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import Categories from '../../components/podcast/Categories'
import UserProfile from '../../components/podcast/UserProfile'
import { useSelector } from 'react-redux'

export default function PodHome({ navigation }) {
  const podcastData = useSelector(state => state.userData)
  return (
    <SafeAreaView className='bg-black'>
      {/* top header */}
      <View>
        <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
          <View className='rounded-lg flex-1 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
            <TextInput placeholder='Search...' />
          </View>
          <View onTouchStart={() => navigation.openDrawer()} className='justify-items-center justify-center'>
            <UserProfile />
            {/* <MagnifyingGlassIcon size={'35'} color={'black'} /> */}
          </View>
        </View>
        <View className='mb-4'>
          <Categories />
        </View>
        <View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(65), marginHorizontal: 10 }}>
            <TypeCard title={'Podcast Radio'} image={require('../../assets/images/podcast1.jpg')} />
            <TypeCard title={'Podcast Suggestions'} image={require('../../assets/images/podcast2.jpg')} />
            <TypeCard title={'Trendings Podcast'} image={require('../../assets/images/podcast3.jpg')} />
            <TypeCard onClick={() => navigation.navigate('PodCategories')} title={'Podcast Categories'} image={require('../../assets/images/podcast4.jpg')} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}
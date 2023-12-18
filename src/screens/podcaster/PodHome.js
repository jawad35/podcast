import { View, Text, TextInput, ScrollView, SafeAreaView, Image } from 'react-native'
import React from 'react'
import TypeCard from '../../components/podcast/TypeCard'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import Categories from '../../components/podcast/Categories'
export default function PodHome({navigation}) {

  return (
    <SafeAreaView className='bg-black'>
        {/* top header */}
       <View>
       <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
            <View className='rounded-lg flex-1 bg-white' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
            <TextInput placeholder='Search...'/>
            </View>
            <View onTouchStart={() => navigation.openDrawer()} className='justify-items-center justify-center'>
            <Image source={require('../../assets/images/profile_test.png')} 
              style={{height: responsiveHeight(5.5), width:responsiveWidth(10.5)}}
              resizeMode='cover'
              className='rounded-full'
              />
                {/* <MagnifyingGlassIcon size={'35'} color={'black'} /> */}
            </View>
        </View>
        <View>
          <Categories/>
        </View>
        <View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(75), marginHorizontal:10}}>
            <TypeCard title={'Podcast Radio'} image={require('../../assets/images/podcast1.jpg')} />
            <TypeCard title={'Podcast Suggestions'} image={require('../../assets/images/podcast2.jpg')} />
            <TypeCard title={'Trendings Podcast'} image={require('../../assets/images/podcast3.jpg')} />
            <TypeCard title={'Podcast Categories'} image={require('../../assets/images/podcast4.jpg')} />
          </ScrollView>
        </View>
       </View>
    </SafeAreaView>
  )
}
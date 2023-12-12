import { View, Text, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid'
import TypeCard from '../../components/podcast/TypeCard'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
export default function PodHome() {
  return (
    <SafeAreaView>
        {/* top header */}
       <View>
       <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
            <View className='rounded-lg flex-1 bg-white' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
            <TextInput placeholder='Search...'/>
            </View>
            <View className='justify-items-center justify-center'>
                <MagnifyingGlassIcon size={'35'} color={'black'} />
            </View>
        </View>
        <View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(35), marginHorizontal:10}}>
            <TypeCard title={'Podcast Radio'} image={require('../../assets/images/podcast1.jpg')} />
            <TypeCard title={'Podcast Suggestions'} image={require('../../assets/images/podcast2.jpg')} />
            <TypeCard title={'Podcast Trendings'} image={require('../../assets/images/podcast3.jpg')} />
          </ScrollView>
        </View>
       </View>
    </SafeAreaView>
  )
}
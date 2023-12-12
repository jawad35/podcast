import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
// import trendingPodcasts from '../../data/podcastersimages'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import HeaderTitle from '../../components/podcast/HeaderTitle'

export default function TrendingPosts() {
  const trendingPodcasts = [
    'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg',
  'https://www.searchenginejournal.com/wp-content/uploads/2020/02/7-tips-to-make-a-successful-podcast-5e3d9fa1ad735.png',
  'https://img.freepik.com/vector-gratis/plantilla-plana-portada-podcast-dibujada-mano_23-2149429806.jpg?w=2000',
  'https://img.freepik.com/vetores-gratis/capa-de-podcast-plana-desenhada-a-mao-de-musica_23-2149444190.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1696636800&semt=ais',
  'https://assets-global.website-files.com/5fac161927bf86485ba43fd0/6470607db5ddc9c102ef4a14_How-to-Start-a-Podcast-(1).jpeg'
]
  return (
    <SafeAreaView>
      <HeaderTitle title={'Podcast Trendings'} />
      <View className='p-2'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(20)}}>
           {
            trendingPodcasts?.map((image, index) => {
              return <Image key={index} source={{uri:image}} 
              style={{height: responsiveHeight(30), width:'100%'}}
              resizeMode='cover'
              className='rounded-lg my-2'
              />
            })
           }
            
      </ScrollView>
      </View>
     
    </SafeAreaView>
  )
}
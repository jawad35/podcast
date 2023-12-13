import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import NicheItem from '../../components/podcast/nicheItem'
import nicheItems from '../../data/nicheItems'
const PodCategories = ({ navigation }) => {
    const [niche, setNiche] = useState(nicheItems)
    const onSelect = (index) => {
        setNiche((prevNiche) =>
            prevNiche.map((item, i) =>
                i === index ? { ...item, value: !item.value } : item
            )
        );
    }
    return (
        <SafeAreaView className='bg-black'>
            <View className='h-full px-4'>
                <Text className={`py-8 text-2xl font-bold text-white_color`}>Categories</Text>
                <View>
                    <FlatList
                        data={niche}
                        numColumns={3}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity
                                key={index}
                                className={`${item.value == false ? 'bg-white_color' : 'bg-brown_darker'}  m-2 rounded-lg drop-shadow-lg`}
                                // style={{ backgroundColor: item.value == true ? 'red' : 'blue', margin:6, borderRadius:10 }}
                                onPress={() => {
                                    onSelect(index)
                                }}
                            >
                                <NicheItem category={true} item={item} />
                            </TouchableOpacity>
                        }

                        }
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}




export default PodCategories
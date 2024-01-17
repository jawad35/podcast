import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../constants/globalUrl'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native';

const StripeProducts = () => {
    const [prices, setPrices] = useState([])
    // const { confirmPayment } = useStripe();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigation = useNavigation()
  
    const GetProductsPrices = async () => {
        const prices = await ApiUrl.get('api/subs/prices', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        setPrices(prices.data.prices.data)
    }
    const createSubscription = async (paymentMethodId) => {
        try {
          const response = await fetch('http://your-backend-url/create-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId, priceId: 'your_price_id_here' }),
          });
      
          if (response.ok) {
            const subscription = await response.json();
            console.log('Subscription created:', subscription);
          } else {
            console.error('Subscription failed');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const pricesArray = [{id:1, name:'Basic', price:'19', duration:'Per month'}, {id:2, name:'Top 10', price:'59', duration:'Per month'}, {id:3, name:'Pro', price:'99', duration:'Per month'}]  
    
    return (
        <SafeAreaView className="flex-1 bg-black">
          <View>
            <Text className='text-lg text-white_color text-center' style={{marginTop:scale(20)}}>Tariff Plans</Text>
          </View>
          <View className='flex-1 justify-center items-center' style={{marginHorizontal:scale(25), marginVertical:scale(10)}}>
                {pricesArray.map((item) => (
                  <TouchableOpacity onPress={() => navigation.navigate("PackageDetails", {item})} className='flex-1 items-center w-full bg-white_color m-3 p-3 rounded-md' key={item.id}>
                    {
                      item.id === 2 && <Text style={{fontSize:scale(10)}} className='text-start bg-red_darker px-1 absolute left-0 rounded-sm text-white_color'>Recommended</Text>
                    }
                    <Text className='font-bold'>{item.name}</Text>
                    <Text style={{fontSize:scale(40), marginVertical:scale(10)}} className='font-bold'>$ {item.price}.00</Text>
                    <Text>{item.duration}</Text>
                  </TouchableOpacity>
                ))}
                </View>
                <View>
          </View>
        </SafeAreaView>
    )
}

export default StripeProducts
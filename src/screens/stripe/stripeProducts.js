import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../constants/globalUrl'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native';
import { GetPackageName } from '../../components/Helper/GetPackageName';

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
    const pricesArray = prices.data.prices.data
    pricesArray?.shift()
    setPrices(pricesArray)
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

  useEffect(() => {
    GetProductsPrices()
  }, [])
 
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        <Text className='text-lg text-white_color text-center' style={{ marginTop: scale(20) }}>Tariff Plans</Text>
      </View>
      <View className='flex-1 justify-center items-center' style={{ marginHorizontal: scale(25), marginVertical: scale(10) }}>
        {prices.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate("PackageDetails", { item })} className='flex-1 items-center w-full bg-white_color m-3 p-3 rounded-md' key={item.id}>
            {
              item.unit_amount === 5900 && <Text style={{ fontSize: scale(10) }} className='text-start bg-red_darker px-1 absolute left-1 top-1 rounded-sm text-white_color'>Recommended</Text>
            }
            <Text className='font-bold text-text_gray'>{GetPackageName(item.unit_amount)}</Text>
            <Text style={{ fontSize: scale(40), marginVertical: scale(10) }} className='font-bold text-text_gray'>${item.unit_amount / 100}.00</Text>
            <Text className='text-text_gray'>Per {item?.recurring?.interval}</Text>
            <Text style={{ fontSize: scale(10) }} className='text-start bg-indigo px-1 absolute left-1 bottom-1 rounded-sm text-white_color'>3 month free trail</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
      </View>
    </SafeAreaView>
  )
}

export default StripeProducts
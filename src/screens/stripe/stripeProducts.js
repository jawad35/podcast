import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../constants/globalUrl'

const StripeProducts = () => {
    const [prices, setPrices] = useState([])
    // const { confirmPayment } = useStripe();
    const [paymentMethod, setPaymentMethod] = useState(null);
  
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

   
      const handlePayment = async () => {
        try {
          const { paymentMethod: newPaymentMethod } = await confirmPayment({
            type: 'Card',
            billingDetails: { email: 'customer@example.com' },
          });
    
          setPaymentMethod(newPaymentMethod);
    
          // Call your backend to create the subscription
          await createSubscription(newPaymentMethod.id);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <View>
            <Button title='hek' onPress={GetProductsPrices} />
            {
                <View>
                <Text>Prices:</Text>
                {prices.map((price) => (
                  <Text key={price.id}>{`${price.product} - $${(price.unit_amount / 100)}`}</Text>
                ))}
              </View>
            }

        </View>
    )
}

export default StripeProducts
import { Alert } from "react-native";
import { ApiUrl } from "../../constants/globalUrl";
import { SetUserData } from "../../redux/PodcastUsers";

export const LoginController = async (email, password, navigation, isSocailLogin, dispatch) => {
    if (!email) {
        Alert.alert('Error', 'Email field is required!');
        return;
    }
    if(!isSocailLogin) {
        if (!password) {
            Alert.alert('Error', 'Password field is required!');
            return;
        }
    }
    try {
        const data = {
            email,
            password,
            isSocailLogin
        }
        const response = await ApiUrl.post(`/api/user/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.data.success) {
            Alert.alert('Error', response.data.error);
        } else {
            navigation.navigate('Parent')
            dispatch(SetUserData(response.data.user))
            return response.data
            // const storeData = async () => {
            //     try {
            //       await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
            //       console.log('Data stored successfully');
            //     } catch (error) {
            //       console.error('Error storing data:', error);
            //     }
            //   };
            //   storeData()
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
        console.error('Upload error:', error);
    }
}
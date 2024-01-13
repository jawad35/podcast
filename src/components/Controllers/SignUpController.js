import { Alert } from "react-native";
import { ApiUrl } from "../../constants/globalUrl";
import { SetUserData } from "../../redux/PodcastUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUpController = async (fullname, email, password, role, image_url, navigation, isSocailLogin, setIsLoading, dispatch) => {
    try {
        if (!fullname) {
            Alert.alert('Error', 'Fullname field is required!');
            return;
        }
        if (!email) {
            Alert.alert('Error', 'Email field is required!');
            return;
        }
        if (!password) {
            Alert.alert('Error', 'Password field is required!');
            return;
        }
        if (role === null) {
            Alert.alert('Error', 'Role field is required!');
            return;
        }
        const postData = {
            fullname,
            email,
            password,
            image_url,
            role,
            isSocailLogin
        }
        setIsLoading(true)

        const response = await ApiUrl.post(`/api/user/create`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.success) {
            setIsLoading(false)
            if(isSocailLogin) {
                dispatch(SetUserData(response.data?.user))
                        await AsyncStorage.setItem('isLogged', response.data?.user._id)
                        navigation.navigate('Parent')
                        return response.data
                
            } else {
                const userData = response.data;
                navigation.navigate('CodeVerification', { userData, password })
                Alert.alert('Verification', 'Verification code Email sent successfully!');
                return response.data
            }
        } else {
            setIsLoading(false)
            if(!isSocailLogin) {
                Alert.alert('Error', response.data.message);
            }
            return response.data
        }
    } catch (error) {
        setIsLoading(false)

        Alert.alert('Error', 'Something went wrong!');

    }
}
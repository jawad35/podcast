import { Alert } from "react-native";
import { ApiUrl } from "../../constants/globalUrl";

export const SignUpController = async (fullname, email, password, image_url, navigation, isSocailLogin) => {
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
        const postData = {
            fullname,
            email,
            password,
            image_url,
            isSocailLogin
        }
        const response = await ApiUrl.post(`/api/user/create`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.success) {
            if(isSocailLogin) {
                return response.data
            } else {
                const userData = response.data;
                navigation.navigate('CodeVerification', { userData, password })
                Alert.alert('Verification', 'Verification code Email sent successfully!');
            }
        } else {
            if(!isSocailLogin) {
                Alert.alert('Error', response.data.message);
            }
            return response.data
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong!');

    }
}
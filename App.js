import AppNavigation from './src/navigations/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigations/routes';

export default function App() {
  return (
    <NavigationContainer>
        {/* <Routes/> */}
        <AppNavigation/>
    </NavigationContainer>
  );
}
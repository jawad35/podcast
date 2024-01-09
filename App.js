import AppNavigation from './src/navigations/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
// import Routes from './src/navigations/routes';
import { Provider } from 'react-redux';
import PodcastStore from './src/redux/store/PodCastStore';
export default function App() {
  return (
    <NavigationContainer>
      {/* <Routes/> */}
      <Provider store={PodcastStore}>
    
        
          <AppNavigation />
      </Provider>

    </NavigationContainer>
  );
}
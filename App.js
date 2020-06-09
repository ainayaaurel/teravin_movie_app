import React, {useState, useEffect} from 'react';
// import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import MainHome from './src/screens/StackScreen';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView, Text, View} from 'react-native';
import {Image, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => {
      unsubscribe;
    };
  }, []);
  if (isInternetReachable) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainHome />
        </PersistGate>
      </Provider>
    );
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <Image
          style={{
            width: 400,
            height: 250,
          }}
          source={require('./src/assets/image/nointernet.png')}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 28, fontWeight: 'bold'}}>
          Ooops!
        </Text>
        <Text style={{textAlign: 'center', fontSize: 15}}>
          No Internet Connection Found
        </Text>
        <Text style={{textAlign: 'center', fontSize: 15}}>
          Check your connection
        </Text>
      </View>
    </View>
  );
};

export default App;
// export default class App extends Component {
//   render() {
//     return (

//     );
//   }
// }

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import SelectedCategory from './src/components/SelectedCategory';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from './src/components/customDrawer';
import reducers from './src/redux/reducers'
import Cart from './src/components/Cart';
import seesha from './src/components/Sheesha';
import SocialGames from './src/components/SocialGames';
import FindMe from './src/components/FindMe';
import Payments from './src/components/Payments';
import OrderSummary from './src/components/OrderSummary';
import { PrimayColor } from './src/components/theme/Colors';
import { Platform, Alert, Image } from 'react-native';
import thunk from 'redux-thunk';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Profile from './src/components/login/Profile';
import ContactUs from './src/components/login/ContactUs';
import Notifications from './src/components/login/Notifications';
import Orders from './src/components/login/Orders';
import Video from './src/components/login/Video';
import InitialSelectionScreen from './src/components/InitialSelectionScreen';

MaterialIcon.loadFont();
Feather.loadFont()
FontAwesome.loadFont()
MaterialCommunityIcons.loadFont();
AsyncStorage.clear()
const innerNavigator = createStackNavigator({
  Home,
  SelctedCategory: SelectedCategory,
  Cart,
  seesha,
  games: SocialGames,
  location: FindMe,
  payment: Payments,
  orderSummary: OrderSummary,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: PrimayColor,
      height: Platform.OS === 'android' ? 38 : 80
    },
    headerTintColor: '#000',
  }
})


const dashBoard = createDrawerNavigator({
  Home: innerNavigator,
  Profile,
  Orders,
  Notifications,
  Video,
  ContactUs,
}, {
  contentOptions: {
    activeTintColor: '#fd6d24',
    backgroundTintColor: '#fdbf83'
  },
  initialRouteName: 'Home',
  drawerType: 'slide',
  contentComponent: props => <CustomDrawer {...props} />,
})


const authNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Reset: ForgotPassword,
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
})
const AppNavigator = createSwitchNavigator({
  Landing: LandingPage,
  authNavigator,
  InitialSelectionScreen,
  Home: dashBoard
});


const AppContainer = createAppContainer(AppNavigator);

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  ////////////////////// Add these methods //////////////////////


  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body, picture } = notification;

      this.showAlert(title, body, picture);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body, picture = '') {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },

      ],
      { cancelable: false },
    );
  }

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
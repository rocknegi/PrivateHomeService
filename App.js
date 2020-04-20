import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import SelectedCategory from './src/components/SelectedCategory';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from './src/components/customDrawer';
import { TextColorWhite } from './src/components/theme/Colors';

MaterialIcon.loadFont();
Feather.loadFont()
FontAwesome.loadFont()
MaterialCommunityIcons.loadFont()
const innerNavigator = createStackNavigator({
  Home,
  SelctedCategory: SelectedCategory
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f3b771',
    },
    headerTintColor: '#000',
  }
})


const dashBoard = createDrawerNavigator({
  Home: innerNavigator
}, {
  contentOptions: {
    activeTintColor: TextColorWhite,
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
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f3b771',
    },
    headerTintColor: '#000',
  }
})
const AppNavigator = createSwitchNavigator({
  Landing: LandingPage,
  authNavigator,
  Home: dashBoard
});



export default createAppContainer(AppNavigator);
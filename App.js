import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';

import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import SelectedCategory from './src/components/SelectedCategory';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';

MaterialIcon.loadFont();
Feather.loadFont()
FontAwesome.loadFont()

const AppNavigator = createStackNavigator({
  Landing:LandingPage,
  Login: Login,
  Register: Register,
  Reset: ForgotPassword,
  Home: Home,
  SelctedCategory: SelectedCategory
}, {
  initialRouteName: 'Landing',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f3b771',
    },
    headerTintColor: '#000',
  }
});

export default createAppContainer(AppNavigator);
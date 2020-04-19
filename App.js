import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import Icon from 'react-native-vector-icons/FontAwesome'
import ForgotPassword from './src/components/ForgotPassword';
Icon.loadFont();

const AppNavigator = createStackNavigator({
  Landing: {
    screen: LandingPage,
     navigationOptions: {
      headerShown: false,
    },
  },
  Login:{
    screen:Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register:{
    screen :Register
  },
  Reset:{
    screen: ForgotPassword,
    navigationOptions:{headerTitle:'Reset Password'}
  }
}, {
  initialRouteKey: 'Landing',
});

export default createAppContainer(AppNavigator);
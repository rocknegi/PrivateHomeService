import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import Icon from 'react-native-vector-icons/FontAwesome'
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
  }
}, {
  initialRouteKey: 'Landing',
});

export default createAppContainer(AppNavigator);
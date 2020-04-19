import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import SelectedCategory from './src/components/SelectedCategory';
MaterialIcon.loadFont();
Feather.loadFont()
FontAwesome.loadFont()

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
  },
  Home:{
    screen:Home,
    navigationOptions:{headerShown:false}
  },
  SelctedCategory:{
    screen:SelectedCategory,
    navigationOptions:{
      title:null,
      headerRight:()=><MaterialIcon name="shopping-cart" style={{fontSize:28,right:10}} />
    }
  }
}, {
  initialRouteKey: 'Landing',
});


export default createAppContainer(AppNavigator);
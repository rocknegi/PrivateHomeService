import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Landing: {
    screen: LandingPage, navigationOptions: {
      headerShown: false,
    },
  },
  Login:{
    screen:Login,
    navigationOptions: {
      headerShown: false,
    },
  }
}, {
  initialRouteKey: 'Landing',
});

export default createAppContainer(AppNavigator);
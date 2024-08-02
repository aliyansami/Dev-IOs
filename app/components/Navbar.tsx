import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {
  switch (routeName) {
    case 'Search':
      return 'search';
    case 'Home':
      return 'home';
    case 'Chef':
      return 'user-md';
    default:
      return 'question';
  }
};

const screenOptions = ({route}: {route: any}) => ({
  tabBarIcon: ({color, size}: {color: string; size: number}) => {
    const iconName = getIconName(route.name);
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#00796b',
  tabBarInactiveTintColor: 'gray',
});

const NavigationBar: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Search" component={Login} />
      <Tab.Screen name="Home" component={Signup} />
      <Tab.Screen name="Chef" component={ForgotPassword} />
    </Tab.Navigator>
  );
};

export default NavigationBar;

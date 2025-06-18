import React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu'; 

import TodoList from './TodoList';     // Import the TodoList
import WelcomeScreen from './welcome'; // Import the Welcome screen
import LoginScreen from './Login';     // Import the Login screen
import SignupScreen from './Signup';   // Import the Signup screen
import ScheduleScreen from './ScheduleScreen';

// Define the bottom tab navigator
const Tab = createBottomTabNavigator();

// Define the stack navigator
const Stack = createStackNavigator();


// Bottom tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={TodoList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star-outline" size={size} color={color} /> 
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }} // Hide header for the Welcome screen
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // Hide header for the Login screen
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }} // Hide header for the Signup screen
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }} // Hide header for the bottom tabs
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
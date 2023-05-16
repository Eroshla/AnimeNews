import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from './styles/Colors';

import Main from './pages/Main';
import Profile from './pages/Profile';
import NewUser from './pages/NewUser';
import Season from './pages/Season';
import Login from './pages/Login';
import Follow from './pages/Follow';
import Choose from './componentes/Choose';
import Add from './pages/Add';
import ItemPage from './pages/ItemPage';
import Feed from './pages/Feed';
import Create from './pages/Create';
import AddAnime from './pages/Add/AddAnime';
import AddSeason from './pages/Add/AddSeason';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={Main}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={30} color={Colors.black} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Temporadas"
        component={Season}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="calendar-today" size={30} color={Colors.black} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Seguindo"
        component={Follow}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="favorite" size={30} color={Colors.black} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Waifu"
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="account-circle" size={30} color={Colors.black} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewUser"
        component={NewUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Waifu"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Choose"
        component={Choose}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ItemPage"
        component={ItemPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Follow"
        component={Follow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: false,
        }}
      />
            <Stack.Screen
        name="AddAnime"
        component={AddAnime}
        options={{
          headerShown: false,
        }}
      />
                  <Stack.Screen
        name="AddSeason"
        component={AddSeason}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

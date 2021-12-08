import React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import Contact from './Contact';

const Stack = createNativeStackNavigator();

const App = ()=>{
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          }}>
          <Stack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerShown: false,
          }}

          />
          <Stack.Screen
          name={"Contacto"}
          component={Contact}
          
          options={{
            headerShown: true,
            title: 'Contacto'
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;
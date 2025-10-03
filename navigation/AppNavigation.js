import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserDetailsScreen from '../screens/UserDetailsScreen'

export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
        <Stack.Screen name='UserDetails' component={<UserDetailsScreen/>}/>
        <Stack.Screen name='UserList' component={<UserListScreen/>}/>
    </Stack.Navigator>
  )
}
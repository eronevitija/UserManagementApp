import React from 'react';
import { View, Button } from 'react-native';
import { router } from 'expo-router';
import UserListScreen from '@/screens/UserListScreen';


export default function UsersScreen() {
  return (
  <View > 
    <Button title="Add new user"
     onPress={() => router.push('/users/add')}/>
      <UserListScreen/>
  </View>

);
}

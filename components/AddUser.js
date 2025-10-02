import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import {isNotEmpty, isValidEmail} from '../utils/validation';

export default function AddUser({route, navigation}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // const {onAdd} = route.params;
 

    const handleSubmit = async () => {
      if (!isNotEmpty(name)) {
        Alert.alert('Name is required.');
        return;
      }
      if (!isValidEmail(email)) {
        Alert.alert('Email is required.');
        return;
      }

    
    

    const addNewUser = {
        userID: Date.now(),
        name,
        email,
        company: {name: ''},
        address: {},
        phoneNo: '',
        website: '',
    }

      //  onAdd(addNewUser);

    navigation.goBack();
      
    };
   
  return (
   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
     <View>
      <Text>Name: </Text>
      <TextInput 
      value={name}
      placeholder='Write name'
      onChangeText={setName}
      />

      <Text>Email: </Text>
      <TextInput 
      value={email}
      placeholder='Write email'
      onChangeText={setEmail}
      />

      <Button 
      title='Add new User' 
      onPress={handleSubmit}
      />


    </View>
   </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5'
  }
});
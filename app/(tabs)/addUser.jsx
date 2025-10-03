import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/AddUser.styled'
import { useUsers } from '../../contexts/UsersContext';
import { useRouter } from 'expo-router';

export default function AddUser({handleAddUser}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

      const { addUser } = useUsers();
      const router = useRouter();
 

    const handleSubmit = () => {
       if (!name || !email) {
         setError('Please fill in all fields.');
         return;
       }

       handleAddUser({
        name,
        email,
        phone: '',
        website: '',
        address:'',
       });

       setName('');
       setEmail('');
       router.push('/users');

    };
     
    
  return (
     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={{flex:1}}>
      <View style={styles.userInfo}>
      <Text style={styles.title}>Add New User</Text>
      {/* <Text style={styles.title}>Name: </Text> */}
      <TextInput 
      style={styles.textInput}
      value={name}
      placeholder='Name'
      onChangeText={setName}
      placeholderTextColor={"#333"}
      />

      {/* <Text style={styles.title}>Email: </Text> */}
      <TextInput 
      style={styles.textInput}
      value={email}
      placeholder='test@example.com'
      onChangeText={setEmail}
      keyboardType='email-address'
      autoCapitalize='none'
      placeholderTextColor={"#333"}
      />

      {error ? <Text style={styles.errorTxt}>{error}</Text> : null}

     <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
      <Text style={styles.title}>Add</Text>
      </TouchableOpacity>

    </View>
     </KeyboardAvoidingView>
   
  )
};


import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/UserDetails.styled'
import {useLocalSearchParams} from 'expo-router';
import axios from 'axios';

export default function UserDetailsScreen() {

    const { id } = useLocalSearchParams();
    const [user, setUser] = useState(null);

   
    useEffect(()=>{
      if (!id) return;
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res)=>setUser(res.data))
      .catch((error)=>console.error(error))
    },[id])

if (!user) {
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>No user!</Text>
    </View>
  )
}

  return (
    <ScrollView style={{flex:1, padding:16}}>
      <View style={styles.userInfo}>
        <Text style={styles.userTitle}>Name: {user.name}</Text>
        <Text style={styles.userTitle}>Email: {user.email}</Text>
        <Text style={styles.userTitle}>Phone: {user.phone}</Text>
        <Text style={styles.userTitle}>Website: {user.website}</Text>
        <Text style={styles.userTitle}>
        Address: 
       {user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`  :'N/A'}
        </Text>
      </View>

    </ScrollView>
  )
}
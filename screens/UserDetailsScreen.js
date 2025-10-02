import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../styles/UserDetails.styled';

const UserDetailsScreen = ({route}) => {

    const {user} = route.params;

    const { street, suite, city, zipcode } = user.address || {};

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text>UserDetailsScreen</Text>

      <Text style={styles.userTitle}>Name:{user.name}</Text>
      <Text style={styles.userTitle}>Email: {user.email}</Text>
      <Text style={styles.userTitle}>Phone: {user.phone}</Text>
      <Text style={styles.userTitle}>Website: {user.website}</Text>
      <Text style={styles.userTitle}>Address: {user.address}</Text>
      {street}, {suite}, {city}, {zipcode}
      </View>

    </View>
  )
}



export default UserDetailsScreen
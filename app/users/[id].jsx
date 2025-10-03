import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import styles from '../../styles/UserDetails.styled';

const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${USER_API_URL}/${id}`);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <View style={localStyles.centered}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={localStyles.centered}>
        <Text style={{color:'black'}}>No user found for Id {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[localStyles.container, {backgroundColor:'#fff'}]}>
      <View style={styles.userInfo}>
        <Text style={styles.userTitle}>Name: {user.name}</Text>
        <Text style={styles.userTitle}>Email: {user.email}</Text>
        <Text style={styles.userTitle}>Phone: {user.phone}</Text>
        <Text style={styles.userTitle}>Website: {user.website}</Text>
        <Text style={styles.userTitle}>
          Address:{' '}
          {user.address
            ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
            : 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
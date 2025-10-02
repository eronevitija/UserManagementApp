import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../styles/SearchUser.styled'

export default function Search({search, setSearch}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name='search' size={20} color={'black'} style={styles.searchIcon}/>
        <TextInput 
        style={styles.searchInput}
        placeholder='Search by name or email'
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        placeholderTextColor={'#000'}
        />

      </View>
    </View>
  );
};


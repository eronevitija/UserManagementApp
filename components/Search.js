import { View, Text, TextInput, StyleSheet, Keyboard, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../styles/SearchUser.styled'

export default function Search({searchQuery, setSearchQuery}) {

  const clearSearchQuery = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
     
       <View style={styles.searchContainer}>
        
        <Ionicons name='search' size={20} color={'black'} style={styles.searchIcon}/>
        <TextInput 
        placeholder='Search by name or email'
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        placeholderTextColor={'#888'}
        style={styles.searchInput}
        returnKeyType='done'
        />
        {
          searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearchQuery} style={styles.clearBtn}>
                <Ionicons name='close-circle' size={20} color={'#888'}/>
            </TouchableOpacity>
          )
        }
      </View>
        
      
    </View>
  );
};


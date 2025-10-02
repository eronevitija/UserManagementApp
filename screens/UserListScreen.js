import React, { useEffect, useMemo, useState } from 'react';  
import { View, Text, FlatList, StyleSheet, Alert, Button} from 'react-native';
import Search from '../components/Search';
import axios from 'axios';
import { router } from 'expo-router';

const UserListScreen = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const url =  `https://jsonplaceholder.typicode.com/users`;
 
    useEffect(() => {

          axios.get(url)
          .then((re) => {
            setUsers(re.data);
            setFilteredUsers(re.data);
          })
          .catch((error) => {
            Alert.alert('Failed to get users',error)
          })
          .finally(()=>setLoading(false));
        
        
    },[url]);

        useEffect(() => {
        if (!searchUsers) {
            setFilteredUsers(users);
        }
        else{
            const searchLowerCase = searchUsers.toLowerCase();
            const filteredUsers = users.filter(
            (user) =>
            user.name.toLowerCase().includes(searchLowerCase) ||
            user.email.toLowerCase().includes(searchLowerCase)
      );
      setFilteredUsers(filteredUsers);
        }
    },[searchUsers, users])


   
    

  return (
    <View style={styles.container}>
      <Button 
      title='Add New User'
      onPress={() => router.push('/add')}
      />
      <Search search={searchUsers} setSearch={setSearchUsers}/>
      <FlatList 
        data={filteredUsers}
        keyExtractor={(item) => String(item.id ?? item.email)}
        ListEmptyComponent={
          <View style={styles.emptyUser}>
            <Text style={styles.emptyText}>No Users</Text>
          </View>

        }
        renderItem={({item}) => (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            {!!item.company?.name && <Text style={styles.userCompany}>{item.company.name}</Text>}
          </View>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
        flex:1,
        padding:16
    },
    userInfo:{
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'#f2e9e9cc',
        marginBottom:10,
        borderRadius:10,
    },
    userName:{
        color:'#000',
        fontWeight:'bold',
        fontSize:15,
    },
    userEmail:{
        color:'#222',
        marginTop:5,
        fontSize:14

    },
    userCompany:{
      color:'#333',
      fontSize:14,
      marginTop:2
    },
    emptyUser:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:30
    },
    emptyText:{
      fontSize:16,
      color:'#444'
    }

});

export default UserListScreen
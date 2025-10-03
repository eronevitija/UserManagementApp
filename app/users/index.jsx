import React, { useEffect, useMemo, useState } from 'react';  
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Search from '../../components/Search'
import AddUser from '../(tabs)/addUser';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';



const UserListScreen = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const url =  `https://jsonplaceholder.typicode.com/users`;


    const router = useRouter();
 
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


    const handleAddUser = (newUser) => {
      if (!newUser.name || !newUser.email)  {
        Alert.alert('Name and Email are required');
        return;
      }

      const id = Date.now();
      const addUser = {
        id,
        name:newUser.name,
        email:newUser.email,
        company: {name: newUser.company || ''}
      };

      setUsers([addUser, ...users]);
      setFilteredUsers([addUser, ...filteredUsers])
    }
   
    

  return (
    <SafeAreaView style={styles.container}>
     <View style={{marginBottom:50}}>
       <AddUser
      handleAddUser={handleAddUser}
      />
     </View>
      <Search 
      search={searchUsers} 
      setSearch={setSearchUsers}
      />
      <FlatList 
        data={filteredUsers}
        keyExtractor={(item) => String(item.id ?? item.email)}
        ListEmptyComponent={
          <View style={styles.emptyUser}>
            <Text style={styles.emptyText}>No Users</Text>
          </View>

        }
        renderItem={({item}) => (
         <TouchableOpacity style={styles.userInfo} onPress={()=>router.push(`/users/${item.id}`)}>
          <View style={{width:'100%'}}>
              <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            {!!item.company?.name && <Text style={styles.userCompany}>{item.company.name}</Text>}
          </View>
        
         </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:16,
        paddingBottom:24,

        
    },
    userInfo:{
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
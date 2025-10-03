import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Search from '../../components/Search';
import AddUser from '../(tabs)/addUser';

const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(USER_API_URL);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        Alert.alert('Failed to get users', error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);


  const handleAddUser = useCallback((newUser) => {
    if (!newUser.name || !newUser.email) {
      Alert.alert('Name and Email are required');
      return;
    }

    const userToAdd = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      company: { name: newUser.company || '' },
    };

    setUsers((prev) => [userToAdd, ...prev]);
    setFilteredUsers((prev) => [userToAdd, ...prev]);
  }, []);

  const renderUser = ({ item }) => (
    <TouchableOpacity 
      style={styles.userInfo} 
      onPress={() => router.push(`/users/${item.id}`)}
    >
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      {!!item.company?.name && (
        <Text style={styles.userCompany}>{item.company.name}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addUserContainer}>
        <AddUser handleAddUser={handleAddUser} />
      </View>
      <Search search={searchQuery} setSearch={setSearchQuery} />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id ?? item.email)}
        renderItem={renderUser}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyUser}>
              <Text style={styles.emptyText}>No Users</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  addUserContainer: {
    marginBottom: 50,
  },
  userInfo: {
    padding: 20,
    backgroundColor: '#f2e9e9cc',
    marginBottom: 10,
    borderRadius: 10,
  },
  userName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  userEmail: {
    color: '#222',
    marginTop: 5,
    fontSize: 14,
  },
  userCompany: {
    color: '#333',
    fontSize: 14,
    marginTop: 2,
  },
  emptyUser: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
  },
});

export default UserListScreen;
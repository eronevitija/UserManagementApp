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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


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
      style={styles.userCard} 
      onPress={() => router.push(`/users/${item.id}`)}
    >
      <View style={styles.avatar}>
      <Ionicons name='person-circle-outline' size={24} color={'#4CAF50'}/>
      </View>
     <View style={styles.userDetails}>
       <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      {!!item.company?.name && (
        <View style={styles.companyRow}>
          <MaterialIcons name='business' size={16} color={'#999'}/>
          <Text style={styles.userCompany}>{item.company.name}</Text>
        </View>
      )}
     </View>
     <Ionicons name='chevron-forward' size={20} color={'#aaa'}/>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addUserContainer}>
        <AddUser handleAddUser={handleAddUser} />
      </View>
     
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
        style={{ marginTop:20 }}
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
    backgroundColor: "#f9f9f9",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#222",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  userCompany: {
    marginLeft: 4,
    fontSize: 13,
    color: "#777",
  },
  emptyUser: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,}
});

export default UserListScreen;
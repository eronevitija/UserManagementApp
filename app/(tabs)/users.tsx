import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { useUsers } from '@/contexts/UsersContext';

export default function UsersScreen() {
  const { users, isLoading, error, loadUsers } = useUsers();
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <Link href="/add" asChild>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>＋</Text>
          </Pressable>
        </Link>
      </View>

      <TextInput
        placeholder="Search by name or email"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {isLoading && users.length === 0 ? (
        <View style={styles.center}> 
          <ActivityIndicator />
        </View>
      ) : error && users.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={data.length === 0 ? styles.center : undefined}
          ListEmptyComponent={<Text>No users</Text>}
          renderItem={({ item }) => (
            <Link href={{ pathname: '/user/[id]', params: { id: String(item.id) } }} asChild>
              <Pressable style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  {!!item.company?.name && <Text style={styles.company}>{item.company?.name}</Text>}
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '600' },
  addButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#007AFF' },
  addButtonText: { color: 'white', fontSize: 24, lineHeight: 24 },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12 },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  email: { color: '#555' },
  company: { color: '#777' },
  chevron: { fontSize: 24, color: '#ccc', marginLeft: 8 },
  error: { color: 'red' },
});



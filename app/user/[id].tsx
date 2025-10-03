import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useUsers } from '@/contexts/UsersContext';

export default function UserDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = useMemo(() => Number(id), [id]);
  const { users, updateUser, deleteUser } = useUsers();
  const user = users.find(u => u.id === numericId);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [website, setWebsite] = useState(user?.website ?? '');

  if (!user) {
    return (
      <View style={styles.center}> 
        <Text>User not found.</Text>
      </View>
    );
  }

  function handleSave() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Invalid input', 'Name and Email are required.');
      return;
    }
    updateUser(user.id, {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      website: website.trim() || undefined,
    });
    router.back();
  }

  function handleDelete() {
    Alert.alert('Delete user', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { deleteUser(user.id); router.back(); } },
    ]);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>User Details</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Website</Text>
          <TextInput value={website} onChangeText={setWebsite} style={styles.input} autoCapitalize="none" />
        </View>

        <Pressable onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  fieldGroup: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  button: { marginTop: 16, backgroundColor: '#007AFF', paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '600' },
  deleteButton: { backgroundColor: '#FF3B30' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});



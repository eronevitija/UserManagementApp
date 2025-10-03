import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useUsers } from '@/contexts/UsersContext';

export default function AddUserRoute() {
  const { addUser } = useUsers();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const isValid = useMemo(() => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return false;
    const emailOk = /.+@.+\..+/.test(trimmedEmail);
    return emailOk;
  }, [name, email]);

  function handleSave() {
    if (!isValid) {
      Alert.alert('Invalid input', 'Please enter a valid name and email.');
      return;
    }
    addUser({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, website: website.trim() || undefined });
    router.back();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add User</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Full name" style={styles.input} autoCapitalize="words" />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="name@example.com" style={styles.input} autoCapitalize="none" keyboardType="email-address" />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone (optional)</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="Phone number" style={styles.input} keyboardType="phone-pad" />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Website (optional)</Text>
          <TextInput value={website} onChangeText={setWebsite} placeholder="example.com" style={styles.input} autoCapitalize="none" />
        </View>

        <Pressable onPress={handleSave} disabled={!isValid} style={[styles.button, !isValid && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Save</Text>
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
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: 'white', fontWeight: '600' },
});



import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUsers } from '../../contexts/UsersContext';
import styles from '../../styles/AddUser.styled';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { addUser } = useUsers();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      addUser({
        name,
        email,
        phone: '',
        website: '',
      });

      setName('');
      setEmail('');
      setError('');

      router.replace('/');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1,backgroundColor:'#f0f2f5'}}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add New User</Text>

          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Name"
            onChangeText={setName}
            placeholderTextColor="#888"
            returnKeyType='next'
            onSubmitEditing={()=>{}}
            editable={!loading}
          />

          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="test@example.com"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
            returnKeyType='done'
            onSubmitEditing={handleSubmit}
            editable={!loading}
          />

          {error ? <Text style={styles.errorTxt}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.addBtn, loading && { opacity: 0.6 }]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnTxt}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
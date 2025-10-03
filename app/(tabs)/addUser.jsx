import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from '../../styles/AddUser.styled';

export default function AddUser({ handleAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    handleAddUser({
      name,
      email,
      phone: '',
      website: '',
      address: '',
    });

    setName('');
    setEmail('');
    setError('');
    router.push('/users');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.userInfo}>
        <Text style={styles.title}>Add New User</Text>

        <TextInput
          style={styles.textInput}
          value={name}
          placeholder="Name"
          onChangeText={setName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="test@example.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        {error ? <Text style={styles.errorTxt}>{error}</Text> : null}

        <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
          <Text style={styles.title}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
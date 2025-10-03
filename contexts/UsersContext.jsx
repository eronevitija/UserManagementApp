import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const UsersContext = createContext();

const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextLocalId, setNextLocalId] = useState(-1);

  const loadUsers = async () => {
    if (users.length > 0 || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(USER_API_URL);
      setUsers(response.data);
    } catch (e) {
      setError(e && e.message ? e.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (user) => {
    setUsers(prev => [
      { id: nextLocalId, name: user.name, email: user.email, phone: user.phone, website: user.website },
      ...prev
    ]);
    setNextLocalId(id => id - 1);

    try {
      await axios.post(USER_API_URL, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    } catch (e) {
      setError(e && e.message ? e.message : 'Failed to add user to API');
    }
  };

  const updateUser = (id, update) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...update } : u)));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const value = {
    users,
    isLoading,
    error,
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  return ctx;
}

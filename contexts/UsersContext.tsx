import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

export type Company = {
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: Address;
  company?: Company;
};

type UsersContextValue = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
  addUser: (user: Pick<User, 'name' | 'email' | 'phone' | 'website'>) => void;
  updateUser: (id: number, update: Partial<User>) => void;
  deleteUser: (id: number) => void;
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextLocalId, setNextLocalId] = useState(-1);

  const loadUsers = useCallback(async () => {
    if (users.length > 0 || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data: User[] = await response.json();
      setUsers(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [users.length, isLoading]);

  const addUser = useCallback((user: Pick<User, 'name' | 'email' | 'phone' | 'website'>) => {
    setUsers(prev => [{ id: nextLocalId, name: user.name, email: user.email, phone: user.phone, website: user.website }, ...prev]);
    setNextLocalId(id => id - 1);
  }, [nextLocalId]);

  const updateUser = useCallback((id: number, update: Partial<User>) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...update } : u)));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const value = useMemo<UsersContextValue>(() => ({
    users,
    isLoading,
    error,
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
  }), [users, isLoading, error, loadUsers, addUser, updateUser, deleteUser]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers must be used within a UsersProvider');
  return ctx;
}






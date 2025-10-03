import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUsers } from "../../contexts/UsersContext";

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { users, deleteUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const foundUser = users.find(
      (u) => String(u.id) === String(id) || u.email === id
    );
    if (foundUser) {
      setUser(foundUser);
      setLoading(false);
      return;
    }

    setUser(null);
    setLoading(false);
  }, [id, users]);

  const handleDelete = () => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteUser(user.id);
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={localStyles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={localStyles.centered}>
        <MaterialIcons name="error-outline" size={28} color="red" />
        <Text style={{ color: "#333", marginTop: 8, fontSize: 16 }}>
          No user found for Id {id}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>{user.name}</Text>
        <Text style={localStyles.subtitle}>User Information</Text>

        <View style={localStyles.infoRow}>
          <Ionicons name="mail-outline" size={22} color="#4CAF50" />
          <Text style={localStyles.infoText}>{user.email}</Text>
        </View>

        <View style={localStyles.infoRow}>
          <Ionicons name="call-outline" size={22} color="#4CAF50" />
          <Text style={localStyles.infoText}>{user.phone || "N/A"}</Text>
        </View>

        <View style={localStyles.infoRow}>
          <Ionicons name="globe-outline" size={22} color="#4CAF50" />
          <Text style={localStyles.infoText}>{user.website || "N/A"}</Text>
        </View>

        <View style={localStyles.infoRow}>
          <FontAwesome5 name="map-marker-alt" size={20} color="#4CAF50" />
          <Text style={localStyles.infoText}>
            {user.address
              ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
              : "N/A"}
          </Text>
        </View>

        <TouchableOpacity
          style={localStyles.deleteBtn}
          onPress={handleDelete}
        >
          <MaterialIcons name="delete-outline" size={20} color="#fff" />
          <Text style={localStyles.deleteBtnText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    justifyContent: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
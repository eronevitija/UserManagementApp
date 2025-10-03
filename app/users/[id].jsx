import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${USER_API_URL}/${id}`);
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch user:", error.message);
        }
        console.error("Failed to fetch user:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

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
          <Text style={localStyles.infoText}>{user.phone}</Text>
        </View>

        <View style={localStyles.infoRow}>
          <Ionicons name="globe-outline" size={22} color="#4CAF50" />
          <Text style={localStyles.infoText}>{user.website}</Text>
        </View>

        <View style={localStyles.infoRow}>
          <FontAwesome5 name="map-marker-alt" size={20} color="#4CAF50" />
          <Text style={localStyles.infoText}>
            {user.address
              ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
              : "N/A"}
          </Text>
        </View>
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
});
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Verification</Text>
      <Text style={styles.subtitle}>
        Scan a QR code to verify its authenticity
      </Text>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Scanner")}
      >
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.historyButtonText}>View Scan History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a73e8",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 48,
  },
  scanButton: {
    backgroundColor: "#1a73e8",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  historyButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1a73e8",
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  historyButtonText: {
    color: "#1a73e8",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 24,
    padding: 12,
  },
  logoutButtonText: {
    color: "#999",
    fontSize: 16,
  },
});

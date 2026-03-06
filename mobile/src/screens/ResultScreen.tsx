import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type ResultParams = {
  Result: {
    verified: boolean;
    message: string;
    failureReason: string | null;
    qrId: string | null;
  };
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<ResultParams, "Result">;
};

export default function ResultScreen({ navigation, route }: Props) {
  const { verified, message, failureReason, qrId } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.resultCard,
          verified ? styles.successCard : styles.failureCard,
        ]}
      >
        <Text style={styles.icon}>{verified ? "\u2713" : "\u2717"}</Text>
        <Text style={styles.resultTitle}>
          {verified ? "Verified" : "Not Verified"}
        </Text>
        <Text style={styles.resultMessage}>{message}</Text>

        {qrId && (
          <Text style={styles.qrId}>QR ID: {qrId}</Text>
        )}

        {failureReason && (
          <View style={styles.errorBox}>
            <Text style={styles.errorLabel}>Reason:</Text>
            <Text style={styles.errorText}>{failureReason}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.scanAgainButton}
        onPress={() => navigation.replace("Scanner")}
      >
        <Text style={styles.scanAgainText}>Scan Another Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
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
  resultCard: {
    width: "100%",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    marginBottom: 32,
  },
  successCard: {
    backgroundColor: "#e8f5e9",
    borderWidth: 2,
    borderColor: "#4caf50",
  },
  failureCard: {
    backgroundColor: "#ffebee",
    borderWidth: 2,
    borderColor: "#f44336",
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  resultMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  qrId: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
  },
  errorBox: {
    marginTop: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    padding: 12,
    width: "100%",
  },
  errorLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d32f2f",
    marginBottom: 4,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  scanAgainButton: {
    backgroundColor: "#1a73e8",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  scanAgainText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  homeButton: {
    padding: 12,
  },
  homeButtonText: {
    color: "#1a73e8",
    fontSize: 16,
  },
});

import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getLocalScanHistory, LocalScanEntry } from "../services/storage";

export default function HistoryScreen() {
  const [scans, setScans] = useState<LocalScanEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    const history = await getLocalScanHistory();
    setScans(history);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  function renderItem({ item }: { item: LocalScanEntry }) {
    const isValid = item.verification_result === "valid";
    const isError = item.verification_result === "error";
    const date = new Date(item.scanned_at);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusBadge,
              isValid
                ? styles.validBadge
                : isError
                ? styles.errorBadge
                : styles.invalidBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {isValid ? "Valid" : isError ? "Error" : "Invalid"}
            </Text>
          </View>
          <Text style={styles.dateText}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Text>
        </View>
        <Text style={styles.payloadText} numberOfLines={2}>
          {item.qr_payload}
        </Text>
        {item.failure_reason && (
          <Text style={styles.failureText}>{item.failure_reason}</Text>
        )}
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scans.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No scan history yet</Text>
          <Text style={styles.emptySubtext}>
            Your QR code scan results will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={scans}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  validBadge: {
    backgroundColor: "#e8f5e9",
  },
  invalidBadge: {
    backgroundColor: "#ffebee",
  },
  errorBadge: {
    backgroundColor: "#fff3e0",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 14,
    color: "#999",
  },
  payloadText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  failureText: {
    fontSize: 14,
    color: "#d32f2f",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

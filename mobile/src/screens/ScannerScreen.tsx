import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { verifyQRCode } from "../services/api";
import { saveScanLocally, LocalScanEntry } from "../services/storage";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function ScannerScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    if (!permission?.granted && !permission?.canAskAgain) {
      Alert.alert(
        "Camera Permission Required",
        "This app needs camera access to scan QR codes for verification. Please enable camera access in your device settings.",
        [{ text: "OK" }]
      );
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          This app requires camera access to scan and verify QR codes. Your
          camera is only used for scanning and no images are stored.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleBarCodeScanned({ data }: { data: string }) {
    if (scanned || verifying) return;
    setScanned(true);
    setVerifying(true);

    try {
      const result = await verifyQRCode(data);

      const entry: LocalScanEntry = {
        id: Date.now().toString(),
        qr_payload: data,
        verification_result: result.verified ? "valid" : "invalid",
        failure_reason: result.failure_reason,
        scanned_at: new Date().toISOString(),
      };
      await saveScanLocally(entry);

      navigation.replace("Result", {
        verified: result.verified,
        message: result.message,
        failureReason: result.failure_reason,
        qrId: result.qr_id,
      });
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError && err.message === "Network request failed";

      const entry: LocalScanEntry = {
        id: Date.now().toString(),
        qr_payload: data,
        verification_result: "error",
        failure_reason: isNetworkError
          ? "Network unavailable"
          : "Verification request failed",
        scanned_at: new Date().toISOString(),
      };
      await saveScanLocally(entry);

      if (isNetworkError) {
        navigation.replace("Result", {
          verified: false,
          message: "Network Unavailable",
          failureReason:
            "Unable to verify QR code. Please check your internet connection and try again.",
          qrId: null,
        });
      } else {
        navigation.replace("Result", {
          verified: false,
          message: "Verification Error",
          failureReason:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred during verification.",
          qrId: null,
        });
      }
    } finally {
      setVerifying(false);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flashOn}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.instructionText}>
            Position the QR code within the frame
          </Text>
        </View>
      </CameraView>

      {verifying && (
        <View style={styles.verifyingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.verifyingText}>Verifying...</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlashOn(!flashOn)}
        >
          <Text style={styles.flashButtonText}>
            {flashOn ? "Flash ON" : "Flash OFF"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#f5f5f5",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#1a73e8",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  instructionText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 24,
    textAlign: "center",
  },
  verifyingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  verifyingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 12,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  flashButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  flashButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: "#1a73e8",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

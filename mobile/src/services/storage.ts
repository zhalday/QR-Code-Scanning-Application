import AsyncStorage from "@react-native-async-storage/async-storage";

const SCAN_HISTORY_KEY = "local_scan_history";

export interface LocalScanEntry {
  id: string;
  qr_payload: string;
  verification_result: "valid" | "invalid" | "error";
  failure_reason: string | null;
  scanned_at: string;
}

export async function saveScanLocally(entry: LocalScanEntry): Promise<void> {
  const existing = await getLocalScanHistory();
  existing.unshift(entry);
  // Keep only the last 500 entries locally
  const trimmed = existing.slice(0, 500);
  await AsyncStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(trimmed));
}

export async function getLocalScanHistory(): Promise<LocalScanEntry[]> {
  const data = await AsyncStorage.getItem(SCAN_HISTORY_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export async function clearLocalScanHistory(): Promise<void> {
  await AsyncStorage.removeItem(SCAN_HISTORY_KEY);
}

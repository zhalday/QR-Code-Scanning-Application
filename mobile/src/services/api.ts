import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://api.example.com"; // Replace with actual AWS endpoint

const TOKEN_KEY = "auth_token";

async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface VerifyResponse {
  verified: boolean;
  qr_id: string | null;
  message: string;
  failure_reason: string | null;
}

export interface ScanHistoryItem {
  id: number;
  qr_payload: string;
  verification_result: string;
  failure_reason: string | null;
  scanned_at: string;
}

export interface ScanHistoryResponse {
  scans: ScanHistoryItem[];
  total: number;
}

export async function login(
  username: string,
  password: string
): Promise<TokenResponse> {
  return request<TokenResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logout(): Promise<void> {
  await request("/api/auth/logout", { method: "POST" });
  await removeToken();
}

export async function verifyQRCode(payload: string): Promise<VerifyResponse> {
  return request<VerifyResponse>("/api/verify", {
    method: "POST",
    body: JSON.stringify({ payload }),
  });
}

export async function getScanHistory(
  skip = 0,
  limit = 50
): Promise<ScanHistoryResponse> {
  return request<ScanHistoryResponse>(
    `/api/scan-history?skip=${skip}&limit=${limit}`
  );
}

export async function registerPushToken(token: string): Promise<void> {
  await request("/api/notifications/register-token", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

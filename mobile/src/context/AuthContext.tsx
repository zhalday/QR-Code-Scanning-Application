import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as api from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await SecureStore.getItemAsync("auth_token");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }

  async function login(username: string, password: string) {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.login(username, password);
      await api.setToken(response.access_token);
      setIsAuthenticated(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await api.logout();
    } catch {
      // Even if the API call fails, clear local state
    }
    await api.removeToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/services/api";

interface AuthState {
  token: string | null;
  username: string | null;
  role: "ADMIN" | "USER" | null;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    token: localStorage.getItem("authToken"),
    username: localStorage.getItem("authUser"),
    role: (localStorage.getItem("authRole") as "ADMIN" | "USER" | null) || null,
  });

  const saveAuth = (token: string, username: string, role: "ADMIN" | "USER") => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", username);
    localStorage.setItem("authRole", role);
    setState({ token, username, role });
  };

  const login = async (username: string, password: string) => {
    const res = await authApi.login(username, password);
    saveAuth(res.data.token, res.data.username, res.data.role);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await authApi.register(username, email, password);
    saveAuth(res.data.token, res.data.username, res.data.role);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");
    setState({ token: null, username: null, role: null });
  };

  useEffect(() => {
    // Keep state in sync with localStorage when user opens multiple tabs
    const handler = () => {
      setState({
        token: localStorage.getItem("authToken"),
        username: localStorage.getItem("authUser"),
        role: (localStorage.getItem("authRole") as "ADMIN" | "USER" | null) || null,
      });
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        username: state.username,
        role: state.role,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

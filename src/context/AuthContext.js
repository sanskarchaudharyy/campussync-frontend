"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  // Restore user after refresh
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (
    email,
    password
  ) => {
    try {
      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      setUser(res.data.user);

      router.push("/dashboard");
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.error ||
          "Login failed"
      );
    }
  };

  // Register
  const register = async (
    formData
  ) => {
    try {
      const res = await api.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      setUser(res.data.user);

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Register Error:",
        error.response?.data
      );

      throw new Error(
        error.response?.data
          ?.error ||
          "Registration failed"
      );
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};
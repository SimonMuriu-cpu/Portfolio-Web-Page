import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Update email to match backend expectations
  const login = async (password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: "muriumsimon6@gmail.com", // must match process.env.ADMIN_EMAIL on server
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser({ ...decoded });

      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        logout();
      } else {
        setUser({ ...decoded });
      }
    } catch (err) {
      console.error("Token decode error:", err);
      logout();
    }
  };

  useEffect(() => {
    checkAuth(); // Check auth on mount
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

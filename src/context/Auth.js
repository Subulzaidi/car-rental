import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:9000/api";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Use a function to initialize state based on localStorage
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
  });

  useEffect(() => {
    // Update localStorage whenever auth changes
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

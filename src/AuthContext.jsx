import { createContext, useContext, useState } from "react";

import { api } from "./api.js";

const AuthContext = createContext(null);

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem("sesion"));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion);

  async function login(correo, password) {
    const data = await api("/auth/login", { method: "POST", body: { correo, password } });
    localStorage.setItem("sesion", JSON.stringify(data));
    setSesion(data);
  }

  function logout() {
    localStorage.removeItem("sesion");
    setSesion(null);
  }

  return (
    <AuthContext.Provider value={{ sesion, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;
    api.get("/users/me").then(res => setUser(res.data.user)).catch(() => logout());
  }, []);

  const login = async (email, password, remember) => {
    const { data } = await api.post("/users/login", { email, password });
    if (remember) localStorage.setItem("token", data.token);
    else sessionStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post("/users/register", payload);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, login, register, logout }}>{children}</AuthCtx.Provider>;
}

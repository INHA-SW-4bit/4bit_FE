import { useState, type ReactNode } from "react";
import { AuthContext, type Role } from "../contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialRole = (): Role | null => {
  try {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole") as Role;

    if (token && role) return role;
  } catch (error) {
    console.error("인증 정보 파싱 실패 error: ", error);
  }
  return null;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [role, setRole] = useState<Role | null>(getInitialRole);

  const login = (role: Role, token: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userRole", role);

    setRole(role);
  };

  const value = { role, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

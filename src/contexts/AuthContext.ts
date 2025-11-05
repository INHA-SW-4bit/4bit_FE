import { createContext, useContext } from "react";

export type Role = "STUDENT" | "PROFESSOR";
export interface AuthContextType {
  role: Role | null;
  login: (role: "STUDENT" | "PROFESSOR", token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth Error");
  }

  return context;
};

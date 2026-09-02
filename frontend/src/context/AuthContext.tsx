import { getCurrentUser } from "@/api/auth";
import type { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null | undefined;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const checkAuth = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const clearAuth = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, checkAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

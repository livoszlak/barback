"use client";
import { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useContext } from "react";

interface AuthContextType {
  user: User | null;
  isManager: boolean;
  setSession: (session: any) => void;
  setAuthState: (authState: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isManager, setIsManager] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState(null);

  const resetAuthContext = () => {
    setAuthState(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsManager(session.user.role === "authenticated");
      }
      setIsLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (session) {
        setUser(session.user);
        setIsManager(session.user.role === "authenticated");
      } else {
        setUser(null);
        setIsManager(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const setSession = (session: any) => {
    if (session) {
      setUser(session.user);
      setIsManager(session.user.role === "authenticated");
    } else {
      setUser(null);
      setIsManager(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isManager, setSession, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

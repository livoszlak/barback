"use client";

import { createContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useContext } from "react";
import {
  OrganizationUser,
  AuthContextType,
  OrganizationSession,
} from "@/types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | OrganizationUser | null>(null);
  const [isManager, setIsManager] = useState(false);
  const [isViewer, setIsViewer] = useState(false);
  const [organizationName, setOrganizationName] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for stored organization session first
      const orgSession = localStorage.getItem("orgSession");
      if (orgSession) {
        const parsed = JSON.parse(orgSession);
        setUser(parsed.user);
        setIsViewer(true);
        setOrganizationName(parsed.user.organizationName);
      } else {
        // Check Supabase session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setIsManager(session.user.role === "authenticated");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        // Clear both types of sessions
        localStorage.removeItem("orgSession");
        setUser(null);
        setIsManager(false);
        setIsViewer(false);
        setOrganizationName(undefined);
      } else if (session) {
        setUser(session.user);
        setIsManager(session.user.role === "authenticated");
        setIsViewer(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const setSession = (session: Session | OrganizationSession) => {
    if (!session) {
      localStorage.removeItem("orgSession");
      setUser(null);
      setIsManager(false);
      setIsViewer(false);
      setOrganizationName(undefined);
      return;
    }

    // Handle organization viewer session
    if (session.user.role === "viewer" && "access_token" in session) {
      localStorage.setItem("orgSession", JSON.stringify(session));
      setUser(session.user);
      setIsViewer(true);
      setIsManager(false);
      setOrganizationName((session.user as OrganizationUser).organizationName);
    } else {
      // Handle regular Supabase session
      setUser(session.user);
      setIsManager(session.user.role === "authenticated");
      setIsViewer(false);
      setOrganizationName(undefined);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isManager,
        isViewer,
        organizationName,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

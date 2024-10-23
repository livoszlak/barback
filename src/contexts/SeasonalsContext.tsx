"use client";
import { createContext, useContext, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { OrganizationUser } from "@/types/types";
import { AuthContext } from "./AuthContext";

type SeasonalsContextType = {
  user?: User | OrganizationUser;
};

export const SeasonalsContext = createContext<SeasonalsContextType>({});

export const useSeasonalsContext = () => useContext(SeasonalsContext);

export function SeasonalsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {}, []);
  const authContext = useContext(AuthContext);

  return (
    <SeasonalsContext.Provider value={{ user: authContext?.user ?? undefined }}>
      {children}
    </SeasonalsContext.Provider>
  );
}

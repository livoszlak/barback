"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { OrganizationType, OrganizationUser } from "@/types/types";
import { AuthContext } from "./AuthContext";

//TODO: decide if this should be dashboardcontext instead

type DashboardContextType = {
  user?: User | OrganizationUser;
  organization?: OrganizationType[];
  contextOrgs?: OrganizationType[];
};

type DashboardProviderProps = {
  children: React.ReactNode;
  organizations: OrganizationType[];
};

export const DashboardContext = createContext<DashboardContextType>({});

export const useDashboardContext = () => useContext(DashboardContext);

export function DashboardProvider({
  children,
  organizations,
}: DashboardProviderProps) {
  const [contextOrgs, setContextOrgs] = useState<OrganizationType[]>([]);
  //const authContext = useContext(AuthContext);
  useEffect(() => {
    setContextOrgs(organizations);
  }, []);

  return (
    <DashboardContext.Provider value={{ contextOrgs }}>
      {children}
    </DashboardContext.Provider>
  );
}

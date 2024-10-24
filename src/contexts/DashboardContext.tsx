"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { OrganizationType, OrganizationUser } from "@/types/types";
import { Manager, Classic } from "@/lib/zod";
import { AuthContext } from "./AuthContext";

type DashboardContextType = {
  user?: User | OrganizationUser;
  organization?: OrganizationType[];
  contextOrgs?: OrganizationType[];
  contextManagers?: Manager[];
  contextClassics?: Classic[];
};

type DashboardProviderProps = {
  children: React.ReactNode;
  organizations: OrganizationType[];
  managers: Manager[];
  classics: Classic[];
};

export const DashboardContext = createContext<DashboardContextType>({});

export const useDashboardContext = () => useContext(DashboardContext);

export function DashboardProvider({
  children,
  organizations,
  managers,
  classics,
}: DashboardProviderProps) {
  const [contextOrgs, setContextOrgs] = useState<OrganizationType[]>([]);
  const [contextManagers, setContextManagers] = useState<Manager[]>([]);
  const [contextClassics, setContextClassics] = useState<Classic[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setContextOrgs(organizations);
    setContextManagers(managers);
    setContextClassics(classics);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ contextOrgs, contextManagers, contextClassics }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { OrganizationType } from "@/actions/organizations/getOrganizations";

interface OrganizationContextType {
  organizations: OrganizationType[];
  loginAction: (data: {
    organizationId: string;
    accessCode: string;
  }) => Promise<any>;
}

const OrganizationContext = createContext<OrganizationContextType | null>(null);

export function OrganizationProvider({
  children,
  organizations,
  loginAction,
}: {
  children: ReactNode;
  organizations: OrganizationType[];
  loginAction: (data: {
    organizationId: string;
    accessCode: string;
  }) => Promise<any>;
}) {
  return (
    <OrganizationContext.Provider value={{ organizations, loginAction }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
}

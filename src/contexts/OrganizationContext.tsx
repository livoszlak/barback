"use client";

import React, { createContext, useContext } from "react";
import { OrganizationProviderProps } from "@/types/types";

const OrganizationContext = createContext<OrganizationProviderProps | null>(
  null
);

export function OrganizationProvider({
  children,
  organizations,
  loginAction,
}: OrganizationProviderProps) {
  return (
    <OrganizationContext.Provider
      value={{ children, organizations, loginAction }}
    >
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

import { User, Session } from "@supabase/supabase-js";

export type OrganizationUser = {
  organizationId: string;
  organizationName: string;
  role: "viewer";
};

export type OrganizationSession = {
  user: OrganizationUser;
  access_token: string;
};

export type AuthContextType = {
  user: User | OrganizationUser | null;
  isManager: boolean;
  isViewer: boolean;
  organizationName?: string;
  setSession: (session: any) => void;
  setAuthState: (authState: any) => void;
}


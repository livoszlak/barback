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

export type OrganizationType = {
  id: string;
  organizationname: string;
  accesscode: string;
};

export type OrganizationLoginType = Pick<OrganizationType, "id" | "accesscode">;

export type OrganizationContextType = {
  children: React.ReactNode;
  organizations: OrganizationType[];
  loginAction: (data: {
    organizationId: string;
    accessCode: string;
  }) => Promise<OrganizationLoginType>;
};

export type AuthContextType = {
  user: User | OrganizationUser | null;
  isManager: boolean;
  isViewer: boolean;
  organizationName?: string;
  setSession: (session: Session | OrganizationSession) => void;
};

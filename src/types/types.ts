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

export type OrganizationProviderProps = {
  children: React.ReactNode;
  organizations: OrganizationType[];
  loginAction: (data: {
    organizationId: string;
    accessCode: string;
  }) => Promise<
    | { failure: string; success?: undefined }
    | {
        success: {
          session: OrganizationSession;
        };
        failure?: undefined;
      }
  >;
};

export type AuthContextType = {
  user: User | OrganizationUser | null;
  isManager: boolean;
  isViewer: boolean;
  organizationName?: string;
  setSession: (session: Session | OrganizationSession) => void;
};

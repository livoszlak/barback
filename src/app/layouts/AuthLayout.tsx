import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthLayout;

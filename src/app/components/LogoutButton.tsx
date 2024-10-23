"use client";
import { logoutManager } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { logoutOrganization } from "@/actions/auth/logout";

export default function LogoutButton() {
  const router = useRouter();
  const authContext = useAuthContext();

  const handleLogout = async () => {
    try {
      await logoutManager();
      await logoutOrganization();

      // Clear local storage
      localStorage.removeItem("orgSession");

      // Clear auth context
      authContext?.setSession(null);

      // Redirect to home or login page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </button>
  );
}

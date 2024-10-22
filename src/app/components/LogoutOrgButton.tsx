"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { logoutOrganization } from "@/actions/auth/logout";

export const LogoutOrgButton = () => {
  const router = useRouter();
  const authContext = useAuthContext();

  const handleLogout = async () => {
    try {
      const result = await logoutOrganization();

      if (result.success) {
        // Clear local storage
        localStorage.removeItem("orgSession");

        // Clear auth context
        authContext?.setSession(null);

        // Redirect to home or login page
        router.push("/");
        router.refresh();
      } else {
        console.error("Logout failed:", result.failure);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
      Logout org
    </button>
  );
};

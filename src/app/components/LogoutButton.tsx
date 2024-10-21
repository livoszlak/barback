"use client";
import { logoutManager } from "@/actions/auth/logout";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        logoutManager();
      }}
    >
      Logout
    </button>
  );
}

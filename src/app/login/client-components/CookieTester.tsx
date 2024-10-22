"use client";
import { generateCustomJWT } from "@/utils/generateToken";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient;

export const useCustomSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get session from local storage (either Supabase session or spoofed session)
    const savedSession = JSON.parse(
      localStorage.getItem("supabase.auth.token") || "null"
    );
    setSession(savedSession);
  }, []);

  return session;
};

const customJWT = generateCustomJWT("user-id-123");

const customSession = {
  access_token: customJWT,
  refresh_token: null,
  expires_in: 3600,
  user: {
    id: "user-id-123",
    role: "viewer",
    email: "test.testsson@test.com",
  },
};

localStorage.setItem("supabase.auth.token", JSON.stringify(customSession));

export default function CookieTester() {
  const session = useCustomSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Role: {session.user.role}</h1>
      <p>User ID: {session.user.id}</p>
    </div>
  );
}

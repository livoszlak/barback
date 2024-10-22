"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const logoutManager = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { failure: error.message };
  }
  return { success: true };
};

export const logoutOrganization = async () => {
  try {
    // Clear the organization viewer token cookie
    cookies().delete("org_viewer_token");

    // localStorage needs to be handled on the client side since this is a server action
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { failure: "An error occurred during logout" };
  }
};

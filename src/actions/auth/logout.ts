"use server";
import { createClient } from "@/utils/supabase/server";

export const logoutManager = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { failure: error.message };
  }
  return { success: true };
};

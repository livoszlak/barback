"use server";
import { createClient } from "@/utils/supabase/server";

export const loginManager = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    //console.log(error);
    return { failure: error.message };
  }
  //console.log(data);
  const { user, session } = data;
  return { success: { user, session } };
};

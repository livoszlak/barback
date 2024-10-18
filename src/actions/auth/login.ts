//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";

export async function loginManager(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    //console.log(error);
    return error;
  } else {
    //console.log(data);
    return data;
  }
}

import { redirect } from "next/navigation";
//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";

export default async function Dashboard() {
  const supabase = createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  console.log(error);

  if (error) {
    //redirect("/");
    console.log("uh oh");
  }

  return <>Hej dashboard!</>;
}

import { createClient } from "@/utils/supabase/server";
import { Manager } from "@/lib/zod";

export async function getManagers() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("manager")
    .select("id, name")
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { managersError: "Failed to fetch organizations" };
  }

  return { managers: data as Manager[] };
}

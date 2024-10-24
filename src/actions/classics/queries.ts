import { createClient } from "@/utils/supabase/server";
import { Classic } from "@/lib/zod";

export async function getClassics() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("classic")
    .select("id, name, recipe, method, glass, garnish, tastingNotes, info")
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { classicsError: "Failed to fetch organizations" };
  }

  return { classics: data as Classic[] };
}

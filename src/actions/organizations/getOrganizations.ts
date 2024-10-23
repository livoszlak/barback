import { createClient } from "@/utils/supabase/server";
import { OrganizationType } from "@/types/types";

export async function getOrganizations() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organization")
    .select("id, organizationName, accessCode")
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { error: "Failed to fetch organizations" };
  }

  return { organizations: data as OrganizationType[] };
}

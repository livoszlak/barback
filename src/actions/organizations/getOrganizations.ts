import { createClient } from "@/utils/supabase/server";

export interface OrganizationType {
  id: string;
  organizationname: string;
  accesscode: string;
}

export async function getOrganizations() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organization")
    .select("id, organizationname, accesscode")
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { error: "Failed to fetch organizations" };
  }

  return { organizations: data as OrganizationType[] };
}

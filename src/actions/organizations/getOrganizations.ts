import { createClient } from "@/utils/supabase/server";
import { OrganizationType } from "@/types/types";

export async function getOrganizations() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organization")
    .select("id, userId, organizationName, accessCode, greeting")
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { error: "Failed to fetch organizations" };
  }

  return { organizations: data as OrganizationType[] };
}

export async function getOrganizationsByUserId(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organization")
    .select("id, userId, organizationName, accessCode, greeting")
    .eq("userId", userId)
    .order("id");

  if (error) {
    console.error("Error fetching organizations:", error);
    return { error: "Failed to fetch organizations" };
  }

  return { organizations: data as OrganizationType[] };
}

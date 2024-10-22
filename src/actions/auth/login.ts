"use server";
import { createClient } from "@/utils/supabase/server";
import Jwt from "jsonwebtoken";

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
  console.log("session: ", session);
  return { success: { user, session } };
};

interface OrganizationUser {
  organizationId: string;
  organizationName: string;
  role: "viewer";
}

export const loginOrganization = async ({
  organizationId,
  accessCode,
}: {
  organizationId: string;
  accessCode: string;
}) => {
  try {
    const supabase = createClient();

    // Verify organization and access code
    const { data: org, error } = await supabase
      .from("organization")
      .select("id, organizationname, accesscode")
      .eq("id", organizationId)
      .single();

    if (error || !org) {
      return { failure: "Organization not found" };
    }

    if (org.accesscode.toString() !== accessCode) {
      return { failure: "Invalid access code" };
    }

    // Create payload for JWT
    const payload: OrganizationUser = {
      organizationId: org.id,
      organizationName: org.organizationname,
      role: "viewer",
    };

    // Sign the JWT with secret token
    const token = Jwt.sign(payload, process.env.SECRET_TOKEN!, {
      expiresIn: "24h",
    });

    // Create a session-like object for consistency with AuthContext
    const orgSession = {
      user: {
        id: `org_${org.id}`,
        role: "viewer",
        organizationName: org.organizationname,
        email: null,
      },
      access_token: token,
    };

    console.log(orgSession);

    return { success: { session: orgSession } };
  } catch (error) {
    console.error("Organization login error:", error);
    return { failure: "An error occurred during login" };
  }
};

// Helper function to verify token (can be used in middleware or API routes)
export const verifyOrgToken = (token: string) => {
  try {
    console.log("Verifying token:", token);
    console.log("Using secret:", process.env.SECRET_TOKEN);
    return Jwt.verify(token, process.env.SECRET_TOKEN!) as OrganizationUser;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

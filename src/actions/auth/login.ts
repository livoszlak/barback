"use server";
import { createClient } from "@/utils/supabase/server";
import { OrganizationLogin, ManagerLogin } from "@/lib/zod";
import { OrganizationSession, OrganizationUser } from "@/types/types";
import Jwt from "jsonwebtoken";

export const loginManager = async (formData: ManagerLogin) => {
  const supabase = createClient();
  const email = formData.email;
  const password = formData.password;

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

export const loginOrganization = async (formData: OrganizationLogin) => {
  try {
    const supabase = createClient();

    // Verify organization and access code
    const { data: org, error } = await supabase
      .from("organization")
      .select("id, organizationname, accesscode")
      .eq("id", formData.organizationId)
      .single();

    if (error || !org) {
      return { failure: "Organization not found" };
    }

    if (org.accesscode.toString() !== formData.accessCode) {
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
    const orgSession: OrganizationSession = {
      user: {
        organizationId: `org_${org.id}`,
        role: "viewer",
        organizationName: org.organizationname,
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
// export const verifyOrgToken = (token: string) => {
//   try {
//     console.log("Verifying token:", token);
//     console.log("Using secret:", process.env.SECRET_TOKEN);
//     return Jwt.verify(token, process.env.SECRET_TOKEN!) as OrganizationUser;
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return null;
//   }
// };

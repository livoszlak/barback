import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
/* import { verifyOrgToken } from "@/actions/auth/login"; */

export async function middleware(request: NextRequest) {
  try {
    const supabase = createClient(request);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check for organization viewer token in cookies or headers
    const viewerToken =
      request.cookies.get("org_viewer_token")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "");

    const path = request.nextUrl.pathname;

    if (path.startsWith("/dashboard")) {
      // No authentication at all - redirect to home
      if (!session && !viewerToken) {
        console.log("No authentication found, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If there's a viewer token, verify it
      if (viewerToken) {
        /* const verifiedToken = verifyOrgToken(viewerToken); */

        /*         if (!verifiedToken) {
          console.log("Invalid viewer token, redirecting to home");
          return NextResponse.redirect(new URL("/", request.url));
        } */

        // Valid viewer token - check route restrictions
        if (session?.user.role === "viewer") {
          // Only allow access to specific routes for viewers
          const allowedViewerRoutes = [
            "/dashboard",
            "/dashboard/classics",
            "/dashboard/seasonals",
          ];

          if (!allowedViewerRoutes.includes(path)) {
            console.log("Viewer attempting to access restricted route");
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        }
      }

      // If we reach here, either:
      // 1. User has valid Supabase session (manager)
      // 2. User has valid viewer token and is accessing allowed routes
    }

    // Handle login routes
    if (path.startsWith("/login")) {
      // If already authenticated, redirect to dashboard
      if (session || viewerToken) {
        console.log("Already authenticated, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    // On error, we might want to still allow the request but log the error
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/manager", "/login/user"],
};

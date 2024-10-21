import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware executing for path:", request.nextUrl.pathname);

    const supabase = createClient(request);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log(
      "Session status:",
      session ? "Authenticated" : "Not authenticated"
    );
    if (error) console.log("Session error:", error);

    const path = request.nextUrl.pathname;

    if (path.startsWith("/dashboard")) {
      console.log("Checking dashboard access...");
      if (!session) {
        console.log("No session, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (path.startsWith("/login/manager")) {
      console.log("Checking login access...");
      if (session) {
        console.log("Session exists, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (path.startsWith("/login/user")) {
      console.log("Checking login access...");
      if (session) {
        console.log("Session exists, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    console.log("Proceeding with request");
    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/manager", "/login/user"],
};

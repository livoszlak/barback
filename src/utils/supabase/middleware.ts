import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const createClient = (request: NextRequest) => {
  console.log("Available cookies:", request.cookies.getAll());

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          const cookies: { name: string; value: string }[] = [];
          request.cookies.getAll().forEach((cookie) => {
            cookies.push({ name: cookie.name, value: cookie.value });
          });
          return cookies;
        },
        setAll: (
          cookies: { name: string; value: string; options: CookieOptions }[]
        ) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  return supabase;
};

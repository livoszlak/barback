"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//TODO: move createClient to lib directory

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  const token = data.session?.access_token;
  cookies().set({
    name: "access_token",
    value: token!,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Return session data including JWT token
  return NextResponse.json({ session: data.session });
}

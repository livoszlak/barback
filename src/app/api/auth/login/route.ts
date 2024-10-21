import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  console.log(request);
  const { email, password } = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const token = data.session?.access_token;
  cookies().set("access_token", token!, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return NextResponse.json({ session: data.session });
}

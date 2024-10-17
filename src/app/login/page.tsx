"use client";
// import { useState } from "react";
//import { supabase } from "../api/auth/login/route";
import { createClient } from "@supabase/supabase-js";

export default function Login() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "hej@hej.hej",
      password: "hejhejhej",
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">log in</button>
      </form> */}
      <button type="button" onClick={handleClick}>
        login
      </button>
    </>
  );
}

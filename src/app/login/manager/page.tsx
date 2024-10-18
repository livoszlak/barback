"use client";
import { useState } from "react";
//import { supabase } from "../api/auth/login/route";
//import { supabase } from "@/lib/supabase";
import { loginManager } from "@/actions/auth/login";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Manager() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await loginManager(email, password);
    if (response instanceof AuthError) {
      console.log(response);
      router.push("/");
      //TODO: error handling
    } else {
      //console.log(response);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
      </form>
      {/* <button type="button" onClick={loginManager}>
        login
      </button> */}
    </>
  );
}

/* import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; */

import AuthForm from "../client-components/AuthForm";

export default function Manager() {
  /*   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.status !== 200) {
      console.log(result.error);
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }; */

  return (
    <>
      <AuthForm />
      {/*       <form onSubmit={handleSubmit}>
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
    </>
  );
}

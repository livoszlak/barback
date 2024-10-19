"use client";

import { loginManager } from "@/actions/auth/login";
import React, { useState } from "react";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // sign in logic
    const result = await loginManager({ email, password });
    if (result.failure) {
      console.log("Login action failure :", result.failure);
    }
    console.log(result);
    if (result.success) {
      setMessage("Sign in successful");
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={handleSubmit}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {message}
        </p>
      )}

      <button
        type="submit"
        className="rounded-md px-4 py-2 bg-foreground text-background"
      >
        Sign In
      </button>
    </form>
  );
};

export default AuthForm;

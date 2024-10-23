"use client";

import { loginManager } from "@/actions/auth/login";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ManagerLogin } from "@/lib/zod";
import DOMPurify from "dompurify";

const AuthForm: React.FC = () => {
  /*   const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); */
  const [formData, setFormData] = useState<ManagerLogin>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await loginManager(formData);
    if (result.failure) {
      console.log("Login action failure :", result.failure);
      setMessage(result.failure);
    } else if (result.success) {
      console.log(result);
      authContext?.setSession(result.success.session);
      setMessage("Sign in successful");
      router.push("/dashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: DOMPurify.sanitize(e.target.value),
    });
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
        id="email"
        name="email"
        placeholder="you@example.com"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        id="password"
        type="password"
        name="password"
        placeholder="••••••••"
        required
        value={formData.password}
        onChange={handleChange}
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

"use client";

import { loginManager } from "@/actions/auth/login";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ManagerLogin, managerLoginSchema } from "@/lib/zod";
import DOMPurify from "dompurify";
import { ManagerLoginErrors } from "@/types/zod-errors";
import { LoginErrors } from "@/types/types";
import { validateFormData } from "@/utils/zod-validation";

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState<ManagerLogin>({
    email: "",
    password: "",
  });
  const [zodErrors, setZodErrors] = useState<ManagerLoginErrors>({});
  const [loginError, setLoginError] = useState<LoginErrors>("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors } = validateFormData(managerLoginSchema, formData);

    if (errors) {
      setZodErrors(errors);
    } else {
      setZodErrors({});
    }

    const result = await loginManager(formData);
    if (result.failure) {
      setLoginError(result.failure);
    } else if (result.success) {
      authContext?.setSession(result.success.session);
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

      {zodErrors.email && (
        <p className={`mt-4 p-4 text-center rounded`}>{zodErrors.email}</p>
      )}

      {loginError && (
        <p className={`mt-4 p-4 text-center rounded`}>{loginError}</p>
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

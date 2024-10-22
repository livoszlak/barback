"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useOrganization } from "@/contexts/OrganizationContext";
import { OrganizationLogin, organizationLoginSchema } from "@/lib/zod";
import { validateFormData } from "@/utils/zod-validation";
import { OrganlizationLoginErrors } from "@/types/zod-errors";
import DOMPurify from "dompurify";

const OrganizationLoginForm = () => {
  const { organizations, loginAction } = useOrganization();
  const [formData, setFormData] = useState<OrganizationLogin>({
    organizationId: "",
    accessCode: "",
  });
  const [errors, setErrors] = useState<OrganlizationLoginErrors>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleSuccess = (session: any) => {
    document.cookie = `org_viewer_token=${
      session.access_token
    }; path=/; max-age=${24 * 60 * 60}`;
    authContext?.setSession(session);
    router.push("/dashboard");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: DOMPurify.sanitize(e.target.value), // Update the relevant field based on the input name
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const { errors, data } = validateFormData(
      organizationLoginSchema,
      formData
    );
    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
    }
    try {
      const result = await loginAction(formData);

      if (result.failure) {
        setMessage(result.failure);
      } else if (result.success) {
        handleSuccess(result.success.session);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Organization Login
      </h2>

      <label className="text-md" htmlFor="organizationId">
        Organization
      </label>
      <select
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        id="organizationId"
        name="organizationId"
        required
        value={formData.organizationId}
        onChange={handleChange}
        disabled={isLoading}
      >
        <option value="">Select Organization</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.organizationname}
          </option>
        ))}
      </select>

      <label className="text-md" htmlFor="accessCode">
        Access Code
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        inputMode="numeric"
        //TODO: revert to password
        id="accessCode"
        name="accessCode"
        placeholder="Enter access code"
        required
        value={formData.accessCode}
        onChange={handleChange}
        disabled={isLoading}
      />

      {message && (
        <p
          className={`mt-4 p-4 text-center rounded ${
            message.includes("error") || message.includes("failed")
              ? "bg-red-100 text-red-700"
              : "bg-foreground/10 text-foreground"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="rounded-md px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Access Dashboard"}
      </button>
    </form>
  );
};

export default OrganizationLoginForm;

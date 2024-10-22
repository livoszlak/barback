import { getOrganizations } from "@/actions/organizations/getOrganizations";
import { loginOrganization } from "@/actions/auth/login";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import OrganizationLoginForm from "@/app/login/client-components/OrganizationLoginForm";

export default async function LoginPage() {
  const { organizations, error } = await getOrganizations();

  if (error) {
    return <div>Error loading organizations</div>;
  }

  return (
    <OrganizationProvider
      organizations={organizations || []}
      loginAction={loginOrganization}
    >
      <OrganizationLoginForm />
    </OrganizationProvider>
  );
}

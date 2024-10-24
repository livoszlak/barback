"use server";

import DashboardComponent from "./client-components/DashboardComponent";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { getOrganizations } from "@/actions/organizations/getOrganizations";
import { getManagers } from "@/actions/organizations/getManagers";
import { getClassics } from "@/actions/classics/queries";

export default async function Dashboard() {
  // const authContext = useContext(AuthContext);
  const { organizations, orgError } = await getOrganizations();
  const { managers, managersError } = await getManagers();
  const { classics, classicsError } = await getClassics();

  return (
    <>
      <DashboardProvider
        organizations={organizations || []}
        managers={managers || []}
        classics={classics || []}
      >
        <DashboardComponent />
      </DashboardProvider>
    </>
  );
}

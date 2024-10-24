"use server";

import DashboardComponent from "./client-components/DashboardComponent";
import { DashboardProvider } from "@/contexts/DashboardContext";
import {
  getOrganizations,
  getOrganizationsByUserId,
} from "@/actions/organizations/getOrganizations";
import { getManagers } from "@/actions/organizations/getManagers";
import { getClassics } from "@/actions/classics/queries";
import { getUserId } from "@/utils/getUserId";

export default async function Dashboard() {
  const user = await getUserId();
  const userId = user?.id;

  // TODO: keep working on getting the userId into our fetches!
  // single org fetch almost works but needs handling so if user is not auth user the org should be fetched on orgId instead

  /*   const { organizations, orgError } = await getOrganizationsByUserId(
    userId || ""
  ); */
  const { organizations, organizationsError } = await getOrganizations();
  const { managers, managersError } = await getManagers();
  const { classics, classicsError } = await getClassics();

  return (
    <>
      <DashboardProvider
        userId={userId || ""}
        organizations={organizations || []}
        managers={managers || []}
        classics={classics || []}
      >
        <DashboardComponent />
      </DashboardProvider>
    </>
  );
}

"use server";

import DashboardComponent from "./client-components/DashboardComponent";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardContext } from "@/contexts/DashboardContext";
import {
  getOrganizations,
  getOrganizationsByUserId,
} from "@/actions/organizations/getOrganizations";

export default async function Dashboard() {
  // const authContext = useContext(AuthContext);
  const { organizations, error } = await getOrganizations();

  // if (authContext?.user) {
  //   const organizations = await getOrganizationsByUserId(authContext.user.id);
  //   console.log(organizations);
  // }
  // const dashboardContext = useContext(DashboardContext);
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);
  //console.log("auth context: ", authContext);

  // useEffect(() => {
  //   if (authContext !== undefined) {
  //     if (!authContext.user) {
  //       router.push("/");
  //     }
  //     setIsLoading(false);
  //   }
  // }, [authContext, router]);

  // if (isLoading || !authContext?.user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <DashboardProvider organizations={organizations || []}>
        <DashboardComponent />
      </DashboardProvider>
    </>
  );
}

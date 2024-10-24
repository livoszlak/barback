"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
/* import { AuthContext } from "@/contexts/AuthContext"; */
import { DashboardContext } from "@/contexts/DashboardContext";

export default function DashboardComponent() {
  /* const authContext = useContext(AuthContext); */
  const dashboardContext = useContext(DashboardContext);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (
      dashboardContext &&
      dashboardContext.contextOrgs &&
      dashboardContext.contextOrgs.length > 0
    ) {
      setGreeting(dashboardContext.contextOrgs[0].greeting);
    }
  }, [dashboardContext]);

  return (
    <>
      {dashboardContext && (
        <div>
          <h1>dashboad context finnes</h1>
          <h2>{greeting}</h2>
        </div>
      )}
      <Link href={"/dashboard/classics"}>Go to Classics</Link>
      <Link href={"/dashboard/seasonals"}>Go to Seasonals</Link>
    </>
  );
}

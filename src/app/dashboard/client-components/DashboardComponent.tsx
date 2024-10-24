"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/DashboardContext";

export default function DashboardComponent() {
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);

  return (
    <>
      {dashboardContext && (
        <div>
          <h1>dashboad context finnes</h1>
          <h2>{dashboardContext.contextOrgs[0].greeting}</h2>
        </div>
      )}
      <Link href={"/dashboard/classics"}>Go to Classics</Link>
      <Link href={"/dashboard/seasonals"}>Go to Seasonals</Link>
    </>
  );
}

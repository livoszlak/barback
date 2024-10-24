"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/contexts/DashboardContext";
import { Classic } from "@/lib/zod";

export default function DashboardComponent() {
  const dashboardContext = useContext(DashboardContext);
  const [greeting, setGreeting] = useState("");
  const [manager, setManager] = useState("");
  const [classics, setClassics] = useState<Classic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGreeting(dashboardContext?.contextOrgs?.[0]?.greeting || "");
    setManager(dashboardContext?.contextManagers?.[0]?.name || "");
    setClassics(dashboardContext?.contextClassics || []);
    setLoading(false);
  }, [dashboardContext]);

  return (
    <>
      <div>
        <h1>dashboad context finnes</h1>
        <h2>{greeting}</h2>
      </div>
      <div>
        <h2>{manager}</h2>
      </div>
      <ul>
        {classics.map((classic, index) => (
          <li key={index}>{classic.name}</li>
        ))}
      </ul>
      <div>{dashboardContext.userId}</div>
      <Link href={"/dashboard/classics"}>Go to Classics</Link>
      <Link href={"/dashboard/seasonals"}>Go to Seasonals</Link>
    </>
  );
}

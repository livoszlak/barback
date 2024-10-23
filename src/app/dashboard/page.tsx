"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SeasonalsContext } from "@/contexts/SeasonalsContext";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const seasonalsContext = useContext(SeasonalsContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  //console.log("auth context: ", authContext);
  console.log("seasonals context: ", seasonalsContext);
  useEffect(() => {
    if (authContext !== undefined) {
      if (!authContext.user) {
        router.push("/");
      }
      setIsLoading(false);
    }
  }, [authContext, router]);

  if (isLoading || !authContext?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        Welcome, {authContext.user.email}, {authContext.user.role} user
      </h1>
      {authContext.user.role === "authenticated" && <h1>Tjena kingen</h1>}
      <Link href={"/dashboard/classics"}>Go to Classics</Link>
      <Link href={"/dashboard/seasonals"}>Go to Seasonals</Link>
    </div>
  );
}

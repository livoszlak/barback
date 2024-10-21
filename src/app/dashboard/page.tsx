"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  console.log("auth context: ", authContext);

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
    </div>
  );
}

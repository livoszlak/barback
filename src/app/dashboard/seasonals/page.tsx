"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Seasonals() {
  const authContext = useContext(AuthContext);

  return (
    <>
      Hej seasonals! {authContext?.user?.email} is {authContext?.user?.role}
    </>
  );
}

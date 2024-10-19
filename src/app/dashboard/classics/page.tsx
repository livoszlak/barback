"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Classics() {
  const authContext = useContext(AuthContext);

  return (
    <>
      Hej classics! {authContext?.user?.email} {authContext?.user?.aud}
    </>
  );
}

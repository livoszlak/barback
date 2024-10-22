"use client";
import LogoutButton from "./LogoutButton";
import { LogoutOrgButton } from "./LogoutOrgButton";

export default function Header() {
  return (
    <header>
      <LogoutButton />
      <LogoutOrgButton />
    </header>
  );
}

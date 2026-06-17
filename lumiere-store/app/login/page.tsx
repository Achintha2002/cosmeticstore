import React from "react";
import type { Metadata } from "next";
import LoginPageContent from "./LoginPageContent";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your LUMIÈRE account for exclusive access to luxury cosmetics and perfumes.",
};

export default function LoginPage() {
  return <LoginPageContent />;
}

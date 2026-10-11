import React, { Suspense } from "react";
import { Metadata } from "next";
import SignUp from "@/components/auth/signup/signUp";

export const metadata: Metadata = {
  title: "SignUp - Thrico",
  description: "",
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <SignUp />
    </Suspense>
  );
};

export default page;

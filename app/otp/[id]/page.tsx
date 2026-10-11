import React, { Suspense } from "react";
import { Metadata } from "next";
import Otp from "@/components/auth/otp/otp";

export const metadata: Metadata = {
  title: "SignUp - Thrico",
  description: "",
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <Otp />
    </Suspense>
  );
};

export default page;

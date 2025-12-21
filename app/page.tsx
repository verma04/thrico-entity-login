import React, { Suspense } from "react";

import { Metadata } from "next";
import Login from "@/components/auth/login/login";

export const metadata: Metadata = {
  title: "Welcome - Thrico",
  description: "",
};
const page = () => {
  return <Login />;
};

export default page;

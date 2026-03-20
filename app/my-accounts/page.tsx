"use client";

import React from "react";
import dynamic from "next/dynamic";

const MyAccounts = dynamic(
  () => import("@/components/auth/my-accounts/my-accounts"),
  { ssr: false }
);

const MyAccountsPage = () => {
  return <MyAccounts />;
};

export default MyAccountsPage;

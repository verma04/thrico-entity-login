"use client";

import React, { Suspense } from "react";
import RegisterEntityForm from "@/components/auth/register-entity/register-entity-form";

const RegisterEntityPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading...</div>}>
      <RegisterEntityForm />
    </Suspense>
  );
};

export default RegisterEntityPage;

"use client";

import React, { Suspense } from "react";
import RegisterEntityForm from "@/components/auth/register-entity/register-entity-form";
import { useGetEntity, useKycCountries } from "@/components/graphql/actions";

const RegisterEntityPage = () => {
  // We can pass user data here if needed.
  // Using an empty user context for now
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterEntityForm />
    </Suspense>
  );
};

export default RegisterEntityPage;

"use client";

import React, { Suspense } from "react";
import RegisterEntityForm from "@/components/auth/register-entity/register-entity-form";
import { useGetEntity, useKycCountries } from "@/components/graphql/actions";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { cn } from "@/lib/utils";

const RegisterEntityPage = () => {
  // We can pass user data here if needed.
  // Using an empty user context for now
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HexagonPattern
        hexagons={[
          [1, 1],
          [4, 4],
          [2, 2],
          [3, 4],
          [5, 4],
          [8, 2],
          [6, 3],
          [8, 5],
          [10, 10],
        ]}
        className={cn(
          "mask-[radial-gradient(1500px_circle_at_center,white,transparent)]",
          "inset-0 skew-y-6",
        )}
      />
      <RegisterEntityForm />
    </Suspense>
  );
};

export default RegisterEntityPage;

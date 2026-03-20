"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetLoginUserDetails } from "@/components/graphql/actions";
import { Loader2 } from "lucide-react";

export interface WithAuthProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export function withAuth<T extends WithAuthProps>(
  Component: React.ComponentType<T>,
) {
  return function AuthenticatedComponent(props: Omit<T, keyof WithAuthProps>) {
    const router = useRouter();
    const { data, loading, error } = useGetLoginUserDetails({
      fetchPolicy: "network-only",
    });

    // useEffect(() => {
    //   if (!loading) {
    //     if (error || !data || !data.getLoginUserDetails) {
    //       router.push("/login");
    //     }
    //   }
    // }, [loading, data, error, router]);

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Verifying your session...
          </p>
        </div>
      );
    }

    if (error || !data || !data.getLoginUserDetails) {
      return null;
    }

    return <Component {...(props as T)} user={data.getLoginUserDetails} />;
  };
}

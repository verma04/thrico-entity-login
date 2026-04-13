"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetLoginUserDetails } from "@/components/graphql/actions";
import { Loader2, ShieldCheck } from "lucide-react";

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

    useEffect(() => {
      if (!loading) {
        if (error || !data || !data.getLoginUserDetails) {
          router.push("/login");
        }
      }
    }, [loading, data, error, router]);

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 relative z-10 w-full animate-in fade-in duration-700">
          {/* Background Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/15 rounded-full blur-[40px] -z-10 animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Spinner & Icon */}
          <div className="relative flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border-[3px] border-slate-200/50 dark:border-slate-800/50" />
            <div
              className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent animate-spin"
              style={{ animationDuration: "1.5s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck
                className="h-8 w-8 text-primary animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-2 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-150">
            <h3 className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-800 via-primary to-slate-800 dark:from-slate-100 dark:via-primary dark:to-slate-100 bg-clip-text text-transparent pb-1">
              Verifying Session
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              Please wait while we secure your connection...
            </p>
          </div>
        </div>
      );
    }

    if (error || !data || !data.getLoginUserDetails) {
      return null;
    }

    return <Component {...(props as T)} user={data.getLoginUserDetails} />;
  };
}

"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTokenStore } from "../../store/store";
import Details from "./details";
import { useGetUser, useUserProfile } from "../../graphql/actions";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();

  const removeToken = useTokenStore((state) => state.removeToken);
  const { data, error } = useGetUser();
  const { data: profile, loading } = useUserProfile();

  if (error) {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <AuthLayout>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col w-[95%]">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome, {profile?.userProfile?.firstName}
              </h2>
              <div className="flex justify-center w-full mt-4">
                {!loading ? (
                  <Details />
                ) : (
                  <Card className="h-40 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default User;

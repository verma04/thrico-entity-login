"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useTokenStore } from "@/components/store/store";
import { useLogoutUser } from "@/components/graphql/actions";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();

  const removeToken = useTokenStore((state) => state.removeToken);
  const [logout] = useLogoutUser({
    onCompleted() {
      toast.success("Logout Success", {
        id: "12",
      });
      removeToken();
    },
  });
  useEffect(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Loader2 className="w-10 h-10 mb-5 animate-spin text-primary" />
      <h2 className="text-2xl font-semibold">Logging out... Please wait.</h2>
    </div>
  );
};

export default Page;

// 1. Status Active/Inactive
// 2. Tags  3. CreatedBy 4. Created Date  5. Member range 5. Location

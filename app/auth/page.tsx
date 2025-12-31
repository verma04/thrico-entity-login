"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useTokenStore } from "@/components/store/store";
import { useCheckUser } from "@/components/graphql/actions";
const Auth = () => {
  const searchParams = useSearchParams();
  const { token } = useTokenStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
  }));
  const path = searchParams.get("path");
  const host = searchParams.get("host");

  React.useEffect(() => {
    if (token !== null) {
      window.location.href = `/login/?path=${path}&&host=${host}`;
    } else {
      window.location.href = `/login/?path=${path}&&host=${host}`;
    }
  }, [token, path]);

  return null;
};

export default Auth;

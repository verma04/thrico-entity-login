"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTokenStore } from "@/components/store/store";
import {
  getAuthRedirectParams,
  buildRedirectQueryString,
} from "@/lib/auth-redirect";

const AuthContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const { host, path } = getAuthRedirectParams(searchParams);
    const queryString = buildRedirectQueryString(host, path);

    if (token) {
      router.replace(`/my-accounts${queryString}`);
    } else {
      router.replace(`/login${queryString}`);
    }
  }, [token, searchParams, router]);

  return null;
};

const Auth = () => {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
};

export default Auth;

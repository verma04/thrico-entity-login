"use client";
import * as React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";

import { toast } from "sonner";

import { useTokenStore } from "../store/store";

interface ApolloWrapperProps {
  children?: React.ReactNode;
  host?: string;
}

export function ApolloWrapper({ children, host }: ApolloWrapperProps) {
  // Use proper typing for Zustand state
  const token = useTokenStore((state) => state.token);

  // Apollo Client setup with improved error handling and token parsing
  function makeClient() {
    const errorControl = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((err) => {
          const code = err.extensions?.code;
          const status = (err.extensions?.http as any)?.status;
          const msg = err.message || "";
          if (
            code === "UNAUTHORIZED" ||
            code === "UNAUTHENTICATED" ||
            code === "FORBIDDEN" ||
            status === 401 ||
            status === 403 ||
            msg.toLowerCase().includes("authentication required") ||
            msg.toLowerCase().includes("invalid token") ||
            msg.toLowerCase().includes("token expired")
          ) {
            useTokenStore.getState().removeToken();
          }
          toast.error(err.message, { id: "apollo-error" });
        });
      }
    });

    const httpLink = new HttpLink({
      uri: host || process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1111/graphql",
    });
    const link = errorControl.concat(httpLink);

    // Safe token extraction from store or localStorage
    function getAuthToken(): string | null {
      try {
        const storeToken = useTokenStore.getState().token;
        if (storeToken) return storeToken;
        const raw = localStorage.getItem("token");
        if (!raw) return null;
        try {
          const parsed = JSON.parse(raw);
          return (
            parsed?.state?.token ||
            parsed?.token ||
            (typeof parsed === "string" ? parsed : null)
          );
        } catch {
          return raw;
        }
      } catch {
        return null;
      }
    }

    const authMiddleware = new ApolloLink((operation, forward) => {
      const prevContext = operation.getContext();
      const prevHeaders = prevContext.headers || {};
      const authToken = getAuthToken();

      operation.setContext({
        headers: {
          ...prevHeaders,
          ...(authToken ? { authorization: authToken } : {}),
          "Apollo-Require-Preflight": "true",
        },
      });
      return forward(operation);
    });

    return new NextSSRApolloClient({
      link: ApolloLink.from([authMiddleware, link]),
      cache: new NextSSRInMemoryCache(),
    });
  }
  // Example handler for the demo button
  const handleTestClick = () => {
    toast.success("ApolloWrapper is working!");
  };

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

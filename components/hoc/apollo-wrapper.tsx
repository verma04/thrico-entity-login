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
        graphQLErrors.forEach(({ message }) => {
          toast.error(graphQLErrors[0]?.message, { id: "apollo-error" });
        });
      }
      // if (networkError) {
      //   toast.error(`Network error: ${networkError}`);
      // }
    });

    const httpLink = new HttpLink({
      uri: host || "https://admin.thrico.app/graphql",
    });
    const link = errorControl.concat(httpLink);

    // Safe token extraction from localStorage
    function getAuthToken(): string | null {
      try {
        const raw = localStorage.getItem("token");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.state?.token || null;
      } catch {
        return null;
      }
    }

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: getAuthToken(),
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

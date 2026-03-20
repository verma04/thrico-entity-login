"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import { useGetMyAccounts, useLoginByEntityId } from "../../graphql/actions";
import { useTokenStore } from "../../store/store";
import { toast } from "sonner";
import {
  Building2,
  Shield,
  ShieldCheck,
  ChevronRight,
  Loader2,
  LogOut,
  UserCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Account {
  id: string;
  entityId: string;
  name: string;
  logo: string;
  role: string;
}

import { withAuth, WithAuthProps } from "../hoc/with-auth";

const MyAccounts = ({ user }: WithAuthProps) => {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL
    : "https://dashboard.thrico.com/";
  const token = useTokenStore((state) => state.token);
  const removeToken = useTokenStore((state) => state.removeToken);

  const [loginByEntityId] = useLoginByEntityId({
    onCompleted(data: any) {
      const newToken = data?.loginByEntityId?.token;
      if (newToken) {
        window.location.href = `${DASHBOARD_URL}/auth/callback?code=${newToken}`;
      }
    },
    onError(error: any) {
      console.error("Login by entity failed:", error);
      toast.error("Failed to login to account");
      setLoggingInId(null);
    },
  });

  const [loggingInId, setLoggingInId] = React.useState<string | null>(null);

  const [fetchMyAccounts, { data, loading, error, called }] = useGetMyAccounts({
    onError(error: any) {
      console.error("Failed to fetch accounts:", error);
      toast.error("Session expired. Please login again.");
      // Clear token and redirect to login on error
      removeToken();
      window.location.href = "/login";
    },
  });

  React.useEffect(() => {
    if (token) {
      fetchMyAccounts({
        context: {
          headers: {
            authorization: token,
          },
        },
      });
    }
  }, [token]);

  const accounts: Account[] = data?.getMyAccounts || [];

  const handleAccountSelect = (account: Account) => {
    setLoggingInId(account.entityId);
    loginByEntityId({
      variables: { entityId: account.entityId },
      context: {
        headers: {
          authorization: token,
        },
      },
    });
  };

  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AuthLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent pb-1">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Select an organization to continue
          </p>
        </div>
        {/* Account List */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading your accounts...
              </p>
            </div>
          )}

          {!loading && !error && called && accounts.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-sm text-muted-foreground">No accounts found</p>
            </div>
          )}

          {!loading && accounts.length > 0 && (
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {accounts.map((account, index) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSelect(account)}
                  className="w-full group animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 group-hover:scale-[1.02] cursor-pointer overflow-hidden z-10">
                    {/* Hover internal gradient */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 -z-10" />

                    {/* Entity Logo / Avatar */}
                    <Avatar className="h-12 w-12 ring-1 ring-slate-200 dark:ring-slate-800 group-hover:ring-primary/50 transition-all duration-300 shadow-sm bg-slate-50 dark:bg-slate-800">
                      {account.logo ? (
                        <AvatarImage
                          src={`https:cdn.thrico.network/${account.logo}`}
                          alt={account.name}
                        />
                      ) : null}
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm">
                        {getInitials(account.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Account Info */}
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-bold text-[15px] text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">
                        {account.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          {account.role?.toLowerCase() === "admin" ? (
                            <>
                              <ShieldCheck className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                Admin
                              </span>
                            </>
                          ) : (
                            <>
                              <Building2 className="h-3 w-3" />
                              <span>{account.role}</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Arrow / Loader */}
                    {loggingInId === account.entityId ? (
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-slate-100 dark:border-slate-700 group-hover:border-primary">
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Add New Account Button */}
          {!loading && (
            <div className="pt-4">
              <Link
                href="/register-entity"
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
              >
                <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plus className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                  Create New Organization
                </span>
              </Link>
            </div>
          )}
        </div>
        {/* Logout */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors inline-flex items-center gap-1.5 group"
          >
            <LogOut className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Sign out
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default withAuth(MyAccounts);

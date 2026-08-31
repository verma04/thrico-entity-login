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
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { withAuth, WithAuthProps } from "../hoc/with-auth";

interface Account {
  id: string;
  entityId: string;
  name: string;
  logo: string;
  role: string;
}

const MyAccounts = ({ user }: WithAuthProps) => {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL
    : "https://dashboard.thrico.com/";
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.thrico.network";
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
      removeToken();
      window.location.href = "/login";
    },
  });

  React.useEffect(() => {
    if (error) {
      window.location.href = "/login";
    }
  }, [error]);

  React.useEffect(() => {
    if (token) {
      fetchMyAccounts({
        context: {
          headers: {
            authorization: token,
          },
        },
      });
    } else {
      window.location.href = "/login";
    }
  }, [token, fetchMyAccounts]);

  React.useEffect(() => {
    if (error) {
      removeToken();
      window.location.href = "/login";
    }
  }, [error, removeToken]);

  const accounts: Account[] = data?.getMyAccounts || [];

  const handleAccountSelect = (account: Account) => {
    setLoggingInId(account?.entityId);
    loginByEntityId({
      variables: { entityId: account?.entityId },
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

  const getRoleDesign = (role: string) => {
    const rawRole = role?.toLowerCase() || "";
    switch (rawRole) {
      case "superadmin":
      case "super_admin":
        return {
          label: "Super Admin",
          textColor: "text-purple-700",
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200/80",
          Icon: Shield,
        };
      case "admin":
        return {
          label: "Admin",
          textColor: "text-emerald-700",
          iconColor: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200/80",
          Icon: ShieldCheck,
        };
      case "manager":
        return {
          label: "Manager",
          textColor: "text-blue-700",
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200/80",
          Icon: Briefcase,
        };
      default:
        return {
          label: role
            ? role.charAt(0).toUpperCase() +
              role
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()
            : "Member",
          textColor: "text-gray-700",
          iconColor: "text-gray-500",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-200",
          Icon: Building2,
        };
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Header (scaled down 20%) */}
        <div className="mb-3.5 text-left">
          <h1 className="text-[21px] sm:text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
            Welcome back
          </h1>
          <p className="text-[12.5px] text-gray-500 font-normal mt-0.5">
            Select an organization to continue
          </p>
        </div>

        {/* Account List */}
        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 space-y-2">
              <Loader2 className="h-6 w-6 text-gray-800 animate-spin" />
              <p className="text-[12px] text-gray-500">
                Loading organizations...
              </p>
            </div>
          )}

          {!loading && !error && called && accounts.length === 0 && (
            <div className="text-center py-6 space-y-2 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <div className="w-9 h-9 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-[12px] text-gray-500">No organizations found</p>
            </div>
          )}

          {!loading && accounts.length > 0 && (
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {accounts?.map((account) => (
                <button
                  key={account?.id}
                  onClick={() => handleAccountSelect(account)}
                  className="w-full group text-left transition-all duration-150"
                >
                  <div className="relative flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/50 hover:shadow-xs transition-all duration-150 cursor-pointer">
                    {/* Entity Logo / Avatar */}
                    <Avatar className="h-9 w-9 rounded-lg border border-gray-200 bg-gray-50 group-hover:border-gray-300 transition-colors shrink-0">
                      {account?.logo ? (
                        <AvatarImage
                          src={`${CDN_URL}/${account?.logo}`}
                          alt={account?.name}
                          className="object-contain p-0.5 rounded-lg"
                        />
                      ) : null}
                      <AvatarFallback className="bg-[#1a1a1a] text-white font-medium text-[11px] rounded-lg">
                        {getInitials(account?.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[13px] text-gray-900 truncate leading-tight group-hover:text-black">
                        {account?.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        {(() => {
                          const roleDesign = getRoleDesign(account?.role);
                          const { Icon } = roleDesign;
                          return (
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[10px] font-medium border ${roleDesign?.textColor} ${roleDesign?.bgColor} ${roleDesign?.borderColor}`}
                            >
                              <Icon
                                className={`h-2.5 w-2.5 ${roleDesign?.iconColor}`}
                              />
                              {roleDesign?.label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Arrow / Loader */}
                    <div className="shrink-0">
                      {loggingInId === account?.entityId ? (
                        <Loader2 className="h-4 w-4 text-gray-800 animate-spin" />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-colors">
                          <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Add New Account Button */}
          {!loading && (
            <div className="pt-2.5">
              <Link
                href="/register-entity"
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-gray-300 hover:border-gray-900 bg-gray-50/40 hover:bg-gray-50 transition-all duration-150 cursor-pointer group"
              >
                <div className="h-5 w-5 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <Plus className="h-3 w-3 text-gray-600 group-hover:text-gray-900 transition-colors" />
                </div>
                <span className="text-[12.5px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Create new organization
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="mt-3.5 pt-1 text-left">
          <button
            type="button"
            onClick={handleLogout}
            className="text-[12px] text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="h-3 w-3" />
            Sign out
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default withAuth(MyAccounts);

"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import Link from "next/link";
import OtpForm from "./form";
import { ArrowLeft } from "lucide-react";

const Otp = () => {
  return (
    <AuthLayout>
      <div className="w-full space-y-6">
        {/* Header with animation */}
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the 4-digit code sent to your email address
          </p>
        </div>

        {/* Form with staggered animation */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <OtpForm />
        </div>

        {/* Back to login link */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Otp;


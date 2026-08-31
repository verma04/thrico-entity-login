"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import Link from "next/link";
import OtpForm from "./form";

const Otp = () => {
  return (
    <AuthLayout>
      <div className="w-full">
        {/* Header (scaled down 20%) */}
        <div className="mb-4 text-left">
          <h1 className="text-[21px] sm:text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
            Verify your email
          </h1>
          <p className="text-[12.5px] text-gray-500 font-normal mt-0.5">
            Enter the 4-digit code sent to your email
          </p>
        </div>

        {/* OTP Form */}
        <OtpForm />

        {/* Back to login link */}
        <div className="mt-4 pt-1 text-left">
          <Link
            href="/login"
            className="text-[12.5px] text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
          >
            <span aria-hidden="true">←</span> Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Otp;

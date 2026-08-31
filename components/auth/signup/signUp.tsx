"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import Link from "next/link";
import SignupForm from "./form";

const SignUp = () => {
  return (
    <AuthLayout>
      <div className="w-full">
        {/* Header (scaled down 20%) */}
        <div className="mb-4 text-left">
          <h1 className="text-[21px] sm:text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
            Create an account
          </h1>
          <p className="text-[12.5px] text-gray-500 font-normal mt-0.5">
            Get started with Thrico
          </p>
        </div>

        {/* Signup Form */}
        <SignupForm />

        {/* Login link */}
        <div className="mt-4 pt-1 text-left">
          <p className="text-[12.5px] text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#005bd3] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

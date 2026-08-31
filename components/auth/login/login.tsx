"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import LoginForm from "./form";

const Login = () => {
  return (
    <AuthLayout>
      <div className="w-full">
        {/* Card Header (scaled down 20%) */}
        <div className="mb-4">
          <h1 className="text-[21px] sm:text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
            Log in
          </h1>
          <p className="text-[12.5px] text-gray-500 font-normal mt-0.5">
            Continue to Thrico
          </p>
        </div>

        {/* Form */}
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default Login;

"use client";

import React from "react";
import AuthLayout from "../layout/auth-layout";
import Link from "next/link";
import LoginForm from "./form";
import { ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <AuthLayout>
      <div className="w-full space-y-6">
        {/* Header with animation */}
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your community dashboard
          </p>
        </div>

        {/* Form with staggered animation */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <LoginForm />
        </div>

        {/* Sign up link */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <p className="text-sm text-muted-foreground">
            New to Thrico?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
            >
              Get Started
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;


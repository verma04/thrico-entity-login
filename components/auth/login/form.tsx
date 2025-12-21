"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLoginAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type LoginFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("The input is not valid E-mail!")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please input your password!"),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [register, { data, loading }] = useLoginAsAdmin({
    onCompleted() {
      toast.success(
        "Please enter the OTP sent to your registered email address"
      );
    },
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: LoginFormValues) => {
    register({
      variables: { input: values },
    });
  };

  React.useEffect(() => {
    if (data?.loginAsAdmin) {
      router.push(`otp/${data?.loginAsAdmin?.id}?email=${initialValues.email}`);
    }
  }, [data, router]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values }) => (
        <Form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={`transition-all duration-200 ${
                errors.email && touched.email
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "focus-visible:ring-primary/20"
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1 duration-200">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative group">
              <Field
                as={Input}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pr-10 transition-all duration-200 ${
                  errors.password && touched.password
                    ? "border-destructive focus-visible:ring-destructive/20"
                    : "focus-visible:ring-primary/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1 duration-200">
                {errors.password}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              loading={loading}
              size="lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

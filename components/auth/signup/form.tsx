"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRegisterAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type SignupFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("The input is not valid E-mail!")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(6, "Password must be between 6 and 12 characters!")
    .max(12, "Password must be between 6 and 12 characters!")
    .required("Please input your password!"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { loading }] = useRegisterAsAdmin({
    onCompleted() {
      toast.success(
        "User successfully registered. Please proceed to login to continue."
      );
      router.push("/login");
    },
  });

  const initialValues: SignupFormValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: "",
  };

  const handleSubmit = (values: SignupFormValues) => {
    const { confirm, ...submitValues } = values;
    register({
      variables: { input: submitValues },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <Field
                  as={Input}
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  className={`transition-all duration-200 ${
                    errors.firstName && touched.firstName
                      ? "border-destructive focus-visible:ring-destructive/20"
                      : "focus-visible:ring-primary/20"
                  }`}
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Field
                  as={Input}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  className={`transition-all duration-200 ${
                    errors.lastName && touched.lastName
                      ? "border-destructive focus-visible:ring-destructive/20"
                      : "focus-visible:ring-primary/20"
                  }`}
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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
                  <p className="text-sm font-medium text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative group">
                  <Field
                    as={Input}
                    id="confirm"
                    name="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pr-10 transition-all duration-200 ${
                      errors.confirm && touched.confirm
                        ? "border-destructive focus-visible:ring-destructive/20"
                        : "focus-visible:ring-primary/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirm && touched.confirm && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.confirm}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                loading={loading}
                size="lg"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

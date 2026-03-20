"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRegisterAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignupFormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("The input is not valid E-mail!")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const SignupForm = () => {
  const router = useRouter();

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
  };

  const handleSubmit = (values: SignupFormValues) => {
    register({
      variables: { input: values },
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
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
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
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

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
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

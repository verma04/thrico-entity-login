"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLoginAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormValues = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("The input is not valid E-mail!")
    .required("Email is required"),
});

const LoginForm = () => {
  const router = useRouter();

  const [login, { data, loading }] = useLoginAsAdmin({
    onCompleted() {
      toast.success(
        "Please enter the OTP sent to your registered email address",
      );
    },
  });

  const initialValues: LoginFormValues = {
    email: "",
  };

  const handleSubmit = (values: LoginFormValues) => {
    login({
      variables: { input: values },
    });
  };

  React.useEffect(() => {
    if (data?.sendAdminLoginOtp) {
      router.push(
        `otp/${data?.sendAdminLoginOtp?.id}?email=${data?.sendAdminLoginOtp?.email || ""}`,
      );
    }
  }, [data, router]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
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

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
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

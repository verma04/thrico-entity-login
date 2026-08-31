"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLoginAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type LoginFormValues = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const LoginForm = () => {
  const router = useRouter();

  const [login, { data, loading }] = useLoginAsAdmin({
    onCompleted() {
      toast.success(
        "Please enter the OTP sent to your registered email address"
      );
    },
    onError(err) {
      toast.error(err.message || "Failed to sign in. Please try again.");
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
        `/otp/${data?.sendAdminLoginOtp?.id}?email=${data?.sendAdminLoginOtp?.email || ""}`
      );
    }
  }, [data, router]);

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[12px] font-medium text-gray-700 block"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder=""
                className={`w-full h-9 px-3 rounded-md border text-[13px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-9 bg-[#1a1a1a] hover:bg-[#303030] active:bg-[#000000] disabled:bg-gray-400 text-white font-medium text-[13px] rounded-md transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Continuing...</span>
                  </>
                ) : (
                  "Continue with email"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* New to Thrico / Get started */}
      <div className="mt-4 pt-1 text-left">
        <p className="text-[12.5px] text-gray-700">
          New to Thrico?{" "}
          <Link
            href="/sign-up"
            className="text-[#005bd3] hover:underline font-medium inline-flex items-center gap-0.5"
          >
            Get started <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

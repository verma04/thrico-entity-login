"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRegisterAsAdmin } from "../../graphql/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SignupFormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
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
    onError(err) {
      toast.error(err.message || "Failed to create account. Please try again.");
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
        <Form className="w-full space-y-3">
          {/* Email */}
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

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label
                htmlFor="firstName"
                className="text-[12px] font-medium text-gray-700 block"
              >
                First name
              </label>
              <Field
                id="firstName"
                name="firstName"
                placeholder=""
                className={`w-full h-9 px-3 rounded-md border text-[13px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 ${
                  errors.firstName && touched.firstName
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                }`}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="lastName"
                className="text-[12px] font-medium text-gray-700 block"
              >
                Last name
              </label>
              <Field
                id="lastName"
                name="lastName"
                placeholder=""
                className={`w-full h-9 px-3 rounded-md border text-[13px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 ${
                  errors.lastName && touched.lastName
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                }`}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-[11px] font-medium text-red-600 mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
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
                  <span>Creating account...</span>
                </>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

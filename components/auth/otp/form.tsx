"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useOtpLogin } from "../../graphql/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTokenStore } from "../../store/store";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be 4 digits")
    .required("OTP is required"),
});

const OtpForm = () => {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL
    : "https://dashboard.thrico.com/";
  const storeToken = useTokenStore((state) => state.storeToken);
  const { id } = useParams();
  const router = useRouter();

  const [login, { loading }] = useOtpLogin({
    async onCompleted(data: any) {
      await toast.success("Login Success");
      await storeToken(data?.otpLogin?.token);
      await router.push(
        `${DASHBOARD_URL}/auth/callback?code=${data?.otpLogin?.token}`
      );
    },
  });

  const initialValues = {
    otp: "",
  };

  const handleSubmit = (values: { otp: string }) => {
    const value = { otp: values.otp, id: id };
    login({
      variables: { input: value },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => {
        const isOtpComplete = values.otp.length === 4;

        return (
          <Form className="w-full">
            <div className="flex flex-col items-center space-y-6">
              <div className="space-y-3 w-full flex flex-col items-center">
                <Label htmlFor="otp" className="text-sm font-medium text-center">
                  Verification Code
                </Label>
                <InputOTP
                  maxLength={4}
                  value={values.otp}
                  onChange={(value: string) => setFieldValue("otp", value)}
                  className="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
                {errors.otp && touched.otp && (
                  <p className="text-sm font-medium text-destructive text-center animate-in slide-in-from-top-1 duration-200">
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="w-full max-w-xs">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  loading={loading}
                  disabled={!isOtpComplete}
                  size="lg"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtpForm;

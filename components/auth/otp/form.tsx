"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useOtpLogin } from "../../graphql/actions";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTokenStore } from "../../store/store";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be 4 digits")
    .required("OTP is required"),
});

const OtpForm = () => {
  const storeToken = useTokenStore((state) => state.storeToken);
  const { id } = useParams();
  const router = useRouter();

  const [login, { loading }] = useOtpLogin({
    async onCompleted(data: any) {
      const token = data?.otpLogin?.token;
      if (token) {
        await storeToken(token);
        toast.success("Login Successful");
        router.push("/my-accounts");
      }
    },
    onError(err) {
      toast.error(err.message || "Invalid OTP code. Please try again.");
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
                <label
                  htmlFor="otp"
                  className="text-[13px] font-medium text-gray-700 text-center block"
                >
                  Verification Code
                </label>
                <InputOTP
                  maxLength={4}
                  value={values.otp}
                  onChange={(value: string) => setFieldValue("otp", value)}
                  className="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-12 text-lg font-semibold rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-12 text-lg font-semibold rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-12 text-lg font-semibold rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-12 text-lg font-semibold rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                    />
                  </InputOTPGroup>
                </InputOTP>
                {errors.otp && touched.otp && (
                  <p className="text-xs font-medium text-red-600 text-center mt-1">
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={loading || !isOtpComplete}
                  className="w-full h-11 bg-[#1a1a1a] hover:bg-[#303030] active:bg-[#000000] disabled:bg-gray-300 text-white font-medium text-sm rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify code"
                  )}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtpForm;

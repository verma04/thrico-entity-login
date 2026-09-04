"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import PhoneNumber from "./register-entity-phone-number";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface ProfileFormData {
  fullName: string;
  email: string;
  designation: string;
  phone: string;
  phoneCode: string;
  phoneIsoCode: string;
}

interface RegisterEntityProfileProps {
  profile: {
    designation?: string;
    phone?: { phone: string; code: string; isoCode: string } | null;
  };
  setProfile: (values: {
    designation: string;
    phone: { phone: string; code: string; isoCode: string };
  }) => void;
  setCurrent: (step: number) => void;
  data?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string().email("Invalid email"),
  designation: Yup.string().required("Designation is required"),
  phone: Yup.string()
    .matches(/^[\d\s]{7,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  phoneCode: Yup.string(),
});

const FormikStepSync = ({ step }: { step: number }) => {
  const { isValid, handleSubmit } = useFormikContext<ProfileFormData>();
  const { setStepValidity, setSubmitHandler } = useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid);
  }, [isValid, step, setStepValidity]);

  React.useEffect(() => {
    setSubmitHandler(step, handleSubmit);
  }, [step, setSubmitHandler, handleSubmit]);

  return null;
};

const RegisterEntityProfile: React.FC<RegisterEntityProfileProps> = ({
  profile,
  setProfile,
  setCurrent,
  data,
}) => {
  const initialValues = useMemo(
    () => ({
      fullName:
        data?.firstName && data?.lastName
          ? `${data.firstName} ${data.lastName}`.trim()
          : "",
      email: data?.email || "",
      designation: profile?.designation || "",
      phone: profile?.phone?.phone || "",
      phoneCode: profile?.phone?.code || "+91",
      phoneIsoCode: profile?.phone?.isoCode || "IN",
    }),
    [data, profile],
  );

  const handleFormSubmit = (values: ProfileFormData) => {
    setProfile({
      designation: values.designation,
      phone: {
        phone: values.phone,
        code: values.phoneCode,
        isoCode: values.phoneIsoCode,
      },
    });
    setCurrent(2);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validateOnMount
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form className="w-full space-y-4">
          <FormikStepSync step={1} />

          {/* Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 block">
                Full name
              </label>
              <Input
                name="fullName"
                value={values.fullName}
                readOnly
                disabled
                className="w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-600 bg-gray-50 border-gray-200 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 block">
                Work email
              </label>
              <Input
                name="email"
                value={values.email}
                readOnly
                disabled
                className="w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-600 bg-gray-50 border-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium text-gray-700 block">
              Phone number <span className="text-red-500">*</span>
            </label>
            <PhoneNumber
              isFormik
              initialValue={initialValues.phone}
              initialCountryCode={initialValues.phoneCode}
            />
          </div>

          {/* Designation */}
          <div className="space-y-1.5">
            <label htmlFor="designation" className="text-[12.5px] font-medium text-gray-700 block">
              Designation / Role <span className="text-red-500">*</span>
            </label>
            <Input
              id="designation"
              name="designation"
              placeholder="e.g. Founder, CEO, Manager"
              value={values.designation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                touched.designation && errors.designation && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {touched.designation && errors.designation && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">
                {errors.designation}
              </p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityProfile);

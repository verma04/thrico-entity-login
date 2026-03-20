"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { motion, type Variants } from "framer-motion";
import { User, Mail, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

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
      phoneCode: profile?.phone?.code || "+1",
      phoneIsoCode: profile?.phone?.isoCode || "US",
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
        <Form className="w-full">
          <FormikStepSync step={1} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-xl mx-auto px-4"
          >
            {/* Header Section */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-6"
              >
                <User className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                Your Profile
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium max-w-[280px] mx-auto">
                Provide your professional details to personalize your workspace
              </p>
            </div>

            <div className="space-y-8">
              {/* Identity Info */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Full Name
                  </Label>
                  <div className="relative group/input">
                    <Input
                      name="fullName"
                      onChange={handleChange}
                      value={values.fullName}
                      className="h-14 pl-12 rounded-[1.25rem] bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all cursor-not-allowed opacity-70 font-medium"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 ml-1">
                    Synchronized with your Thrico ID
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Work Email
                  </Label>
                  <div className="relative group/input">
                    <Input
                      onChange={handleChange}
                      name="email"
                      value={values.email}
                      className="h-14 pl-12 rounded-[1.25rem] bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all cursor-not-allowed opacity-70 font-medium"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Role & Contact Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-slate-400 font-bold tracking-widest">
                    Contact & Role
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <PhoneNumber
                  isFormik
                  initialValue={initialValues.phone}
                  initialCountryCode={initialValues.phoneCode}
                />

                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Designation
                  </Label>
                  <div className="relative group/input">
                    <Input
                      name="designation"
                      placeholder="e.g. Chief Executive Officer"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                        touched.designation &&
                          errors.designation &&
                          "border-destructive focus:ring-destructive/10",
                      )}
                    />
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  {touched.designation && errors.designation && (
                    <p className="ml-1 text-[12px] text-destructive font-medium">
                      {errors.designation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityProfile);

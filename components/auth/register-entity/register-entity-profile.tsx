"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
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

          {/* Step header */}
          <div className="rs-header">
            <h2 className="rs-title">Profile details</h2>
            <p className="rs-sub">Your professional identity on Thrico</p>
          </div>

          <div className="rs-fields">
            {/* Read-only fields */}
            <div className="rs-row rs-row--2">
              <div className="rs-field">
                <Label className="rs-label">Full Name</Label>
                <div className="rs-input-wrap">
                  <Input
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    readOnly
                    className="rs-input rs-input--readonly"
                  />
                  <User className="rs-icon" />
                </div>
                <p className="rs-hint">From your Thrico account</p>
              </div>
              <div className="rs-field">
                <Label className="rs-label">Work Email</Label>
                <div className="rs-input-wrap">
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    readOnly
                    className="rs-input rs-input--readonly"
                  />
                  <Mail className="rs-icon" />
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="rs-field">
              <Label className="rs-label">Phone Number <span className="rs-required">*</span></Label>
              <PhoneNumber
                isFormik
                initialValue={initialValues.phone}
                initialCountryCode={initialValues.phoneCode}
              />
            </div>

            <div className="rs-field">
              <Label className="rs-label">
                Designation <span className="rs-required">*</span>
              </Label>
              <div className="rs-input-wrap">
                <Input
                  name="designation"
                  placeholder="e.g. Chief Executive Officer"
                  value={values.designation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "rs-input",
                    touched.designation && errors.designation && "rs-input--error",
                  )}
                />
                <Briefcase className="rs-icon" />
              </div>
              {touched.designation && errors.designation && (
                <p className="rs-error">{errors.designation}</p>
              )}
            </div>
          </div>

          <style>{`
            .rs-header { margin-bottom: 28px; }
            .rs-title {
              font-size: 20px;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: -0.4px;
              margin: 0 0 6px;
            }
            .rs-sub {
              font-size: 14px;
              color: #64748b;
              margin: 0;
            }
            .rs-fields {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
            .rs-row { display: flex; gap: 16px; }
            .rs-row--2 > * { flex: 1; min-width: 0; }
            @media (max-width: 520px) {
              .rs-row { flex-direction: column; }
            }
            .rs-field { display: flex; flex-direction: column; gap: 6px; }
            .rs-label {
              font-size: 12px !important;
              font-weight: 700 !important;
              letter-spacing: 0.4px !important;
              text-transform: uppercase !important;
              color: #475569 !important;
            }
            .rs-required { color: #ef4444; }
            .rs-input-wrap { position: relative; }
            .rs-input {
              height: 42px !important;
              padding-left: 38px !important;
              border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important;
              background: #fff !important;
              font-size: 14px !important;
              font-weight: 500 !important;
              color: #0f172a !important;
              transition: border-color 0.15s, box-shadow 0.15s !important;
              font-family: inherit !important;
            }
            .rs-input:focus {
              border-color: #6366f1 !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
              outline: none !important;
            }
            .rs-input--readonly {
              background: #f8fafc !important;
              color: #94a3b8 !important;
              cursor: not-allowed !important;
            }
            .rs-input--error {
              border-color: #ef4444 !important;
            }
            .rs-input--error:focus {
              box-shadow: 0 0 0 3px rgba(239,68,68,0.12) !important;
            }
            .rs-icon {
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              height: 15px;
              width: 15px;
              color: #94a3b8;
              pointer-events: none;
            }
            .rs-hint {
              font-size: 11px;
              color: #94a3b8;
              margin: 0;
            }
            .rs-error {
              font-size: 12px;
              color: #ef4444;
              margin: 0;
              font-weight: 500;
            }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityProfile);

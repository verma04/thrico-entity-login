"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { ShieldCheck, Building2, User, CreditCard, MapPin, Receipt } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

/* ─── Indian States ─── */
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/* ─── Types ─── */
type AccountType = "individual" | "enterprise";

interface KycFormData {
  accountType: AccountType;
  panCard: string;
  gstNumber: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
}

interface RegisterEntityKycProps {
  setCurrent: (step: number) => void;
  kyc: any;
  setKyc: (kyc: any) => void;
}

/* ─── Validation ─── */
const validationSchema = Yup.object().shape({
  accountType: Yup.string()
    .oneOf(["individual", "enterprise"])
    .required("Account type is required"),
  panCard: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please add a valid PAN ID (e.g. ABCDE1234F)")
    .required("PAN card is required"),
  gstNumber: Yup.string().when("accountType", {
    is: "enterprise",
    then: (schema) =>
      schema
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
          "Please add a valid GST ID (e.g. 22ABCDE1234F1Z5)"
        )
        .required("GST number is required for enterprise accounts"),
    otherwise: (schema) => schema.notRequired(),
  }),
  billingAddressLine1: Yup.string()
    .min(5, "Address is too short")
    .required("Address line 1 is required"),
  billingAddressLine2: Yup.string(),
  billingCity: Yup.string().required("City is required"),
  billingState: Yup.string().required("State is required"),
  billingPincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code")
    .required("PIN code is required"),
});

/* ─── Formik Step Sync ─── */
const FormikStepSync = ({ step }: { step: number }) => {
  const { isValid, handleSubmit } = useFormikContext<any>();
  const { setStepValidity, setSubmitHandler } = useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid);
  }, [isValid, step, setStepValidity]);

  React.useEffect(() => {
    setSubmitHandler(step, handleSubmit);
  }, [step, setSubmitHandler, handleSubmit]);

  return null;
};

/* ─── Account Type Cards ─── */
const accountTypes = [
  {
    value: "individual" as AccountType,
    label: "Individual",
    description: "Freelancer, sole proprietor, or personal account",
    icon: User,
    tag: "PAN required",
  },
  {
    value: "enterprise" as AccountType,
    label: "Enterprise",
    description: "Company, LLP, or registered business entity",
    icon: Building2,
    tag: "PAN + GST required",
  },
];

/* ─── Component ─── */
const RegisterEntityKyc: React.FC<RegisterEntityKycProps> = ({
  setCurrent,
  kyc,
  setKyc,
}) => {
  const initialValues: KycFormData = useMemo(
    () => ({
      accountType: kyc?.accountType || "",
      panCard: kyc?.panCard || "",
      gstNumber: kyc?.gstNumber || "",
      billingAddressLine1: kyc?.billingAddressLine1 || "",
      billingAddressLine2: kyc?.billingAddressLine2 || "",
      billingCity: kyc?.billingCity || "",
      billingState: kyc?.billingState || "",
      billingPincode: kyc?.billingPincode || "",
    }),
    [kyc]
  );

  const onFinish = (values: KycFormData) => {
    setKyc({ ...kyc, ...values });
    setCurrent(6);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
      enableReinitialize
      validateOnMount
    >
      {({ values, errors, touched, setFieldValue, handleBlur, handleChange }) => (
        <Form className="w-full">
          <FormikStepSync step={5} />

          <div className="kyc-header">
            <h2 className="rs-title">
              <ShieldCheck className="kyc-title-icon" />
              KYC Verification
            </h2>
            <p className="rs-sub">
              Complete your identity verification for compliance
            </p>
          </div>

          <div className="kyc-sections">
            {/* ── Account Type ── */}
            <div className="kyc-section">
              <div className="kyc-section-label">Account Type <span className="rs-required">*</span></div>
              <div className="kyc-type-grid">
                {accountTypes.map((type) => {
                  const Icon = type.icon;
                  const selected = values.accountType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFieldValue("accountType", type.value);
                        if (type.value === "individual") {
                          setFieldValue("gstNumber", "");
                        }
                      }}
                      className={cn(
                        "kyc-type-card",
                        selected && "kyc-type-card--selected"
                      )}
                    >
                      <div className="kyc-type-icon-wrap">
                        <Icon className="kyc-type-icon" />
                      </div>
                      <div className="kyc-type-text">
                        <span className="kyc-type-name">{type.label}</span>
                        <span className="kyc-type-desc">{type.description}</span>
                      </div>
                      <span className={cn("kyc-type-tag", selected && "kyc-type-tag--selected")}>
                        {type.tag}
                      </span>
                      <div className={cn("kyc-type-radio", selected && "kyc-type-radio--on")} />
                    </button>
                  );
                })}
              </div>
              {touched.accountType && errors.accountType && (
                <p className="rs-error">{errors.accountType as string}</p>
              )}
            </div>

            {/* ── PAN & GST ── */}
            {values.accountType && (
              <div className="kyc-section kyc-fade-in">
                <div className="kyc-section-label">
                  <CreditCard className="kyc-section-icon" />
                  Tax Information
                </div>

                <div className={cn("rs-row", values.accountType === "enterprise" && "rs-row--2")}>
                  <div className="rs-field">
                    <Label className="rs-label">
                      PAN Card Number <span className="rs-required">*</span>
                    </Label>
                    <div className="rs-input-wrap">
                      <Input
                        name="panCard"
                        placeholder="e.g. ABCDE1234F"
                        value={values.panCard}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                          setFieldValue("panCard", val);
                        }}
                        onBlur={handleBlur}
                        maxLength={10}
                        className={cn(
                          "rs-input",
                          touched.panCard && errors.panCard && "rs-input--error"
                        )}
                      />
                      <CreditCard className="rs-icon" />
                    </div>
                    {touched.panCard && errors.panCard && (
                      <p className="rs-error">{errors.panCard as string}</p>
                    )}
                  </div>

                  {values.accountType === "enterprise" && (
                    <div className="rs-field kyc-fade-in">
                      <Label className="rs-label">
                        GST Number <span className="rs-required">*</span>
                      </Label>
                      <div className="rs-input-wrap">
                        <Input
                          name="gstNumber"
                          placeholder="e.g. 22ABCDE1234F1Z5"
                          value={values.gstNumber}
                          onChange={(e) => {
                            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
                            setFieldValue("gstNumber", val);
                          }}
                          onBlur={handleBlur}
                          maxLength={15}
                          className={cn(
                            "rs-input",
                            touched.gstNumber && errors.gstNumber && "rs-input--error"
                          )}
                        />
                        <Receipt className="rs-icon" />
                      </div>
                      {touched.gstNumber && errors.gstNumber && (
                        <p className="rs-error">{errors.gstNumber as string}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Billing Address ── */}
            {values.accountType && (
              <div className="kyc-section kyc-fade-in">
                <div className="kyc-section-label">
                  <MapPin className="kyc-section-icon" />
                  Billing Address
                </div>

                <div className="rs-field">
                  <Label className="rs-label">
                    Address Line 1 <span className="rs-required">*</span>
                  </Label>
                  <Input
                    name="billingAddressLine1"
                    placeholder="Street address, building name"
                    value={values.billingAddressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "rs-input kyc-input-no-icon",
                      touched.billingAddressLine1 && errors.billingAddressLine1 && "rs-input--error"
                    )}
                  />
                  {touched.billingAddressLine1 && errors.billingAddressLine1 && (
                    <p className="rs-error">{errors.billingAddressLine1 as string}</p>
                  )}
                </div>

                <div className="rs-field">
                  <Label className="rs-label">Address Line 2</Label>
                  <Input
                    name="billingAddressLine2"
                    placeholder="Landmark, area (optional)"
                    value={values.billingAddressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="rs-input kyc-input-no-icon"
                  />
                </div>

                <div className="rs-row rs-row--3">
                  <div className="rs-field">
                    <Label className="rs-label">
                      City <span className="rs-required">*</span>
                    </Label>
                    <Input
                      name="billingCity"
                      placeholder="e.g. Mumbai"
                      value={values.billingCity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "rs-input kyc-input-no-icon",
                        touched.billingCity && errors.billingCity && "rs-input--error"
                      )}
                    />
                    {touched.billingCity && errors.billingCity && (
                      <p className="rs-error">{errors.billingCity as string}</p>
                    )}
                  </div>

                  <div className="rs-field">
                    <Label className="rs-label">
                      State <span className="rs-required">*</span>
                    </Label>
                    <Select
                      onValueChange={(val) => setFieldValue("billingState", val)}
                      defaultValue={values.billingState}
                    >
                      <SelectTrigger
                        className={cn(
                          "rs-select-trigger",
                          !values.billingState && "rs-placeholder",
                          touched.billingState && errors.billingState && "rs-input--error"
                        )}
                      >
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px]">
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.billingState && errors.billingState && (
                      <p className="rs-error">{errors.billingState as string}</p>
                    )}
                  </div>

                  <div className="rs-field">
                    <Label className="rs-label">
                      PIN Code <span className="rs-required">*</span>
                    </Label>
                    <Input
                      name="billingPincode"
                      placeholder="e.g. 400001"
                      value={values.billingPincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setFieldValue("billingPincode", val);
                      }}
                      onBlur={handleBlur}
                      maxLength={6}
                      className={cn(
                        "rs-input kyc-input-no-icon",
                        touched.billingPincode && errors.billingPincode && "rs-input--error"
                      )}
                    />
                    {touched.billingPincode && errors.billingPincode && (
                      <p className="rs-error">{errors.billingPincode as string}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <style>{`
            /* ── KYC Step Styles ── */
            .kyc-header { margin-bottom: 28px; }
            .kyc-title-icon {
              display: inline; vertical-align: -3px;
              height: 20px; width: 20px; margin-right: 6px; color: #6366f1;
            }
            .rs-title {
              font-size: 20px; font-weight: 800; color: #0f172a;
              letter-spacing: -0.4px; margin: 0 0 6px;
            }
            .rs-sub { font-size: 14px; color: #64748b; margin: 0; }

            .kyc-sections { display: flex; flex-direction: column; gap: 28px; }
            .kyc-section { display: flex; flex-direction: column; gap: 14px; }
            .kyc-section-label {
              display: flex; align-items: center; gap: 6px;
              font-size: 12px; font-weight: 700; letter-spacing: 0.4px;
              text-transform: uppercase; color: #475569;
            }
            .kyc-section-icon { height: 14px; width: 14px; color: #6366f1; }

            /* ── Account type cards ── */
            .kyc-type-grid { display: flex; flex-direction: column; gap: 10px; }
            .kyc-type-card {
              display: flex; align-items: center; gap: 14px;
              padding: 16px 18px; border-radius: 14px;
              border: 1.5px solid #e2e8f0; background: #fff;
              cursor: pointer; text-align: left;
              font-family: inherit;
              transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
            }
            .kyc-type-card:hover { border-color: #cbd5e1; background: #fafbfc; }
            .kyc-type-card--selected {
              border-color: #6366f1 !important; background: #fafaff !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
            }
            .kyc-type-icon-wrap {
              width: 38px; height: 38px; border-radius: 10px;
              display: flex; align-items: center; justify-content: center;
              background: #f1f5f9; flex-shrink: 0;
              transition: background 0.18s;
            }
            .kyc-type-card--selected .kyc-type-icon-wrap { background: #eef2ff; }
            .kyc-type-icon { height: 18px; width: 18px; color: #64748b; }
            .kyc-type-card--selected .kyc-type-icon { color: #6366f1; }
            .kyc-type-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
            .kyc-type-name { font-size: 14px; font-weight: 700; color: #0f172a; }
            .kyc-type-desc { font-size: 11px; color: #94a3b8; }
            .kyc-type-tag {
              font-size: 10px; font-weight: 700; letter-spacing: 0.3px;
              padding: 3px 8px; border-radius: 6px;
              background: #f1f5f9; color: #64748b;
              white-space: nowrap; flex-shrink: 0;
              transition: background 0.18s, color 0.18s;
            }
            .kyc-type-tag--selected { background: #eef2ff; color: #6366f1; }
            .kyc-type-radio {
              width: 18px; height: 18px; border-radius: 50%;
              border: 2px solid #d1d5db; flex-shrink: 0;
              position: relative;
              transition: border-color 0.15s;
            }
            .kyc-type-radio--on {
              border-color: #6366f1;
            }
            .kyc-type-radio--on::after {
              content: ""; position: absolute;
              top: 3px; left: 3px;
              width: 8px; height: 8px;
              border-radius: 50%; background: #6366f1;
            }

            /* ── Reused field styles ── */
            .rs-fields { display: flex; flex-direction: column; gap: 20px; }
            .rs-row { display: flex; gap: 16px; }
            .rs-row--2 > * { flex: 1; min-width: 0; }
            .rs-row--3 > * { flex: 1; min-width: 0; }
            @media (max-width: 520px) { .rs-row { flex-direction: column; } }
            .rs-field { display: flex; flex-direction: column; gap: 6px; }
            .rs-label {
              font-size: 12px !important; font-weight: 700 !important;
              letter-spacing: 0.4px !important; text-transform: uppercase !important;
              color: #475569 !important;
            }
            .rs-required { color: #ef4444; }
            .rs-input-wrap { position: relative; }
            .rs-input {
              height: 42px !important; padding-left: 38px !important;
              border-radius: 10px !important; border: 1px solid #e2e8f0 !important;
              background: #fff !important; font-size: 14px !important;
              font-weight: 500 !important; color: #0f172a !important;
              transition: border-color 0.15s, box-shadow 0.15s !important;
              font-family: inherit !important;
            }
            .kyc-input-no-icon { padding-left: 14px !important; }
            .rs-input:focus {
              border-color: #6366f1 !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
              outline: none !important;
            }
            .rs-input--error { border-color: #ef4444 !important; }
            .rs-select-trigger {
              height: 42px !important; border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important; background: #fff !important;
              font-size: 14px !important; font-weight: 500 !important;
              color: #0f172a !important; font-family: inherit !important;
            }
            .rs-select-trigger:focus {
              border-color: #6366f1 !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
            }
            .rs-placeholder { color: #94a3b8 !important; }
            .rs-icon {
              position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
              height: 15px; width: 15px; color: #94a3b8; pointer-events: none;
            }
            .rs-error {
              font-size: 12px; color: #ef4444; margin: 0; font-weight: 500;
            }

            /* ── Fade-in animation ── */
            .kyc-fade-in {
              animation: kyc-slide-in 0.28s ease both;
            }
            @keyframes kyc-slide-in {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityKyc);

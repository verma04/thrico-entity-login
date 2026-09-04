"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Building2, User, Check } from "lucide-react";
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

const validationSchema = Yup.object().shape({
  accountType: Yup.string()
    .oneOf(["individual", "enterprise"])
    .required("Account type is required"),
  panCard: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN (e.g. ABCDE1234F)")
    .required("PAN card is required"),
  gstNumber: Yup.string().when("accountType", {
    is: "enterprise",
    then: (schema) =>
      schema
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
          "Please enter a valid GSTIN (e.g. 22ABCDE1234F1Z5)"
        )
        .required("GST number is required for enterprise"),
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

const accountTypes = [
  {
    value: "individual" as AccountType,
    label: "Individual",
    description: "Personal, Freelancer or Sole Proprietor",
    icon: User,
  },
  {
    value: "enterprise" as AccountType,
    label: "Enterprise",
    description: "Registered Company, LLP or Organization",
    icon: Building2,
  },
];

const RegisterEntityKyc: React.FC<RegisterEntityKycProps> = ({
  setCurrent,
  kyc,
  setKyc,
}) => {
  const initialValues: KycFormData = useMemo(
    () => ({
      accountType: (kyc?.accountType || "individual") as AccountType,
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
        <Form className="w-full space-y-4">
          <FormikStepSync step={5} />

          {/* Account Type Selection */}
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium text-gray-700 block">
              Account type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {accountTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = values.accountType === type.value;
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
                      "flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer relative",
                      isSelected
                        ? "border-black bg-gray-50/80 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/40"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4.5 w-4.5", isSelected ? "text-black" : "text-gray-500")} />
                        <span className="text-[13.5px] font-semibold text-gray-900">{type.label}</span>
                      </div>
                      {isSelected && (
                        <div className="h-4.5 w-4.5 rounded-full bg-black flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11.5px] text-gray-500 leading-snug">{type.description}</p>
                  </button>
                );
              })}
            </div>
            {touched.accountType && errors.accountType && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.accountType as string}</p>
            )}
          </div>

          {/* PAN & GST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="panCard" className="text-[12.5px] font-medium text-gray-700 block">
                PAN card number <span className="text-red-500">*</span>
              </label>
              <Input
                id="panCard"
                name="panCard"
                placeholder="ABCDE1234F"
                value={values.panCard}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                  setFieldValue("panCard", val);
                }}
                onBlur={handleBlur}
                maxLength={10}
                className={cn(
                  "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white font-mono uppercase transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                  touched.panCard && errors.panCard && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {touched.panCard && errors.panCard && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.panCard as string}</p>
              )}
            </div>

            {values.accountType === "enterprise" && (
              <div className="space-y-1.5">
                <label htmlFor="gstNumber" className="text-[12.5px] font-medium text-gray-700 block">
                  GST number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  placeholder="22ABCDE1234F1Z5"
                  value={values.gstNumber}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
                    setFieldValue("gstNumber", val);
                  }}
                  onBlur={handleBlur}
                  maxLength={15}
                  className={cn(
                    "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white font-mono uppercase transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                    touched.gstNumber && errors.gstNumber && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                {touched.gstNumber && errors.gstNumber && (
                  <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.gstNumber as string}</p>
                )}
              </div>
            )}
          </div>

          {/* Billing Address Line 1 */}
          <div className="space-y-1.5">
            <label htmlFor="billingAddressLine1" className="text-[12.5px] font-medium text-gray-700 block">
              Billing address <span className="text-red-500">*</span>
            </label>
            <Input
              id="billingAddressLine1"
              name="billingAddressLine1"
              placeholder="Street address, building name"
              value={values.billingAddressLine1}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                touched.billingAddressLine1 && errors.billingAddressLine1 && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {touched.billingAddressLine1 && errors.billingAddressLine1 && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.billingAddressLine1 as string}</p>
            )}
          </div>

          {/* Billing Address Line 2 */}
          <div className="space-y-1.5">
            <Input
              name="billingAddressLine2"
              placeholder="Apartment, suite, unit (optional)"
              value={values.billingAddressLine2}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* City, State, PIN Code */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="space-y-1.5">
              <label htmlFor="billingCity" className="text-[12.5px] font-medium text-gray-700 block">
                City <span className="text-red-500">*</span>
              </label>
              <Input
                id="billingCity"
                name="billingCity"
                placeholder="City"
                value={values.billingCity}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                  touched.billingCity && errors.billingCity && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {touched.billingCity && errors.billingCity && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.billingCity as string}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 block">
                State <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(val) => setFieldValue("billingState", val)}
                defaultValue={values.billingState}
              >
                <SelectTrigger
                  className={cn(
                    "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                    !values.billingState && "text-gray-400",
                    touched.billingState && errors.billingState && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="max-h-[220px] rounded-lg border border-gray-200">
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state} className="text-[13px] py-1.5 cursor-pointer">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.billingState && errors.billingState && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.billingState as string}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="billingPincode" className="text-[12.5px] font-medium text-gray-700 block">
                PIN code <span className="text-red-500">*</span>
              </label>
              <Input
                id="billingPincode"
                name="billingPincode"
                placeholder="400001"
                value={values.billingPincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setFieldValue("billingPincode", val);
                }}
                onBlur={handleBlur}
                maxLength={6}
                className={cn(
                  "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                  touched.billingPincode && errors.billingPincode && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {touched.billingPincode && errors.billingPincode && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.billingPincode as string}</p>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityKyc);

"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import Language from "./register-entity-language";
import type { CountryData } from "./types/register-entity-types";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface PreferencesFormData {
  country: string;
  language: string;
}

interface RegisterEntityPreferencesProps {
  profile: {
    country?: string;
    language?: string;
  };
  setProfile: (values: any) => void;
  setCurrent: (step: number) => void;
  countries: CountryData[];
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  language: Yup.string().required("Language is required"),
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

const RegisterEntityPreferences: React.FC<RegisterEntityPreferencesProps> = ({
  profile,
  setProfile,
  setCurrent,
  countries,
}) => {
  const initialValues = useMemo(
    () => ({
      country: profile?.country || "",
      language: profile?.language || "",
    }),
    [profile]
  );

  const onFinish = (values: PreferencesFormData) => {
    setProfile(values);
    setCurrent(3);
  };

  const sortedCountries = useMemo(
    () => countries?.sort((a, b) => a.name.localeCompare(b.name)) || [],
    [countries]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
      enableReinitialize
      validateOnMount
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="w-full">
          <FormikStepSync step={2} />

          <div className="rs-header">
            <h2 className="rs-title">Regional settings</h2>
          </div>

          <div className="rs-fields">
            <div className="rs-field">
              <Label className="rs-label">
                Country <span className="rs-required">*</span>
              </Label>
              <div className="rs-input-wrap">
                <Select
                  onValueChange={(val) => setFieldValue("country", val)}
                  defaultValue={values.country}
                >
                  <SelectTrigger
                    className={cn(
                      "rs-select-trigger",
                      !values.country && "rs-placeholder",
                      touched.country && errors.country && "rs-input--error"
                    )}
                  >
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    {sortedCountries.map((country: CountryData) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Globe className="rs-icon" />
              </div>
              {touched.country && errors.country && (
                <p className="rs-error">{errors.country as string}</p>
              )}
            </div>

            <div className="rs-field">
              <Label className="rs-label">
                Language <span className="rs-required">*</span>
              </Label>
              <Language isFormik initialValue={initialValues.language} />
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
            .rs-sub { font-size: 14px; color: #64748b; margin: 0; }
            .rs-fields { display: flex; flex-direction: column; gap: 20px; }
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
            .rs-select-trigger {
              height: 42px !important;
              padding-left: 38px !important;
              border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important;
              background: #fff !important;
              font-size: 14px !important;
              font-weight: 500 !important;
              color: #0f172a !important;
              font-family: inherit !important;
            }
            .rs-select-trigger:focus {
              border-color: #6366f1 !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
            }
            .rs-placeholder { color: #94a3b8 !important; }
            .rs-input--error { border-color: #ef4444 !important; }
            .rs-icon {
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              height: 15px;
              width: 15px;
              color: #94a3b8;
              pointer-events: none;
              z-index: 1;
            }
            .rs-error { font-size: 12px; color: #ef4444; margin: 0; font-weight: 500; }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityPreferences);

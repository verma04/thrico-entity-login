"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Globe, MapPin, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface OrganizationLocationData {
  website: string;
  address: string;
}

interface RegisterEntityLocationProps {
  setCurrent: (step: number) => void;
  organization: any;
  setOrganization: (org: any) => void;
}

const validationSchema = Yup.object().shape({
  website: Yup.string()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}$/, "Enter a valid URL")
    .required("Website is required"),
  address: Yup.string().min(5, "Too short").required("Address is required"),
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

const RegisterEntityLocation: React.FC<RegisterEntityLocationProps> = ({
  setCurrent,
  organization,
  setOrganization,
}) => {
  const [autoCompleteResult, setAutoCompleteResult] = React.useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = React.useState(false);

  const initialValues = useMemo(
    () => ({
      website: organization?.website || "",
      address: organization?.address || "",
    }),
    [organization]
  );

  const onWebsiteChange = (value: string) => {
    if (!value || value.includes(".")) {
      setAutoCompleteResult([]);
      setShowAutocomplete(false);
    } else {
      const suggestions = [".com", ".org", ".net", ".tech", ".in", ".io"].map(
        (domain) => `${value.toLowerCase()}${domain}`
      );
      setAutoCompleteResult(suggestions);
      setShowAutocomplete(true);
    }
  };

  const onFinish = (values: OrganizationLocationData) => {
    setOrganization({ ...organization, ...values });
    setCurrent(5);
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
          <FormikStepSync step={4} />

          <div className="rs-header">
            <h2 className="rs-title">Location & website</h2>
            <p className="rs-sub">Establish your physical and digital presence</p>
          </div>

          <div className="rs-fields">
            <div className="rs-field">
              <Label className="rs-label">
                Official Website <span className="rs-required">*</span>
              </Label>
              <div className="rs-input-wrap">
                <Input
                  name="website"
                  placeholder="example.com"
                  value={values.website}
                  onChange={(e) => {
                    handleChange(e);
                    onWebsiteChange(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    setTimeout(() => setShowAutocomplete(false), 200);
                  }}
                  className={cn(
                    "rs-input",
                    touched.website && errors.website && "rs-input--error"
                  )}
                />
                <Globe className="rs-icon" />

                {showAutocomplete && autoCompleteResult.length > 0 && (
                  <div className="rs-autocomplete">
                    {autoCompleteResult.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="rs-autocomplete-item"
                        onClick={() => {
                          setFieldValue("website", option);
                          setShowAutocomplete(false);
                        }}
                      >
                        <span>{option}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {touched.website && errors.website && (
                <p className="rs-error">{errors.website as string}</p>
              )}
            </div>

            <div className="rs-field">
              <Label className="rs-label">
                Headquarters Address <span className="rs-required">*</span>
              </Label>
              <div className="rs-input-wrap">
                <Textarea
                  name="address"
                  placeholder="Street, City, State, ZIP"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "rs-textarea",
                    touched.address && errors.address && "rs-input--error"
                  )}
                />
                <MapPin className="rs-icon rs-icon--top" />
              </div>
              {touched.address && errors.address && (
                <p className="rs-error">{errors.address as string}</p>
              )}
            </div>
          </div>

          <style>{`
            .rs-header { margin-bottom: 28px; }
            .rs-title { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px; margin: 0 0 6px; }
            .rs-sub { font-size: 14px; color: #64748b; margin: 0; }
            .rs-fields { display: flex; flex-direction: column; gap: 20px; }
            .rs-field { display: flex; flex-direction: column; gap: 6px; }
            .rs-label { font-size: 12px !important; font-weight: 700 !important; letter-spacing: 0.4px !important; text-transform: uppercase !important; color: #475569 !important; }
            .rs-required { color: #ef4444; }
            .rs-input-wrap { position: relative; }
            .rs-input {
              height: 42px !important; padding-left: 38px !important; border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important; background: #fff !important;
              font-size: 14px !important; font-weight: 500 !important; color: #0f172a !important;
              transition: border-color 0.15s, box-shadow 0.15s !important; font-family: inherit !important;
            }
            .rs-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none !important; }
            .rs-input--error { border-color: #ef4444 !important; }
            .rs-textarea {
              min-height: 100px !important; padding: 12px 12px 12px 38px !important; border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important; background: #fff !important;
              font-size: 14px !important; font-weight: 500 !important; color: #0f172a !important;
              resize: none !important; font-family: inherit !important;
              transition: border-color 0.15s, box-shadow 0.15s !important;
            }
            .rs-textarea:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none !important; }
            .rs-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); height: 15px; width: 15px; color: #94a3b8; pointer-events: none; }
            .rs-icon--top { top: 14px; transform: none; }
            .rs-autocomplete {
              position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 50;
              background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
              box-shadow: 0 4px 16px rgba(0,0,0,0.08); padding: 4px; overflow: hidden;
            }
            .rs-autocomplete-item {
              width: 100%; display: flex; align-items: center; justify-content: space-between;
              padding: 9px 12px; border: none; background: transparent; cursor: pointer;
              font-size: 13px; font-weight: 500; color: #334155; border-radius: 7px;
              text-align: left; font-family: inherit; transition: background 0.12s;
            }
            .rs-autocomplete-item:hover { background: #f8fafc; }
            .rs-error { font-size: 12px; color: #ef4444; margin: 0; font-weight: 500; }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityLocation);

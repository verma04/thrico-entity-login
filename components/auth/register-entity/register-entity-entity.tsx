"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Building2 } from "lucide-react";
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

interface OrganizationFormData {
  name: string;
  entityType: string;
  industryType: string;
}

interface RegisterEntityEntityProps {
  setCurrent: (step: number) => void;
  organization: any;
  setOrganization: (org: any) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Entity name is required"),
  entityType: Yup.string().required("Category is required"),
  industryType: Yup.string().required("Industry is required"),
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

const entityTypes = [
  { value: "academia", label: "Academia", description: "Educational Institution" },
  { value: "enterprise", label: "Enterprise", description: "Large Business" },
  { value: "creator", label: "Creator", description: "Content Creator" },
  { value: "association", label: "Association", description: "Non-profit / Group" },
  { value: "startup", label: "Startup", description: "Early-stage Company" },
];

const industryTypes = [
  { value: "Technology", label: "Technology", icon: "💻" },
  { value: "Retail", label: "Retail", icon: "🛍️" },
  { value: "Education", label: "Education", icon: "🎓" },
  { value: "Finance", label: "Finance", icon: "💰" },
  { value: "Healthcare", label: "Healthcare", icon: "🏥" },
  { value: "Manufacturing", label: "Manufacturing", icon: "🏭" },
  { value: "other", label: "Other", icon: "📊" },
];

const RegisterEntityEntity: React.FC<RegisterEntityEntityProps> = ({
  setCurrent,
  organization,
  setOrganization,
}) => {
  const initialValues = useMemo(
    () => ({
      name: organization?.name || "",
      entityType: organization?.entityType || "",
      industryType: organization?.industryType || "",
    }),
    [organization]
  );

  const onFinish = (values: OrganizationFormData) => {
    setOrganization({ ...organization, ...values });
    setCurrent(4);
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
          <FormikStepSync step={3} />

          <div className="rs-header">
            <h2 className="rs-title">Organization details</h2>
            <p className="rs-sub">Tell us about the entity you're registering</p>
          </div>

          <div className="rs-fields">
            <div className="rs-field">
              <Label className="rs-label">
                Entity Name <span className="rs-required">*</span>
              </Label>
              <div className="rs-input-wrap">
                <Input
                  name="name"
                  placeholder="e.g. Acme Corp"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "rs-input",
                    touched.name && errors.name && "rs-input--error"
                  )}
                />
                <Building2 className="rs-icon" />
              </div>
              {touched.name && errors.name && (
                <p className="rs-error">{errors.name as string}</p>
              )}
            </div>

            <div className="rs-row rs-row--2">
              <div className="rs-field">
                <Label className="rs-label">
                  Category <span className="rs-required">*</span>
                </Label>
                <Select
                  onValueChange={(val) => setFieldValue("entityType", val)}
                  defaultValue={values.entityType}
                >
                  <SelectTrigger
                    className={cn(
                      "rs-select-trigger",
                      !values.entityType && "rs-placeholder",
                      touched.entityType && errors.entityType && "rs-input--error"
                    )}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex flex-col py-0.5">
                          <span className="font-semibold text-sm">{item.label}</span>
                          <span className="text-[11px] text-slate-400">{item.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.entityType && errors.entityType && (
                  <p className="rs-error">{errors.entityType as string}</p>
                )}
              </div>

              <div className="rs-field">
                <Label className="rs-label">
                  Industry <span className="rs-required">*</span>
                </Label>
                <Select
                  onValueChange={(val) => setFieldValue("industryType", val)}
                  defaultValue={values.industryType}
                >
                  <SelectTrigger
                    className={cn(
                      "rs-select-trigger",
                      !values.industryType && "rs-placeholder",
                      touched.industryType && errors.industryType && "rs-input--error"
                    )}
                  >
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="font-semibold text-sm">{item.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.industryType && errors.industryType && (
                  <p className="rs-error">{errors.industryType as string}</p>
                )}
              </div>
            </div>
          </div>

          <style>{`
            .rs-header { margin-bottom: 28px; }
            .rs-title {
              font-size: 20px; font-weight: 800; color: #0f172a;
              letter-spacing: -0.4px; margin: 0 0 6px;
            }
            .rs-sub { font-size: 14px; color: #64748b; margin: 0; }
            .rs-fields { display: flex; flex-direction: column; gap: 20px; }
            .rs-row { display: flex; gap: 16px; }
            .rs-row--2 > * { flex: 1; min-width: 0; }
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
            .rs-input:focus {
              border-color: #6366f1 !important;
              box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none !important;
            }
            .rs-input--error { border-color: #ef4444 !important; }
            .rs-select-trigger {
              height: 42px !important; border-radius: 10px !important;
              border: 1px solid #e2e8f0 !important; background: #fff !important;
              font-size: 14px !important; font-weight: 500 !important;
              color: #0f172a !important; font-family: inherit !important;
            }
            .rs-select-trigger:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; }
            .rs-placeholder { color: #94a3b8 !important; }
            .rs-icon {
              position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
              height: 15px; width: 15px; color: #94a3b8; pointer-events: none;
            }
            .rs-error { font-size: 12px; color: #ef4444; margin: 0; font-weight: 500; }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityEntity);

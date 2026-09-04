"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";
import { useCheckDomain } from "@/components/graphql/actions";
import { generateSlug } from "random-word-slugs";

interface DomainFormData {
  domain: string;
  agreement: boolean;
}

interface RegisterEntityDomainProps {
  setCurrent?: (step: number) => void;
  domain: string;
  setDomain: (domain: string) => void;
  onSubmit: (values: DomainFormData) => void;
  loading: boolean;
  logo?: any;
  setLogo?: (logo: any) => void;
  logoPreview?: string;
  setLogoPreview?: (preview: string) => void;
}

const validationSchema = Yup.object().shape({
  domain: Yup.string()
    .min(3, "Min 3 characters")
    .matches(/^[a-z0-9-]+$/, "Lowercase letters & hyphens only")
    .required("Subdomain is required"),
  agreement: Yup.boolean().oneOf([true], "You must agree to continue").required("Required"),
});

const FormikStepSync = ({
  step,
  isDomainAvailable,
}: {
  step: number;
  isDomainAvailable: boolean;
}) => {
  const { isValid, values, handleSubmit } = useFormikContext<DomainFormData>();
  const { setStepValidity, setSubmitHandler, setDomain, setOrganization } =
    useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid && isDomainAvailable);
  }, [isValid, isDomainAvailable, step, setStepValidity]);

  React.useEffect(() => {
    setDomain(values.domain);
  }, [values.domain, setDomain]);

  React.useEffect(() => {
    setOrganization({ agreement: values.agreement });
  }, [values.agreement, setOrganization]);

  React.useEffect(() => {
    setSubmitHandler(step, handleSubmit);
  }, [step, setSubmitHandler, handleSubmit]);

  return null;
};

const DomainFormContent: React.FC = () => {
  const { values, errors, touched, setFieldValue, handleBlur } =
    useFormikContext<DomainFormData>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debouncedDomain, setDebouncedDomain] = useState(values.domain);

  const domain = values.domain;
  const hasValidFormat = domain.length >= 3 && !errors.domain;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDomain(domain), 500);
    return () => clearTimeout(timer);
  }, [domain]);

  const { data, loading: checkLoading } = useCheckDomain({
    variables: { input: { domain: debouncedDomain } },
    skip: !hasValidFormat || domain !== debouncedDomain,
    fetchPolicy: "network-only",
  });

  const isDomainAvailable = hasValidFormat && data?.checkDomain?.success;
  const isDomainTaken = hasValidFormat && data?.checkDomain?.success === false;
  const isChecking = (checkLoading || domain !== debouncedDomain) && domain.length >= 3;

  const generateSuggestions = () => {
    setSuggestions(
      Array.from({ length: 4 }, () => generateSlug(2, { format: "kebab" }))
    );
  };

  useEffect(() => {
    if (suggestions.length === 0) generateSuggestions();
  }, [suggestions.length]);

  const handleDomainChange = (value: string) => {
    let s = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    s = s.replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
    setFieldValue("domain", s);
  };

  const fullDomain = domain ? `${domain}.thrico.community` : "";

  return (
    <Form className="w-full space-y-4">
      <FormikStepSync
        step={6}
        isDomainAvailable={isDomainAvailable === true}
      />

      {/* Subdomain Input */}
      <div className="space-y-1.5">
        <label htmlFor="domain" className="text-[12.5px] font-medium text-gray-700 block">
          Choose subdomain <span className="text-red-500">*</span>
        </label>
        <div
          className={cn(
            "flex items-center w-full h-10 rounded-md border text-[13.5px] bg-white transition-all overflow-hidden border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black",
            isDomainAvailable && "border-emerald-500 focus-within:border-emerald-600 focus-within:ring-emerald-500",
            isDomainTaken && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500",
            touched.domain && errors.domain && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
          )}
        >
          <span className="px-3 text-[12.5px] font-medium text-gray-400 bg-gray-50 border-r border-gray-200 select-none">
            https://
          </span>
          <Input
            id="domain"
            type="text"
            name="domain"
            value={values.domain}
            placeholder="brand-name"
            className="flex-1 h-full px-3 border-0 rounded-none text-[13.5px] text-gray-900 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 font-mono"
            onChange={(e) => handleDomainChange(e.target.value)}
            onBlur={handleBlur}
            maxLength={63}
          />
          <span className="px-3 text-[12.5px] font-medium text-gray-500 bg-gray-50 border-l border-gray-200 select-none">
            .thrico.community
          </span>
        </div>

        {/* Availability status */}
        {isChecking && (
          <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-600" />
            <span>Checking availability...</span>
          </div>
        )}
        {isDomainAvailable && domain === debouncedDomain && (
          <div className="flex items-center gap-1.5 text-[12px] text-emerald-600 font-medium mt-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>{fullDomain}</strong> is available!</span>
          </div>
        )}
        {isDomainTaken && domain === debouncedDomain && (
          <div className="space-y-2 mt-1">
            <div className="flex items-center gap-1.5 text-[12px] text-red-600 font-medium">
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
              <span>This subdomain is already taken</span>
            </div>
            {suggestions.length > 0 && (
              <div className="p-2.5 rounded-md bg-gray-50 border border-gray-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11.5px] text-gray-500 font-medium">
                  <span>Suggested alternatives:</span>
                  <button
                    type="button"
                    onClick={generateSuggestions}
                    className="text-[#005bd3] hover:underline cursor-pointer"
                  >
                    Refresh
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFieldValue("domain", s)}
                      className="px-2.5 py-1 rounded text-[11.5px] font-mono bg-white border border-gray-200 text-gray-700 hover:border-black hover:text-black cursor-pointer transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {touched.domain && errors.domain && !isChecking && (
          <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.domain as string}</p>
        )}
      </div>

      {/* Terms & Agreement Checkbox */}
      <div className="pt-1">
        <div className="flex items-start gap-3 p-3.5 rounded-lg border border-gray-200 bg-gray-50/50">
          <Checkbox
            id="agreement"
            checked={values.agreement}
            onCheckedChange={(checked) => setFieldValue("agreement", Boolean(checked))}
            className="mt-0.5 h-4.5 w-4.5"
          />
          <label htmlFor="agreement" className="text-[12.5px] text-gray-700 cursor-pointer select-none leading-relaxed">
            <span className="font-semibold text-gray-900 block">
              I am authorized to create this entity
            </span>
            I agree to the{" "}
            <a
              href="https://thrico.com/terms"
              target="_blank"
              rel="noreferrer"
              className="text-[#005bd3] hover:underline font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://thrico.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="text-[#005bd3] hover:underline font-medium"
            >
              Privacy Policy <ExternalLink className="h-3 w-3 inline text-gray-400" />
            </a>
            .
          </label>
        </div>
        {touched.agreement && errors.agreement && (
          <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.agreement as string}</p>
        )}
      </div>
    </Form>
  );
};

const RegisterEntityDomain: React.FC<RegisterEntityDomainProps> = ({
  domain: initialDomain,
  setDomain,
  onSubmit,
}) => {
  const initialValues = useMemo(
    () => ({ domain: initialDomain || "", agreement: false }),
    [initialDomain]
  );

  const onFinish = (values: DomainFormData) => {
    setDomain(values.domain);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
      enableReinitialize
      validateOnMount
    >
      <DomainFormContent />
    </Formik>
  );
};

export default React.memo(RegisterEntityDomain);

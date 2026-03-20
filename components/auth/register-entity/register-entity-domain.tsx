"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Loader2,
  Link2,
  Upload,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";
import { useCheckDomain } from "@/components/graphql/actions";
import { generateSlug } from "random-word-slugs";

import LogoUpload from "./register-entity-logo-upload";

interface DomainFormData {
  domain: string;
  agreement: boolean;
}

interface RegisterEntityDomainProps {
  setCurrent: (step: number) => void;
  domain: string;
  setDomain: (domain: string) => void;
  onSubmit: (values: DomainFormData) => void;
  loading: boolean;
  logo: any;
  setLogo: (logo: any) => void;
  logoPreview: string;
  setLogoPreview: (url: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const validationSchema = Yup.object().shape({
  domain: Yup.string()
    .min(3, "Min 3 chars")
    .matches(/^[a-z0-9-]+$/, "Lowercase & hyphens only")
    .required("Subdomain is required"),
  agreement: Yup.boolean().oneOf([true], "Required").required("Required"),
});

const FormikStepSync = ({
  step,
  isDomainAvailable,
  isLogoUploaded,
}: {
  step: number;
  isDomainAvailable: boolean;
  isLogoUploaded: boolean;
}) => {
  const { isValid, values, handleSubmit } = useFormikContext<DomainFormData>();
  const { setStepValidity, setSubmitHandler, setDomain, setOrganization } = useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid && isDomainAvailable && isLogoUploaded);
  }, [isValid, isDomainAvailable, isLogoUploaded, step, setStepValidity]);

  // Keep store in sync for the final submission
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

const DomainFormContent: React.FC<{
  logoPreview: string;
  setLogoPreview: (url: string) => void;
  setLogo: (logo: any) => void;
}> = ({ logoPreview, setLogoPreview, setLogo }) => {
  const { values, errors, touched, setFieldValue, handleBlur } =
    useFormikContext<DomainFormData>();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const domain = values.domain;
  const hasValidFormat = domain.length >= 3 && !errors.domain;

  // Domain search with debounced variables
  const [debouncedDomain, setDebouncedDomain] = useState(domain);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDomain(domain);
    }, 500);
    return () => clearTimeout(timer);
  }, [domain]);

  const { data, loading: checkLoading } = useCheckDomain({
    variables: {
      input: { domain: debouncedDomain },
    },
    skip: !hasValidFormat || domain !== debouncedDomain,
    fetchPolicy: "network-only",
  });

  const isDomainAvailable = hasValidFormat && data?.checkDomain?.success;
  const isDomainTaken = hasValidFormat && data?.checkDomain?.success === false;

  const generateSuggestions = () => {
    const newSuggestions = Array.from({ length: 3 }, () =>
      generateSlug(3, { format: "kebab" }),
    );
    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    if (suggestions.length === 0) {
      generateSuggestions();
    }
  }, [suggestions.length]);

  const handleDomainChange = (value: string) => {
    let sanitized = value.toLowerCase();
    sanitized = sanitized.replace(/\s+/g, "-");
    sanitized = sanitized.replace(/[^a-z0-9-]/g, "");
    sanitized = sanitized.replace(/^-+|-+$/g, "");
    sanitized = sanitized.replace(/-{2,}/g, "-");
    setFieldValue("domain", sanitized);
  };

  const fullDomain = domain ? `https://${domain}.thrico.community` : "";

  return (
    <Form className="w-full">
      <FormikStepSync 
        step={5} 
        isDomainAvailable={isDomainAvailable === true} 
        isLogoUploaded={!!logoPreview}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-2xl mx-auto flex flex-col gap-10 px-4"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-indigo-500/10 mb-6 group transition-all duration-500 hover:scale-110 shadow-indigo-500/5 shadow-2xl">
            <Fingerprint className="h-8 w-8 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2 uppercase italic scale-y-110">
            Identity & Branding
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Customize your unique digital presence within the Thrico ecosystem
          </p>
        </motion.div>

        {/* Logo Upload Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Upload className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Workspace Logo
            </h3>
          </div>
          <LogoUpload
            imageUrl={logoPreview}
            setImageUrl={setLogoPreview}
            setCover={setLogo}
            buttonText="Upload Visual Asset"
          />
          <p className="text-[11px] text-slate-400 font-medium ml-1">
            Recommended: Square image (min 200x200px) with transparent
            background
          </p>
        </motion.div>

        {/* Domain Selection Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Link2 className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Permanent Subdomain
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label className="text-[13px] font-bold text-slate-600 dark:text-slate-300 ml-1">
                  Claim Subdomain *
                </Label>
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full border-none ring-1 ring-indigo-500/10"
                >
                  Fixed Identity
                </Badge>
              </div>

              <div
                className={cn(
                  "flex items-center bg-white dark:bg-slate-950 p-1.5 rounded-2xl border-2 transition-all duration-300",
                  isDomainAvailable
                    ? "border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    : isDomainTaken
                      ? "border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                      : "border-slate-200 dark:border-slate-800 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10",
                )}
              >
                <span className="text-sm font-black text-slate-300 dark:text-slate-700 pl-4 font-mono select-none">
                  https://
                </span>

                <Input
                  type="text"
                  name="domain"
                  value={values.domain}
                  placeholder="brand-name"
                  className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-xl font-black text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 py-6"
                  onChange={(e) => handleDomainChange(e.target.value)}
                  onBlur={handleBlur}
                  maxLength={63}
                />

                <span className="text-sm font-black text-indigo-500/60 dark:text-indigo-400/60 pr-4 font-mono select-none">
                  .thrico.community
                </span>
              </div>
            </div>

            {/* Domain Status Indicators */}
            <AnimatePresence mode="wait">
              {(checkLoading || domain !== debouncedDomain) &&
                domain.length >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                    <span className="text-xs font-bold text-slate-500">
                      Checking global registry...
                    </span>
                  </motion.div>
                )}

              {isDomainAvailable && domain === debouncedDomain && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 shadow-lg shadow-green-500/5"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest">
                      Domain Available
                    </p>
                    <p className="text-[11px] text-green-600/70 dark:text-green-400/70 truncate font-mono mt-0.5">
                      {fullDomain}
                    </p>
                  </div>
                </motion.div>
              )}

              {isDomainTaken && domain === debouncedDomain && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 shadow-lg shadow-red-500/5">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                        Subdomain Occupied
                      </p>
                      <p className="text-[11px] text-red-600/70 dark:text-red-400/70 truncate font-mono mt-0.5">
                        Choose a different variant
                      </p>
                    </div>
                  </div>

                  {/* Suggestions List */}
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Quick Alternatives
                      </p>
                      <button
                        type="button"
                        onClick={generateSuggestions}
                        className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 underline"
                      >
                        Refresh
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setFieldValue("domain", suggestion)}
                          className="px-3 py-2 text-[11px] font-black font-mono bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-indigo-500/20"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message if local validation fails */}
            {touched.domain && errors.domain && !checkLoading && (
              <p className="text-[11px] text-red-500 font-bold uppercase tracking-widest ml-1 animate-pulse">
                {errors.domain as string}
              </p>
            )}
          </div>
        </motion.div>

        {/* Agreement Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Shield className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Compliance & Terms
            </h3>
          </div>

          <div
            className={cn(
              "group/agreement flex items-start gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 cursor-pointer overflow-hidden relative",
              values.agreement
                ? "bg-indigo-500/5 border-indigo-500/20 shadow-indigo-500/5 shadow-xl"
                : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-200",
            )}
          >
            {/* Agreement Background Glow */}
            <div
              className={cn(
                "absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/agreement:opacity-100 transition-opacity pointer-events-none",
                values.agreement && "opacity-100",
              )}
            />

            <div className="relative z-10 flex items-start gap-4">
              <Checkbox
                id="agreement"
                checked={values.agreement}
                onCheckedChange={(checked) =>
                  setFieldValue("agreement", Boolean(checked))
                }
                className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 shadow-sm transition-all"
              />
              <div className="space-y-1.5 min-w-0">
                <Label
                  htmlFor="agreement"
                  className="text-sm font-black text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1.5"
                >
                  I'm legally authorized to register this entity
                </Label>
                <div className="text-[11px] font-medium text-slate-400 leading-normal">
                  I confirm that all provided information is accurate and I
                  agree to the{" "}
                  <a
                    href="https://thrico.com/privacy-policy/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-500 hover:underline font-black inline-flex items-center gap-0.5"
                  >
                    Privacy Policy
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {touched.agreement && errors.agreement && (
            <p className="ml-1 text-[11px] text-red-500 font-bold uppercase tracking-widest">
              {errors.agreement as string}
            </p>
          )}
        </motion.div>
      </motion.div>
    </Form>
  );
};

const RegisterEntityDomain: React.FC<RegisterEntityDomainProps> = ({
  setCurrent,
  domain: initialDomain,
  setDomain,
  onSubmit,
  loading: submitLoading,
  logo,
  setLogo,
  logoPreview,
  setLogoPreview,
}) => {
  const initialValues = useMemo(
    () => ({
      domain: initialDomain || "",
      agreement: false,
    }),
    [initialDomain],
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
      <DomainFormContent
        logoPreview={logoPreview}
        setLogoPreview={setLogoPreview}
        setLogo={setLogo}
      />
    </Formik>
  );
};

export default React.memo(RegisterEntityDomain);

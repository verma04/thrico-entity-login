"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Upload,
  Link2,
  Shield,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  isLogoUploaded,
}: {
  step: number;
  isDomainAvailable: boolean;
  isLogoUploaded: boolean;
}) => {
  const { isValid, values, handleSubmit } = useFormikContext<DomainFormData>();
  const { setStepValidity, setSubmitHandler, setDomain, setOrganization } =
    useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid && isDomainAvailable && isLogoUploaded);
  }, [isValid, isDomainAvailable, isLogoUploaded, step, setStepValidity]);

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
    <Form className="w-full">
      <FormikStepSync
        step={5}
        isDomainAvailable={isDomainAvailable === true}
        isLogoUploaded={!!logoPreview}
      />

      <div className="rd-header">
        <h2 className="rs-title">Identity & branding</h2>
        <p className="rs-sub">Finalise your unique digital identity on Thrico</p>
      </div>

      <div className="rd-sections">
        {/* Logo Section */}
        <div className="rd-section">
          <div className="rd-section-label">
            <Upload className="h-3.5 w-3.5" />
            Workspace Logo <span className="rs-required">*</span>
          </div>
          <LogoUpload
            imageUrl={logoPreview}
            setImageUrl={setLogoPreview}
            setCover={setLogo}
            buttonText="Upload Logo"
          />
          <p className="rd-hint">Square image, min 200×200px. Transparent background preferred.</p>
        </div>

        {/* Subdomain Section */}
        <div className="rd-section">
          <div className="rd-section-label">
            <Link2 className="h-3.5 w-3.5" />
            Subdomain <span className="rs-required">*</span>
          </div>

          {/* Domain input row */}
          <div
            className={cn(
              "rd-domain-wrap",
              isDomainAvailable && "rd-domain-wrap--ok",
              isDomainTaken && "rd-domain-wrap--err"
            )}
          >
            <span className="rd-domain-prefix">https://</span>
            <Input
              type="text"
              name="domain"
              value={values.domain}
              placeholder="brand-name"
              className="rd-domain-input"
              onChange={(e) => handleDomainChange(e.target.value)}
              onBlur={handleBlur}
              maxLength={63}
            />
            <span className="rd-domain-suffix">.thrico.community</span>
          </div>

          {/* Status */}
          {isChecking && (
            <div className="rd-status rd-status--checking">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Checking availability…
            </div>
          )}
          {isDomainAvailable && domain === debouncedDomain && (
            <div className="rd-status rd-status--ok">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>
                <strong>{fullDomain}</strong> is available
              </span>
            </div>
          )}
          {isDomainTaken && domain === debouncedDomain && (
            <>
              <div className="rd-status rd-status--err">
                <AlertTriangle className="h-3.5 w-3.5" />
                This subdomain is already taken
              </div>
              {/* Suggestions */}
              <div className="rd-suggestions">
                <div className="rd-suggestions-header">
                  <span>Try one of these</span>
                  <button type="button" onClick={generateSuggestions} className="rd-refresh">
                    Refresh
                  </button>
                </div>
                <div className="rd-pills">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFieldValue("domain", s)}
                      className="rd-pill"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {touched.domain && errors.domain && !isChecking && (
            <p className="rs-error">{errors.domain as string}</p>
          )}
        </div>

        {/* Agreement */}
        <div className="rd-section">
          <div className="rd-section-label">
            <Shield className="h-3.5 w-3.5" />
            Terms & Agreement
          </div>
          <div
            className={cn(
              "rd-agreement",
              values.agreement && "rd-agreement--checked"
            )}
          >
            <Checkbox
              id="agreement"
              checked={values.agreement}
              onCheckedChange={(checked) => setFieldValue("agreement", Boolean(checked))}
              className="rd-checkbox"
            />
            <label htmlFor="agreement" className="rd-agreement-label">
              <span className="rd-agreement-title">
                I am legally authorised to register this entity
              </span>
              <span className="rd-agreement-desc">
                All information provided is accurate and I agree to the{" "}
                <a
                  href="https://thrico.com/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                  className="rd-agreement-link"
                >
                  Privacy Policy <ExternalLink className="h-2.5 w-2.5 inline" />
                </a>
              </span>
            </label>
          </div>
          {touched.agreement && errors.agreement && (
            <p className="rs-error">{errors.agreement as string}</p>
          )}
        </div>
      </div>

      <style>{`
        .rd-header { margin-bottom: 28px; }
        .rs-title { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px; margin: 0 0 6px; }
        .rs-sub { font-size: 14px; color: #64748b; margin: 0; }
        .rs-required { color: #ef4444; }
        .rs-error { font-size: 12px; color: #ef4444; margin: 4px 0 0; font-weight: 500; }

        .rd-sections { display: flex; flex-direction: column; gap: 28px; }
        .rd-section { display: flex; flex-direction: column; gap: 10px; }
        .rd-section-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.6px;
          text-transform: uppercase; color: #64748b;
          padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;
        }
        .rd-hint { font-size: 11px; color: #94a3b8; margin: 0; }

        /* Domain input */
        .rd-domain-wrap {
          display: flex; align-items: center;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          background: #fff; overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rd-domain-wrap:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .rd-domain-wrap--ok { border-color: #10b981; }
        .rd-domain-wrap--ok:focus-within { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.12); }
        .rd-domain-wrap--err { border-color: #ef4444; }
        .rd-domain-wrap--err:focus-within { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }

        .rd-domain-prefix, .rd-domain-suffix {
          font-size: 13px; font-weight: 600; color: #94a3b8;
          padding: 0 10px; white-space: nowrap; font-family: ui-monospace, monospace;
          flex-shrink: 0;
        }
        .rd-domain-suffix { color: #6366f1; }
        .rd-domain-input {
          flex: 1 !important; border: none !important; box-shadow: none !important;
          background: transparent !important; border-radius: 0 !important;
          height: 46px !important; font-size: 16px !important; font-weight: 700 !important;
          color: #0f172a !important; padding: 0 4px !important;
          font-family: ui-monospace, monospace !important;
          min-width: 0 !important;
        }
        .rd-domain-input:focus { outline: none !important; box-shadow: none !important; }

        /* Status banners */
        .rd-status {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 600;
        }
        .rd-status--checking { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        .rd-status--ok { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
        .rd-status--err { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

        /* Suggestions */
        .rd-suggestions { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
        .rd-suggestions-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .rd-suggestions-header span { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; }
        .rd-refresh { font-size: 11px; font-weight: 700; color: #6366f1; background: none; border: none; cursor: pointer; font-family: inherit; }
        .rd-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .rd-pill {
          padding: 6px 14px; border-radius: 8px;
          background: #fff; border: 1px solid #e2e8f0;
          font-size: 12px; font-weight: 600; color: #334155;
          cursor: pointer; font-family: ui-monospace, monospace;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .rd-pill:hover { background: #6366f1; border-color: #6366f1; color: #fff; }

        /* Agreement */
        .rd-agreement {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px; border-radius: 12px;
          border: 1.5px solid #e2e8f0; background: #fff;
          cursor: pointer; transition: border-color 0.15s, background 0.15s;
        }
        .rd-agreement--checked { border-color: #6366f1; background: #fafafe; }
        .rd-checkbox { width: 18px !important; height: 18px !important; flex-shrink: 0; margin-top: 2px; }
        .rd-agreement-label { display: flex; flex-direction: column; gap: 4px; cursor: pointer; }
        .rd-agreement-title { font-size: 14px; font-weight: 700; color: #0f172a; }
        .rd-agreement-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
        .rd-agreement-link { color: #6366f1; font-weight: 600; text-decoration: none; }
        .rd-agreement-link:hover { text-decoration: underline; }
      `}</style>
    </Form>
  );
};

const RegisterEntityDomain: React.FC<RegisterEntityDomainProps> = ({
  domain: initialDomain,
  setDomain,
  onSubmit,
  loading: submitLoading,
  logo,
  setLogo,
  logoPreview,
  setLogoPreview,
  setCurrent,
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
      <DomainFormContent
        logoPreview={logoPreview}
        setLogoPreview={setLogoPreview}
        setLogo={setLogo}
      />
    </Formik>
  );
};

export default React.memo(RegisterEntityDomain);

"use client";

import React from "react";
import { toast } from "sonner";
import {
  User,
  Building,
  Globe,
  Sparkles,
  MapPin,
  ShieldCheck,
  Check,
} from "lucide-react";

import RegisterEntityProfile from "./register-entity-profile";
import RegisterEntityEntity from "./register-entity-entity";
import RegisterEntityDomain from "./register-entity-domain";
import RegisterEntityWelcome from "./register-entity-welcome";
import RegisterEntityKyc from "./register-entity-kyc";
import RegisterEntityHeader from "./register-entity-header";

import {
  useKycCountries,
  useRegisterEntity,
} from "@/components/graphql/actions";

import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

import RegisterEntityLocation from "./register-entity-location";
import RegisterEntityFooter from "./register-entity-footer";
import RegisterEntityPreferences from "./register-entity-preferences";
import { withAuth, WithAuthProps } from "../hoc/with-auth";

interface StepConfig {
  id: number;
  title: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: StepConfig[] = [
  { id: 1, title: "Profile Info", short: "Profile", icon: User },
  { id: 2, title: "Preferences", short: "Prefs", icon: Globe },
  { id: 3, title: "Organization", short: "Org", icon: Building },
  { id: 4, title: "Location", short: "Location", icon: MapPin },
  { id: 5, title: "KYC", short: "KYC", icon: ShieldCheck },
  { id: 6, title: "Domain", short: "Domain", icon: Sparkles },
];

const RegisterEntityForm = ({ user }: WithAuthProps) => {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL
    : "https://dashboard.thrico.com/";

  const {
    current,
    setCurrent,
    profile,
    setProfile,
    organization,
    setOrganization,
    kyc,
    setKyc,
    domain,
    setDomain,
  } = useRegisterEntityFormStore();

  const { data: countries } = useKycCountries();

  const [register, { loading }] = useRegisterEntity({
    onCompleted(data: any) {
      const token = data?.registerEntity?.token;
      if (token) {
        window.location.href = `${DASHBOARD_URL}/auth/callback?code=${token}&choose-plan`;
        toast.success("Entity registered successfully!");
      }
    },
    onError(error: any) {
      toast.error(error.message || "Failed to register entity");
    },
  });

  const onSubmit = () => {
    const registrationInput = {
      address: organization.address,
      agreement: organization.agreement,
      country: profile.country,
      designation: profile.designation,
      domain: domain,
      entityType: organization.entityType,
      industryType: organization.industryType,
      language: profile.language || organization.language,
      name: organization.name,
      phone: profile.phone
        ? {
            countryCode: parseInt(profile.phone.code.replace("+", "")) || 0,
            areaCode: "",
            phoneNumber: profile.phone.phone,
            isoCode: profile.phone.isoCode,
          }
        : null,
      website: organization.website,
      kyc: {
        accountType: kyc.accountType,
        panCard: kyc.panCard,
        gstNumber: kyc.gstNumber || null,
        billingAddress: {
          addressLine1: kyc.billingAddressLine1,
          addressLine2: kyc.billingAddressLine2 || null,
          city: kyc.billingCity,
          state: kyc.billingState,
          pincode: kyc.billingPincode,
        },
      },
    };

    register({
      variables: {
        input: registrationInput,
      },
    });
  };

  const isWelcome = current === 0;
  const progressPct =
    current <= 0 ? 0 : Math.round((current / steps.length) * 100);

  return (
    <div className="re-root">
      {/* ── Animated Gradient Background ── */}
      <div className="re-bg-layer" aria-hidden="true">
        <div className="re-orb re-orb-1" />
        <div className="re-orb re-orb-2" />
        <div className="re-orb re-orb-3" />
        <div className="re-grid-overlay" />
      </div>

      <RegisterEntityHeader />

      <main className="re-main">
        {isWelcome ? (
          <RegisterEntityWelcome onStart={() => setCurrent(1)} />
        ) : (
          <div className="re-wizard">
            {/* ── Progress bar (mobile) ── */}
            <div className="re-mobile-progress" aria-hidden="true">
              <div
                className="re-mobile-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* ── Step Indicator ── */}
            <div
              className="re-steps"
              role="list"
              aria-label="Registration steps"
            >
              {steps.map((step, idx) => {
                const isCompleted = current > step.id;
                const isActive = current === step.id;
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div
                      role="listitem"
                      className={cn(
                        "re-step",
                        isActive && "re-step--active",
                        isCompleted && "re-step--done",
                      )}
                    >
                      <div className="re-step-dot">
                        {isCompleted ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Icon className="h-3 w-3" />
                        )}
                        {isActive && (
                          <span className="re-step-pulse" aria-hidden="true" />
                        )}
                      </div>
                      <span className="re-step-label">{step.short}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={cn(
                          "re-step-line",
                          isCompleted && "re-step-line--done",
                        )}
                      >
                        {isCompleted && <span className="re-step-line-fill" />}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ── Form Card ── */}
            <div className="re-card">
              <div className="re-card-body">
                <div key={current} className="re-step-content">
                  {current === 1 && (
                    <RegisterEntityProfile
                      data={user}
                      profile={profile}
                      setProfile={setProfile}
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 2 && (
                    <RegisterEntityPreferences
                      profile={profile}
                      setProfile={setProfile}
                      countries={countries?.getKycCountries}
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 3 && (
                    <RegisterEntityEntity
                      organization={organization}
                      setOrganization={setOrganization}
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 4 && (
                    <RegisterEntityLocation
                      organization={organization}
                      setOrganization={setOrganization}
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 5 && (
                    <RegisterEntityKyc
                      kyc={kyc}
                      setKyc={setKyc}
                      setCurrent={setCurrent}
                    />
                  )}
                  {current === 6 && (
                    <RegisterEntityDomain
                      domain={domain}
                      setDomain={setDomain}
                      setCurrent={setCurrent}
                      onSubmit={onSubmit}
                      loading={loading}
                    />
                  )}
                </div>
              </div>
              <RegisterEntityFooter loading={loading} />
            </div>

            {/* Step counter */}
            <p className="re-step-counter">
              Step {current} of {steps.length}
            </p>
          </div>
        )}
      </main>

      <style>{`
        /* ══════════════════════════════════════════
           ROOT & BACKGROUND
        ══════════════════════════════════════════ */
        .re-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f6fb;
          font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;
          color: #0f172a;
          position: relative;
          overflow: hidden;
        }

        /* Animated gradient orbs */
        .re-bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .re-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          animation: orb-drift 22s ease-in-out infinite alternate;
        }
        .re-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.12), transparent);
          top: -250px; left: -200px;
          animation-delay: 0s;
        }
        .re-orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(6,182,212,0.08), transparent);
          bottom: -150px; right: -150px;
          animation-delay: -8s;
        }
        .re-orb-3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.07), transparent);
          top: 40%; left: 55%;
          animation-delay: -14s;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, -25px) scale(1.06); }
          100% { transform: translate(-20px, 18px) scale(0.96); }
        }

        /* Faint dot grid */
        .re-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13,99,244,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ══════════════════════════════════════════
           MAIN CONTENT
        ══════════════════════════════════════════ */
        .re-main {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 28px 16px 56px;
          overflow-y: auto;
        }

        /* ══════════════════════════════════════════
           MOBILE PROGRESS BAR
        ══════════════════════════════════════════ */
        .re-mobile-progress {
          display: none;
          height: 2px;
          background: #e2e8f0;
          border-radius: 99px;
          overflow: hidden;
        }
        .re-mobile-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fd5531, #0d63f4);
          border-radius: 99px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (max-width: 600px) {
          .re-mobile-progress { display: block; }
        }

        /* ══════════════════════════════════════════
           WIZARD LAYOUT
        ══════════════════════════════════════════ */
        .re-wizard {
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: wizard-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes wizard-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ══════════════════════════════════════════
           STEP INDICATOR
        ══════════════════════════════════════════ */
        .re-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 4px;
        }
        .re-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          position: relative;
        }
        .re-step-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8eaf2;
          color: #94a3b8;
          border: 1.5px solid #dde1f0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }
        .re-step--active .re-step-dot {
          background: linear-gradient(135deg, #fd5531, #0d63f4);
    
          color: #fff;
          box-shadow: 0 0 0 4px rgba(253,85,49,0.15), 0 4px 16px rgba(13,99,244,0.22);
        }
        .re-step--done .re-step-dot {
          background: linear-gradient(135deg, #10b981, #059669);
    
          color: #fff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }

        /* Pulse ring on active step */
        .re-step-pulse {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.5px solid rgba(13,99,244,0.35);
          animation: step-pulse 2s ease-in-out infinite;
        }
        @keyframes step-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 0; transform: scale(1.5); }
        }

        .re-step-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #94a3b8;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .re-step--active .re-step-label {
          color: #0d63f4;
          font-weight: 800;
        }
        .re-step--done .re-step-label {
          color: #10b981;
        }

        /* Connector lines */
        .re-step-line {
          flex: 1;
          height: 1.5px;
          background: #dde1f0;
          margin: 0 4px;
          margin-bottom: 22px;
          min-width: 10px;
          position: relative;
          overflow: hidden;
        }
        .re-step-line-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #10b981, #059669);
          animation: line-fill 0.4s ease both;
        }
        @keyframes line-fill {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }

        /* ══════════════════════════════════════════
           FORM CARD — Glassmorphism
        ══════════════════════════════════════════ */
        .re-card {
          background: #ffffff;
          border: 1px solid rgba(13,99,244,0.09);
          border-radius: 20px;
          box-shadow:
            0 1px 3px rgba(0,0,0,0.04),
            0 12px 40px rgba(13,99,244,0.06),
            0 4px 12px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .re-card:hover {
          box-shadow:
            0 1px 3px rgba(0,0,0,0.04),
            0 16px 48px rgba(13,99,244,0.1),
            0 4px 12px rgba(0,0,0,0.05);
        }
        .re-card-body {
          padding: 36px 32px 24px;
        }
        @media (max-width: 480px) {
          .re-card-body { padding: 24px 20px 18px; }
        }

        /* ══════════════════════════════════════════
           STEP CONTENT TRANSITION
        ══════════════════════════════════════════ */
        .re-step-content {
          animation: step-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ══════════════════════════════════════════
           STEP COUNTER
        ══════════════════════════════════════════ */
        .re-step-counter {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.3px;
          margin: 0;
        }

        /* ══════════════════════════════════════════
           GLOBAL FORM FIELD TOKENS — light mode
        ══════════════════════════════════════════ */
        .re-card-body .rs-title {
          font-size: 21px !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          letter-spacing: -0.5px !important;
          margin: 0 0 6px !important;
        }
        .re-card-body .rs-sub {
          font-size: 13.5px !important;
          color: #64748b !important;
          margin: 0 !important;
        }
        .re-card-body .rs-header { margin-bottom: 28px !important; }
        .re-card-body .rs-label {
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.6px !important;
          text-transform: uppercase !important;
          color: #475569 !important;
        }
        .re-card-body .rs-input {
          height: 44px !important;
          border-radius: 12px !important;
          border: 1.5px solid #e2e8f0 !important;
          background: #fafbff !important;
          color: #0f172a !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s !important;
          font-family: inherit !important;
        }
        .re-card-body .rs-input:hover { border-color: rgba(13,99,244,0.3) !important; background: #fff !important; }
        .re-card-body .rs-input:focus {
          border-color: #0d63f4 !important;
          box-shadow: 0 0 0 3px rgba(13,99,244,0.12) !important;
          background: #fff !important;
          outline: none !important;
        }
        .re-card-body .rs-input--readonly { background: #f8fafc !important; color: #94a3b8 !important; cursor: not-allowed !important; border-color: #edf0f7 !important; }
        .re-card-body .rs-input--error { border-color: #fca5a5 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important; }
        .re-card-body .rs-icon { color: #94a3b8 !important; }
        .re-card-body .rs-select-trigger {
          height: 44px !important;
          border-radius: 12px !important;
          border: 1.5px solid #e2e8f0 !important;
          background: #fafbff !important;
          color: #0f172a !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          font-family: inherit !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }
        .re-card-body .rs-select-trigger:hover { border-color: rgba(13,99,244,0.3) !important; }
        .re-card-body .rs-select-trigger:focus { border-color: #0d63f4 !important; box-shadow: 0 0 0 3px rgba(13,99,244,0.12) !important; }
        .re-card-body .rs-placeholder { color: #94a3b8 !important; }
        .re-card-body .rs-error { font-size: 11.5px !important; color: #ef4444 !important; margin: 2px 0 0 !important; font-weight: 500 !important; }
        .re-card-body .rs-required { color: #ef4444 !important; }
        .re-card-body .rs-hint { color: #94a3b8 !important; font-size: 11px !important; }

        /* KYC overrides — light */
        .re-card-body .kyc-type-card { background: #fafbff !important; border-color: #e5eaf3 !important; color: #0f172a !important; }
        .re-card-body .kyc-type-card:hover { border-color: rgba(13,99,244,0.25) !important; background: #f0f5ff !important; }
        .re-card-body .kyc-type-card--selected { border-color: #0d63f4 !important; background: #f0f5ff !important; box-shadow: 0 0 0 3px rgba(13,99,244,0.1) !important; }
        .re-card-body .kyc-type-icon-wrap { background: #f1f5f9 !important; }
        .re-card-body .kyc-type-card--selected .kyc-type-icon-wrap { background: #dbeafe !important; }
        .re-card-body .kyc-type-name { color: #0f172a !important; }
        .re-card-body .kyc-type-desc { color: #64748b !important; }
        .re-card-body .kyc-type-tag { background: #f1f5f9 !important; color: #64748b !important; }
        .re-card-body .kyc-type-tag--selected { background: #dbeafe !important; color: #0d63f4 !important; }
        .re-card-body .kyc-section-label { color: #475569 !important; }
        .re-card-body .kyc-section-icon { color: #0d63f4 !important; }
        .re-card-body .kyc-title-icon { color: #0d63f4 !important; }
        .re-card-body h2.rs-title { color: #0f172a !important; }
      `}</style>
    </div>
  );
};

export default withAuth(RegisterEntityForm);

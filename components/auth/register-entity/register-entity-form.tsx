"use client";

import React from "react";
import { toast } from "sonner";
import { User, Building, Globe, Sparkles, MapPin, Check } from "lucide-react";

import RegisterEntityProfile from "./register-entity-profile";
import RegisterEntityEntity from "./register-entity-entity";
import RegisterEntityDomain from "./register-entity-domain";
import RegisterEntityWelcome from "./register-entity-welcome";
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
  { id: 5, title: "Domain", short: "Domain", icon: Sparkles },
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
    domain,
    setDomain,
    logo,
    setLogo,
    logoPreview,
    setLogoPreview,
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
      logo: logo,
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
    };

    register({
      variables: {
        input: registrationInput,
      },
    });
  };

  const isWelcome = current === 0;

  return (
    <div className="re-root">
      <RegisterEntityHeader />

      <main className="re-main">
        {isWelcome ? (
          <RegisterEntityWelcome onStart={() => setCurrent(1)} />
        ) : (
          <div className="re-wizard">
            {/* Step Indicator */}
            <div className="re-steps">
              {steps.map((step, idx) => {
                const isCompleted = current > step.id;
                const isActive = current === step.id;
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div
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
                      </div>
                      <span className="re-step-label">{step.short}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={cn(
                          "re-step-line",
                          isCompleted && "re-step-line--done",
                        )}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Form Card */}
            <div className="re-card bg-white">
              <div className="re-card-body bg-white">
                <div key={current} className="re-step-content ">
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
                    <RegisterEntityDomain
                      domain={domain}
                      setDomain={setDomain}
                      setCurrent={setCurrent}
                      onSubmit={onSubmit}
                      loading={loading}
                      logo={logo}
                      setLogo={setLogo}
                      logoPreview={logoPreview}
                      setLogoPreview={setLogoPreview}
                    />
                  )}
                </div>
              </div>
              <RegisterEntityFooter loading={loading} />
            </div>
          </div>
        )}
      </main>

      <style>{`
        /* ── Root ── */
        .re-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fafafa;
          font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
          color: #0f172a;
        }

        /* ── Main ── */
        .re-main {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 16px 48px;
          overflow-y: auto;
        }

        /* ── Wizard container ── */
        .re-wizard {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── Step indicator ── */
        .re-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 8px;
        }
        .re-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .re-step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e2e8f0;
          color: #94a3b8;
          border: 1.5px solid #e2e8f0;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .re-step--active .re-step-dot {
          background: #0f172a;
          border-color: #0f172a;
          color: #fff;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.12);
        }
        .re-step--done .re-step-dot {
          background: #10b981;
          border-color: #10b981;
          color: #fff;
        }
        .re-step-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: #94a3b8;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .re-step--active .re-step-label {
          color: #0f172a;
          font-weight: 700;
        }
        .re-step--done .re-step-label {
          color: #10b981;
        }
        .re-step-line {
          flex: 1;
          height: 1.5px;
          background: #e2e8f0;
          margin: 0 4px;
          margin-bottom: 20px;
          transition: background 0.3s;
          min-width: 12px;
        }
        .re-step-line--done {
          background: #10b981;
        }

        /* ── Card ── */
        .re-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .re-card-body {
          padding: 36px 32px 28px;
        }
        @media (max-width: 480px) {
          .re-card-body { padding: 28px 20px 20px; }
        }

        /* ── Step content transition (CSS only, fast) ── */
        .re-step-content {
          animation: step-in 0.22s ease both;
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default withAuth(RegisterEntityForm);

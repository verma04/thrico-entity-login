"use client";

import React from "react";
import { toast } from "sonner";
import AuthLayout from "../layout/auth-layout";

import RegisterEntityProfile from "./register-entity-profile";
import RegisterEntityEntity from "./register-entity-entity";
import RegisterEntityDomain from "./register-entity-domain";
import RegisterEntityKyc from "./register-entity-kyc";
import RegisterEntityLocation from "./register-entity-location";
import RegisterEntityPreferences from "./register-entity-preferences";
import RegisterEntityFooter from "./register-entity-footer";

import {
  useKycCountries,
  useRegisterEntity,
} from "@/components/graphql/actions";

import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";
import { withAuth, WithAuthProps } from "../hoc/with-auth";

const stepMeta = [
  { id: 1, title: "Profile details", description: "Your contact and role information" },
  { id: 2, title: "Regional settings", description: "Select your country and language" },
  { id: 3, title: "Organization details", description: "Tell us about your organization" },
  { id: 4, title: "Location & website", description: "Establish your official presence" },
  { id: 5, title: "KYC verification", description: "Compliance and billing details" },
  { id: 6, title: "Choose subdomain", description: "Set up your unique community URL" },
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

  const activeStep = current > 0 && current <= 6 ? current : 1;
  const currentStepInfo = stepMeta[activeStep - 1] || stepMeta[0];
  const progressPct = Math.round((activeStep / 6) * 100);

  return (
    <AuthLayout cardClassName="!max-w-[500px] !p-7 sm:!p-8">
      <div className="w-full">
        {/* Step progress & header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
              Step {activeStep} of 6
            </span>
            <span className="text-[12px] font-semibold text-gray-400">
              {progressPct}%
            </span>
          </div>

          {/* Slim progress track */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3.5">
            <div
              className="h-full bg-[#1a1a1a] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <h1 className="text-[23px] sm:text-[25px] font-bold tracking-tight text-gray-900 leading-tight">
            {currentStepInfo.title}
          </h1>
          <p className="text-[13.5px] text-gray-500 font-normal mt-0.5">
            {currentStepInfo.description}
          </p>
        </div>

        {/* Step Form Content */}
        <div className="pt-1">
          {activeStep === 1 && (
            <RegisterEntityProfile
              data={user}
              profile={profile}
              setProfile={setProfile}
              setCurrent={setCurrent}
            />
          )}

          {activeStep === 2 && (
            <RegisterEntityPreferences
              profile={profile}
              setProfile={setProfile}
              countries={countries?.getKycCountries}
              setCurrent={setCurrent}
            />
          )}

          {activeStep === 3 && (
            <RegisterEntityEntity
              organization={organization}
              setOrganization={setOrganization}
              setCurrent={setCurrent}
            />
          )}

          {activeStep === 4 && (
            <RegisterEntityLocation
              organization={organization}
              setOrganization={setOrganization}
              setCurrent={setCurrent}
            />
          )}

          {activeStep === 5 && (
            <RegisterEntityKyc
              kyc={kyc}
              setKyc={setKyc}
              setCurrent={setCurrent}
            />
          )}

          {activeStep === 6 && (
            <RegisterEntityDomain
              domain={domain}
              setDomain={setDomain}
              setCurrent={setCurrent}
              onSubmit={onSubmit}
              loading={loading}
            />
          )}
        </div>

        {/* Action Footer */}
        <RegisterEntityFooter loading={loading} />
      </div>
    </AuthLayout>
  );
};

export default withAuth(RegisterEntityForm);

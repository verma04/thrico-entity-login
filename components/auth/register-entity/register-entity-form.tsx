"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { User, Building, Globe, Sparkles } from "lucide-react";

import RegisterEntityProfile from "./register-entity-profile";
import RegisterEntityEntity from "./register-entity-entity";
import RegisterEntityDomain from "./register-entity-domain";
import RegisterEntityWelcome from "./register-entity-welcome";
import RegisterEntityPreview from "./preview/register-entity-preview";
import RegisterEntityHeader from "./register-entity-header";

import {
  useGetEntity,
  useKycCountries,
  useRegisterEntity,
} from "@/components/graphql/actions";

import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterEntityFormData {
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: StepConfig[] = [
  {
    id: 0,
    title: "Welcome",
    description: "Let's build your community together",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: 1,
    title: "Profile Info",
    description: "Your personal professional details",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Preferences",
    description: "Your regional and language settings",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Basic Info",
    description: "Your organization's basic details",
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Location",
    description: "Where your community lives",
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "Domain",
    description: "Set-up your unique identity",
    icon: <Globe className="h-5 w-5" />,
  },
];

import RegisterEntityLocation from "./register-entity-location";

import RegisterEntityFooter from "./register-entity-footer";

import RegisterEntityPreferences from "./register-entity-preferences";

import { withAuth, WithAuthProps } from "../hoc/with-auth";

const RegisterEntityForm = ({ user }: WithAuthProps) => {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? process.env.NEXT_PUBLIC_DASHBOARD_URL
    : "https://dashboard.thrico.com/";
  const router = useRouter();
  const { refetch } = useGetEntity();

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
            areaCode: "", // Assuming no separate area code for now
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

  const actualSteps = steps.length - 1;
  const currentStepIndex = current >= 0 ? current : 0;
  const progress = current === -1 ? 0 : (currentStepIndex / actualSteps) * 100;

  return (
    <div className="h-screen w-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-[#ff5733]/20 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#0866ff]/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#ff5733]/15 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <RegisterEntityHeader />

        <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <div
            className={cn(
              "flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-7xl h-full transition-all duration-700 ease-in-out",
              current === 0 ? "max-w-4xl" : "w-full",
            )}
          >
            {/* Step Content Area */}
            <div
              className={cn(
                "transition-all duration-700 ease-in-out flex flex-col justify-center",
                current === 0 ? "w-full" : "w-full lg:w-[55%] xl:w-[60%]",
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="flex flex-col justify-center h-full"
                >
                  {current === 0 ? (
                    <RegisterEntityWelcome onStart={() => setCurrent(1)} />
                  ) : (
                    <Card className="rounded-[2.5rem] border-0 shadow-[2xl] overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 relative group flex flex-col min-h-0 h-fit max-h-full">
                      {/* Top Gradient Border */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#0866ff] to-[#b833ff] z-60" />

                      {/* Interactive Gradient Glow */}
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                        {/* Centered Logo in Card */}
                        <div className="flex justify-center mb-8 lg:hidden">
                          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-sm ring-1 ring-slate-200 dark:ring-white/10">
                            <Image
                              src="/thrico-logo.svg"
                              alt="Thrico"
                              width={80}
                              height={22}
                              className="h-auto w-auto max-h-5 object-contain"
                            />
                          </div>
                        </div>
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

                      {/* Sticky Footer within Card */}
                      <RegisterEntityFooter loading={loading} />
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Preview - Only visible after welcome */}
            {current !== 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-center"
              >
                <div className="relative h-full max-h-[85vh]">
                  <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50" />
                  <RegisterEntityPreview />
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(RegisterEntityForm);

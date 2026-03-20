"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, User, Building, Globe, Sparkles } from "lucide-react";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";
import { LightRays } from "@/components/ui/light-rays";
import ThricoLogo from "../logo";

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

const RegisterEntityHeader = () => {
  const { current } = useRegisterEntityFormStore();

  const actualSteps = steps.length - 1;
  const currentStepIndex = current >= 0 ? current : 0;
  const progress = current === -1 ? 0 : (currentStepIndex / actualSteps) * 100;

  return (
    <>
      <LightRays />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-2.5 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] ring-1 ring-slate-200 dark:ring-white/10 group-hover:shadow-lg group-hover:ring-primary/30 transition-all duration-500">
                <ThricoLogo />
              </div>
              <div className="h-8 w-px bg-linear-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  Corporate
                  <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                    Onboarding
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Progress Section */}
            {current > 0 && (
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Current Phase
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                      {steps[current]?.title}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="gap-2 font-bold tracking-tight py-2 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/10"
                  >
                    <span className="text-primary">
                      {Math.round(progress)}%
                    </span>
                    <div className="w-px h-3 bg-primary/20" />
                    <span className="text-slate-500 dark:text-slate-400">
                      Step {current}/{actualSteps}
                    </span>
                  </Badge>
                </div>

                {/* Visual Progress Steps */}
                <div className="flex gap-2 items-center">
                  {steps.slice(1).map((step, idx) => {
                    const stepIdx = idx + 1;
                    const isActive = current === stepIdx;
                    const isCompleted = current > stepIdx;

                    return (
                      <React.Fragment key={step.id}>
                        <div
                          className={cn(
                            "relative h-1.5 rounded-full transition-all duration-700 ease-in-out",
                            isActive
                              ? "w-8 bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)]"
                              : isCompleted
                                ? "w-4 bg-primary/60"
                                : "w-4 bg-slate-200 dark:bg-slate-800",
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-pill"
                              className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/40 to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          )}
                        </div>
                        {idx < actualSteps - 1 && (
                          <div
                            className={cn(
                              "w-1 h-1 rounded-full",
                              isCompleted
                                ? "bg-primary/30"
                                : "bg-slate-200 dark:bg-slate-800",
                            )}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default RegisterEntityHeader;

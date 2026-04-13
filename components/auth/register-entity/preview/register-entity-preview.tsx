"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Building2,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

const RegisterEntityPreview = () => {
  const { profile, organization, domain, logoPreview, current } =
    useRegisterEntityFormStore();

  const isProfileComplete = profile.designation && profile.phone;
  const isEntityComplete = organization.name && organization.website;

  return (
    <div className="h-full w-full max-w-[500px] ml-auto">
      <div className="relative group perspective-[1000px] h-full">
        {/* Subliminal Brand Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        <div className="relative h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[2.8rem] border border-white/20 dark:border-white/5 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ring-1 ring-slate-200/50 dark:ring-slate-800/50">
          
          {/* Virtual Identity Header */}
          <div className="relative h-56 bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-8 border-b border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            {/* Mesh Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e5_1px,transparent_1px)] bg-size-[24px_24px]" />
            </div>
            
            <AnimatePresence mode="wait">
              {logoPreview ? (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                  className="relative z-10 w-28 h-28 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-4 border border-slate-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                >
                  <img
                    src={logoPreview}
                    alt="Preview Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-3 -right-3 bg-primary text-white rounded-2xl p-2 shadow-xl border-4 border-white dark:border-slate-900"
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="w-28 h-28 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700"
                >
                  <Building2 className="h-10 w-10 text-slate-400 opacity-50" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center z-10">
              <h3 className="font-black text-2xl tracking-tight text-slate-900 dark:text-white truncate max-w-[320px]">
                {organization.name || "Unnamed Entity"}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-primary/80">
                  {domain ? `${domain}.thrico.network` : "Build Thriving Communities"}
                </span>
              </div>
            </div>
          </div>

          {/* Blueprint Content */}
          <div className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
            {/* Subsection: Configuration */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-100 dark:bg-slate-800"><Layers className="h-3 w-3 text-slate-400" /></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Setup</span>
                </div>
                {isEntityComplete && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0 text-[10px] font-black px-2 py-0.5">VERIFIED</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Entity Type</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white truncate capitalize">
                    {organization.entityType || "--"}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Industry</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {organization.industryType || "--"}
                  </p>
                </div>
              </div>
            </section>

            {/* Subsection: Leadership */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-100 dark:bg-slate-800"><User className="h-3 w-3 text-slate-400" /></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Role</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 flex items-center gap-5 group/profile">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
                    {profile.designation || "Administrator"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    {profile.phone ? `${profile.phone.code} ${profile.phone.phone}` : "Role"}
                  </p>
                </div>
              </div>
            </section>

            {/* Verification Visualizer */}
            <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">System Readiness</span>
                </div>
                <span className="text-[10px] font-black text-primary italic">PHASE {current + 1} OF 4</span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden p-0.5 ring-1 ring-slate-200 dark:ring-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((current + 1) / 4) * 100}%` }}
                  className="h-full bg-linear-to-r from-primary to-blue-500 rounded-full shadow-[0_0_8px_rgba(var(--primary),0.3)]"
                  transition={{ duration: 1, ease: "circOut" }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Floating Rank Badge */}
        <motion.div 
          initial={{ rotate: 15, scale: 0 }}
          animate={{ rotate: 12, scale: 1 }}
          whileHover={{ rotate: 0, scale: 1.1 }}
          className="absolute -top-5 -right-5 h-14 w-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-100 dark:border-slate-700 z-20 cursor-help"
        >
          <div className="text-center">
            <p className="text-xs font-black text-primary uppercase">Preview</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterEntityPreview;

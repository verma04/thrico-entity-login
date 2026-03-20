"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users, ShoppingCart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterEntityWelcomeProps {
  onStart: () => void;
}

const RegisterEntityWelcome = ({ onStart }: RegisterEntityWelcomeProps) => {
  const features = [
    {
      icon: <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500"><FileText className="h-6 w-6" /></div>,
      title: "Intelligent Content",
      description: "Harness AI to power your community's knowledge base and storytelling.",
    },
    {
      icon: <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500"><Users className="h-6 w-6" /></div>,
      title: "Global Community",
      description: "Scale your reach with localized experiences and deep member engagement.",
    },
    {
      icon: <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500"><ShoppingCart className="h-6 w-6" /></div>,
      title: "Ecosystem Commerce",
      description: "Create value through integrated marketplaces and member-to-member trade.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="max-w-3xl mx-auto w-full text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6"
        >
          <Sparkles className="h-3 w-3" />
          The future of organizations
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8 bg-linear-to-b from-slate-900 via-slate-900 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent"
        >
          Build your entity <br />
          <span className="text-primary italic">for the new age.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Everything you need to launch, manage, and scale your organization in a decentralized world. 
          Professional tools for visionary leaders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            onClick={onStart} 
            className="h-16 px-10 rounded-[2rem] text-lg font-bold group shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500"
          >
            Start Registration
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="h-16 px-10 rounded-[2rem] text-lg font-bold hover:bg-white/50 dark:hover:bg-white/10"
          >
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
            className="group relative p-8 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/5 hover:border-primary/30 transition-all duration-500"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegisterEntityWelcome;

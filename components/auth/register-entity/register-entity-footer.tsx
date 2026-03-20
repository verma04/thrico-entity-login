"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface RegisterEntityFooterProps {
  onSubmit?: () => void | Promise<void>;
  loading?: boolean;
  submitText?: string;
  submitIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const RegisterEntityFooter: React.FC<RegisterEntityFooterProps> = ({
  onSubmit,
  loading,
  submitText = "Continue",
  submitIcon = <ChevronRight className="h-4 w-4" />,
  disabled = false,
  className,
}) => {
  const { 
    current, 
    setCurrent, 
    stepValidity, 
    submitHandlers 
  } = useRegisterEntityFormStore();
  
  const handleBack = () => {
    if (current > 1) {
      setCurrent(current - 1);
    } else {
      setCurrent(0);
    }
  };

  const handleNext = () => {
    if (onSubmit) {
      onSubmit();
    } else if (submitHandlers[current]) {
      submitHandlers[current]();
    } else {
      setCurrent(current + 1);
    }
  };

  const isFormValid = stepValidity[current] ?? true;
  const isLastStep = current === 5;

  return (
    <div
      className={cn(
        "flex items-center justify-between py-6 px-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={loading}
          className="h-12 px-6 rounded-2xl gap-2 group text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-bold"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Previous
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          size="lg"
          onClick={handleNext}
          disabled={disabled || loading || !isFormValid}
          className={cn(
            "h-14 min-w-[180px] px-8 rounded-2xl gap-3 font-black uppercase tracking-widest transition-all duration-500 shadow-2xl ",
            isFormValid
              ? "bg-primary shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-white"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 grayscale cursor-not-allowed shadow-none"
          )}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {isLastStep ? "Complete Setup" : submitText}
              <div className="bg-white/20 p-1 rounded-md transition-transform group-hover:translate-x-1">
                {submitIcon}
              </div>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(RegisterEntityFooter);

"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface RegisterEntityFooterProps {
  onSubmit?: () => void | Promise<void>;
  loading?: boolean;
  submitText?: string;
  disabled?: boolean;
  className?: string;
}

const RegisterEntityFooter: React.FC<RegisterEntityFooterProps> = ({
  onSubmit,
  loading,
  submitText,
  disabled = false,
  className,
}) => {
  const router = useRouter();
  const {
    current,
    setCurrent,
    stepValidity,
    submitHandlers,
  } = useRegisterEntityFormStore();

  const handleBack = () => {
    if (current > 1) {
      setCurrent(current - 1);
    } else {
      router.push("/my-accounts");
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
  const isLastStep = current === 6;
  const label = submitText ?? (isLastStep ? "Create organization" : "Continue");

  return (
    <div className={cn("flex items-center justify-between pt-5 border-t border-gray-100 mt-5", className)}>
      <button
        type="button"
        onClick={handleBack}
        disabled={!!loading}
        className="h-10 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-[13.5px] font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        id="step-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        {current === 1 ? "Cancel" : "Back"}
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={disabled || !!loading || !isFormValid}
        className="h-10 px-5 bg-[#1a1a1a] hover:bg-[#303030] active:bg-[#000000] disabled:bg-gray-300 disabled:text-gray-500 text-white font-medium text-[13.5px] rounded-md transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
        id="step-next-btn"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            {!isLastStep && <ArrowRight className="h-4 w-4" />}
          </>
        )}
      </button>
    </div>
  );
};

export default React.memo(RegisterEntityFooter);

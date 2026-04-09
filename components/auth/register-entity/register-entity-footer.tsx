"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
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
  const {
    current,
    setCurrent,
    stepValidity,
    submitHandlers,
  } = useRegisterEntityFormStore();

  const handleBack = () => {
    if (current > 1) setCurrent(current - 1);
    else setCurrent(0);
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
  const label = submitText ?? (isLastStep ? "Complete Setup" : "Continue");

  return (
    <div className={cn("re-footer", className)}>
      <button
        type="button"
        onClick={handleBack}
        disabled={!!loading}
        className="re-footer-back"
        id="step-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={disabled || !!loading || !isFormValid}
        className={cn(
          "re-footer-next",
          (!isFormValid || disabled) && "re-footer-next--disabled"
        )}
        id="step-next-btn"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {label}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <style>{`
        .re-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 20px;
          border-top: 1px solid #f1f5f9;
          background: #fafafa;
        }
        .re-footer-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 40px;
          padding: 0 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          background: transparent;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          font-family: inherit;
        }
        .re-footer-back:hover {
          background: #f8fafc;
          color: #0f172a;
          border-color: #cbd5e1;
        }
        .re-footer-back:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .re-footer-next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          padding: 0 22px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          background: #0f172a;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.12s, opacity 0.15s;
          font-family: inherit;
        }
        .re-footer-next:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-1px);
        }
        .re-footer-next:active:not(:disabled) {
          transform: scale(0.98);
        }
        .re-footer-next--disabled,
        .re-footer-next:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        @media (max-width: 480px) {
          .re-footer { padding: 14px 20px 16px; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(RegisterEntityFooter);

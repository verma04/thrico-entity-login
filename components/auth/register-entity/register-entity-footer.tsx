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
  const isLastStep = current === 6;
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
        <ArrowLeft className="h-3.5 w-3.5" />
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
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>

      <style>{`
        .re-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px 18px;
          border-top: 1px solid #f1f5f9;
          background: #fafbff;
        }
        .re-footer-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 38px;
          padding: 0 16px;
          border-radius: 10px;
          font-size: 13.5px;
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
          border-color: #c7d2fe;
        }
        .re-footer-back:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .re-footer-next {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 38px;
          padding: 0 22px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #fd5531, #0d63f4);
          border: none;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          font-family: inherit;
          box-shadow: 0 4px 16px rgba(253,85,49,0.25);
          position: relative;
          overflow: hidden;
        }
        .re-footer-next::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .re-footer-next:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(99,102,241,0.45);
        }
        .re-footer-next:hover:not(:disabled)::after { opacity: 1; }
        .re-footer-next:active:not(:disabled) {
          transform: scale(0.97);
        }
        .re-footer-next--disabled,
        .re-footer-next:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        @media (max-width: 480px) {
          .re-footer { padding: 12px 18px 16px; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(RegisterEntityFooter);

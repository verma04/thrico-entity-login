"use client";

import React from "react";
import { Toaster } from "sonner";
import ThricoLogo from "../logo";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

const RegisterEntityHeader = () => {
  const { current } = useRegisterEntityFormStore();

  const TOTAL_STEPS = 5; // steps 1–5
  const progress = current <= 0 ? 0 : Math.round((current / TOTAL_STEPS) * 100);

  return (
    <>
      <Toaster position="top-center" richColors />
      <header className="re-header">
        <div className="re-header-inner">
          <div className="re-header-brand">
            <ThricoLogo />
            <span className="re-header-divider" />
            <span className="re-header-title">Entity Setup</span>
          </div>

          {current > 0 && (
            <div className="re-header-right">
              <div className="re-progress-bar">
                <div
                  className="re-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="re-progress-label">{progress}%</span>
            </div>
          )}
        </div>
      </header>

      <style>{`
        .re-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(250,250,250,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e2e8f0;
        }
        .re-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .re-header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .re-header-divider {
          width: 1px;
          height: 20px;
          background: #e2e8f0;
          display: block;
        }
        .re-header-title {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          letter-spacing: -0.1px;
        }
        .re-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .re-progress-bar {
          width: 120px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 99px;
          overflow: hidden;
        }
        .re-progress-fill {
          height: 100%;
          background: #0f172a;
          border-radius: 99px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .re-progress-label {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          min-width: 34px;
          text-align: right;
        }
        @media (max-width: 480px) {
          .re-progress-bar { width: 80px; }
          .re-header-title { display: none; }
          .re-header-divider { display: none; }
        }
      `}</style>
    </>
  );
};

export default RegisterEntityHeader;

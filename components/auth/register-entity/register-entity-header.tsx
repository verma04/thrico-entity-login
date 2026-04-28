"use client";

import React from "react";
import { Toaster } from "sonner";
import ThricoLogo from "../logo";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

const RegisterEntityHeader = () => {
  const { current } = useRegisterEntityFormStore();

  const TOTAL_STEPS = 6;
  const progress = current <= 0 ? 0 : Math.round((current / TOTAL_STEPS) * 100);

  return (
    <>
      <Toaster position="top-center" richColors />
      <header className="re-header">
        <div className="re-header-inner">
          <div className="re-header-brand">
            <ThricoLogo />
            <span className="re-header-divider" />
            <span className="re-header-badge">Entity Setup</span>
          </div>

          {current > 0 && (
            <div className="re-header-right">
              <div className="re-progress-track">
                <div
                  className="re-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="re-progress-glow"
                  style={{ left: `${Math.max(progress - 4, 0)}%` }}
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
        
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border-bottom: 1px solid rgba(13,99,244,0.09);
          box-shadow: 0 1px 0 rgba(253,85,49,0.06);
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
          height: 18px;
          background: #e2e8f0;
          display: block;
        }
        .re-header-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #0d63f4;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(13,99,244,0.07);
          border: 1px solid rgba(13,99,244,0.15);
        }
        .re-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .re-progress-track {
          width: 120px;
          height: 3px;
          background: #e2e8f0;
          border-radius: 99px;
          overflow: visible;
          position: relative;
        }
        .re-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fd5531, #0d63f4);
          border-radius: 99px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .re-progress-fill::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35));
          animation: shimmer 2s ease infinite;
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .re-progress-glow {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #fd5531;
          border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(253,85,49,0.5);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .re-progress-label {
          font-size: 11px;
          font-weight: 800;
          color: #6366f1;
          min-width: 32px;
          text-align: right;
          letter-spacing: -0.2px;
        }
        @media (max-width: 480px) {
          .re-progress-track { width: 80px; }
          .re-header-badge { display: none; }
          .re-header-divider { display: none; }
        }
      `}</style>
    </>
  );
};

export default RegisterEntityHeader;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Zap } from "lucide-react";

interface RegisterEntityWelcomeProps {
  onStart: () => void;
}

const features = [
  {
    icon: Users,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    title: "Community-first",
    desc: "Engage, grow, and retain your members with powerful community tools.",
  },
  {
    icon: Globe,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    title: "Global reach",
    desc: "Localised experiences with 180+ country support and multi-language.",
  },
  {
    icon: Zap,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    title: "Everything built-in",
    desc: "Events, forums, marketplace, analytics — one platform, zero plugins.",
  },
];

const RegisterEntityWelcome = ({ onStart }: RegisterEntityWelcomeProps) => {
  return (
    <div className="rw-root">
      <div className="rw-card">
        {/* Eyebrow */}
        <p className="rw-eyebrow">Entity Registration</p>

        {/* Headline */}
        <h1 className="rw-headline">
          Your community platform,
          <br />
          <span className="rw-accent">set up in minutes.</span>
        </h1>

        {/* Sub */}
        <p className="rw-sub">
          A short onboarding to configure your workspace. It takes under 3 minutes.
        </p>

        {/* CTA */}
        <Button
          id="start-registration-btn"
          size="lg"
          onClick={onStart}
          className="rw-btn"
        >
          Get started
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>

        {/* Divider */}
        <div className="rw-divider" />

        {/* Features */}
        <div className="rw-features">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rw-feature">
                <div
                  className="rw-feature-icon"
                  style={{ background: f.bg, color: f.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="rw-feature-title">{f.title}</p>
                  <p className="rw-feature-desc">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .rw-root {
          width: 100%;
          padding: 40px 16px 0;
          display: flex;
          justify-content: center;
        }
        .rw-card {
          width: 100%;
          max-width: 500px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 44px 40px 40px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
          animation: step-in 0.3s ease both;
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rw-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #6366f1;
          margin: 0 0 14px;
        }
        .rw-headline {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.8px;
          color: #0f172a;
          margin: 0 0 16px;
        }
        .rw-accent {
          color: #6366f1;
        }
        .rw-sub {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 28px;
        }
        .rw-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          background: #0f172a;
          color: #fff;
          display: inline-flex;
          align-items: center;
          transition: background 0.15s, transform 0.12s;
        }
        .rw-btn:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }
        .rw-btn:active { transform: scale(0.98); }
        .rw-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 32px 0;
        }
        .rw-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .rw-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .rw-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .rw-feature-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 3px;
        }
        .rw-feature-desc {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        @media (max-width: 480px) {
          .rw-card { padding: 32px 24px 28px; }
        }
      `}</style>
    </div>
  );
};

export default RegisterEntityWelcome;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Zap, Shield, Check } from "lucide-react";

interface RegisterEntityWelcomeProps {
  onStart: () => void;
}

const features = [
  {
    icon: Users,
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glow: "rgba(99,102,241,0.25)",
    title: "Community-Led Growth",
    desc: "Gamify your content, community & commerce to drive engagement",
  },
  {
    icon: Globe,
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6,182,212,0.25)",
    title: "Global Reach",
    desc: "Build a data-driven, community-led brand at scale",
  },
  {
    icon: Zap,
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    glow: "rgba(245,158,11,0.25)",
    title: "Instant Insights",
    desc: "Real-time analytics to power smarter business decisions",
  },
];

const trustBadges = ["SOC 2 Compliant", "GDPR Ready", "99.9% Uptime"];

const RegisterEntityWelcome = ({ onStart }: RegisterEntityWelcomeProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rw-root">
      <div className={`rw-card ${mounted ? "rw-card--visible" : ""}`}>
        {/* Top glow accent */}
        <div className="rw-card-glow" aria-hidden="true" />

        {/* Eyebrow */}
        <div className="rw-eyebrow-wrap">
          <span className="rw-dot" />
          <p className="rw-eyebrow">Modern Community Operating System</p>
        </div>

        {/* Headline */}
        <h1 className="rw-headline">
          Build <span className="rw-headline-accent">Thriving</span>
          <br />
          Communities
        </h1>

        {/* Sub */}
        <p className="rw-sub">
          The most comprehensive platform to create, run, and manage your social
          media community universe — all in one place.
        </p>

        {/* CTA */}
        <div className="rw-cta-row">
          <button
            id="start-registration-btn"
            onClick={onStart}
            className="rw-btn-primary"
          >
            <span>Start Registration</span>
            <ArrowRight className="h-4 w-4" style={{ flexShrink: 0 }} />
          </button>
          <a
            href="https://thrico.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rw-btn-ghost"
          >
            Learn More
          </a>
        </div>

        {/* Trust badges */}
        <div className="rw-trust">
          {trustBadges.map((b) => (
            <span key={b} className="rw-trust-badge">
              <Check className="h-2.5 w-2.5" style={{ strokeWidth: 3 }} />
              {b}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="rw-divider">
          <span className="rw-divider-text">What you get</span>
        </div>

        {/* Features */}
        <div className="rw-features">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rw-feature"
                style={{ animationDelay: mounted ? `${i * 80}ms` : "0ms" }}
              >
                <div
                  className="rw-feature-icon"
                  style={{
                    background: f.gradient,
                    boxShadow: `0 4px 16px ${f.glow}`,
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: "#fff" }} />
                </div>
                <div className="rw-feature-text">
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
          padding: 32px 16px 0;
          display: flex;
          justify-content: center;
        }

        /* Card */
        .rw-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 24px;
          padding: 44px 40px 40px;
          box-shadow:
            0 1px 3px rgba(0,0,0,0.04),
            0 16px 48px rgba(99,102,241,0.08),
            0 4px 12px rgba(0,0,0,0.04);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rw-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Top glow */
        .rw-card-glow {
          position: absolute;
          top: -80px; left: 50%; transform: translateX(-50%);
          width: 280px; height: 160px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Eyebrow */
        .rw-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .rw-dot {
          width: 6px; height: 6px;
        
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(253,85,49,0.8);
          flex-shrink: 0;
          animation: dot-pulse 2.5s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(253,85,49,0.7); }
          50%       { box-shadow: 0 0 16px rgba(253,85,49,1); }
        }
        .rw-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #0d63f4;
          margin: 0;
        }

        /* Headline */
        .rw-headline {
          font-size: clamp(28px, 4.5vw, 38px);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1px;
          color: #0f172a;
          margin: 0 0 16px;
        }
        .rw-headline-accent {
          background: linear-gradient(135deg, #fd5531 0%, #c4390f 40%, #0d63f4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Sub */
        .rw-sub {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 0 0 28px;
        }

        /* CTA row */
        .rw-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .rw-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 26px;
          border-radius: 14px;
          font-size: 14.5px;
          font-weight: 700;
          background: linear-gradient(135deg, #fd5531, #0d63f4);
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: inherit;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 20px rgba(253,85,49,0.3);
        }
        .rw-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.12));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .rw-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(13,99,244,0.35); }
        .rw-btn-primary:hover::before { opacity: 1; }
        .rw-btn-primary:active { transform: scale(0.97); }

        .rw-btn-ghost {
          font-size: 13.5px;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          transition: color 0.15s;
          font-family: inherit;
        }
        .rw-btn-ghost:hover { color: #0f172a; }

        /* Trust badges */
        .rw-trust {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .rw-trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #059669;
          padding: 3px 10px;
          border-radius: 99px;
          background: rgba(16,185,129,0.07);
          border: 1px solid rgba(16,185,129,0.16);
        }

        /* Divider */
        .rw-divider {
          position: relative;
          text-align: center;
          margin: 0 0 24px;
        }
        .rw-divider::before {
          content: '';
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .rw-divider-text {
          position: relative;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
          background: #ffffff;
          padding: 0 12px;
        }

        /* Features */
        .rw-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .rw-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          animation: feature-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes feature-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .rw-feature:hover {
          background: #f0f5ff;
          border-color: rgba(13,99,244,0.2);
          transform: translateX(4px);
        }
        .rw-feature-icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rw-feature-text { flex: 1; }
        .rw-feature-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 3px;
        }
        .rw-feature-desc {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 480px) {
          .rw-card { padding: 32px 24px 28px; }
          .rw-trust { gap: 6px; }
        }
      `}</style>
    </div>
  );
};

export default RegisterEntityWelcome;

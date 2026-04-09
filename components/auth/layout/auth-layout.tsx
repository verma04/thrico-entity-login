"use client";
import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";
import {
  Users,
  Globe,
  BarChart3,
  Smartphone,
  Zap,
  Shield,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import ThricoLogo from "../logo";

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE BENTO CARDS — left panel
───────────────────────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Users,
    label: "Community",
    desc: "Engage & grow your members",
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
  },
  {
    icon: Globe,
    label: "Website Builder",
    desc: "Launch pages without code",
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    desc: "Real-time data insights",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
  },
  {
    icon: Smartphone,
    label: "Mobile & Domain",
    desc: "White-label app & site",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: Zap,
    label: "Automations",
    desc: "Workflows on autopilot",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: Shield,
    label: "Security",
    desc: "Enterprise-grade protection",
    accent: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
  },
];

const modules = [
  { label: "Feed", color: "#6366f1" },
  { label: "Stories", color: "#8b5cf6" },
  { label: "Events", color: "#06b6d4" },
  { label: "Forums", color: "#10b981" },
  { label: "Chat", color: "#f59e0b" },
  { label: "Shop", color: "#ec4899" },
  { label: "Jobs", color: "#14b8a6" },
  { label: "Badges", color: "#f97316" },
  { label: "Newsletter", color: "#6366f1" },
  { label: "Surveys", color: "#8b5cf6" },
  { label: "Mentorship", color: "#06b6d4" },
  { label: "Marketplace", color: "#10b981" },
  { label: "Offers", color: "#f59e0b" },
  { label: "Leaderboard", color: "#ec4899" },
  { label: "Nearby", color: "#14b8a6" },
  { label: "Network", color: "#f97316" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN LAYOUT
───────────────────────────────────────────────────────────────────────────── */
const AuthLayout = ({ children }: React.PropsWithChildren) => (
  <div className="auth-root">
    <Toaster position="top-center" richColors />

    {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
    <aside className="auth-left">
      {/* Deep dark background */}
      <div className="auth-left-bg" />

      {/* Ambient gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Dot-grid noise overlay */}
      <div className="auth-dot-grid" />

      {/* ── Content ── */}
      <div className="auth-left-content">

        {/* Brand mark */}
        <div className="auth-brand">
          <div className="auth-brand-dot" />
          <span className="auth-brand-name">thrico</span>
          <span className="auth-brand-badge">
            <Sparkles size={10} />
            Platform
          </span>
        </div>

        {/* Hero headline */}
        <div className="auth-hero">
          <h1 className="auth-hero-title">
            Build Your Own<br />
            <span className="auth-hero-gradient">Social Universe</span>
          </h1>
          <p className="auth-hero-sub">
            One platform. Every tool your community needs.
          </p>
        </div>

        {/* Bento feature grid */}
        <div className="auth-bento">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bento-card"
                style={{ "--accent": f.accent, "--bg": f.bg } as React.CSSProperties}
              >
                <div className="bento-icon-wrap">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div className="bento-body">
                  <p className="bento-label">{f.label}</p>
                  <p className="bento-desc">{f.desc}</p>
                </div>
                <ArrowUpRight size={14} className="bento-arrow" />
              </div>
            );
          })}
        </div>

        {/* Scrolling module pills */}
        <div className="auth-marquee-wrap">
          <p className="auth-marquee-eyebrow">Included Modules</p>
          <div className="auth-marquee-track">
            <div className="auth-marquee-row marquee-fwd">
              {[...modules, ...modules].map((m, i) => (
                <span
                  key={i}
                  className="module-pill"
                  style={{ "--pill-color": m.color } as React.CSSProperties}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="auth-stats">
          {[
            { val: "50K+", label: "Communities" },
            { val: "99.9%", label: "Uptime" },
            { val: "180+", label: "Countries" },
          ].map((s, i) => (
            <div key={i} className="auth-stat">
              <span className="auth-stat-val">{s.val}</span>
              <span className="auth-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>

    {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
    <main className="auth-right">
      {/* Soft background tint */}
      <div className="auth-right-bg" />

      {/* The glass card */}
      <div className="auth-card">
        {/* Top gradient stripe */}
        <div className="auth-card-stripe" />

        {/* Logo */}
        <div className="auth-card-logo">
          <ThricoLogo />
        </div>

        {/* Form children */}
        <div className="auth-card-body">{children}</div>

        {/* Footer */}
        <div className="auth-card-footer">
          <div className="auth-footer-links">
            {["Help", "Privacy", "Terms"].map((text, i) => (
              <Link
                key={i}
                href="https://thrico.com/privacy-policy/"
                target="_blank"
                className="auth-footer-link"
              >
                {text}
              </Link>
            ))}
          </div>
          <div className="auth-footer-trust">
            <span className="trust-badge trust-green">🔒 SSL Secured</span>
            <span className="trust-badge trust-blue">⚡ Fast & Reliable</span>
          </div>
        </div>
      </div>
    </main>

    {/* ── Global Styles ───────────────────────────────────────────────────── */}
    <style>{`
      /* ── Root Layout ──────────────────────────────────────────────── */
      .auth-root {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      }
      @media (min-width: 1024px) {
        .auth-root { flex-direction: row; }
      }

      /* ── LEFT PANEL ───────────────────────────────────────────────── */
      .auth-left {
        display: none;
        position: relative;
        overflow: hidden;
        width: 50%;
        flex-shrink: 0;
      }
      @media (min-width: 1024px) {
        .auth-left { display: flex; flex-direction: column; }
      }

      .auth-left-bg {
        position: absolute; inset: 0;
        background: linear-gradient(145deg,
          #0a0a14 0%,
          #0d0f1f 30%,
          #0f0a1e 60%,
          #06090f 100%
        );
        z-index: 0;
      }

      /* Orbs */
      .orb {
        position: absolute;
        border-radius: 9999px;
        filter: blur(80px);
        z-index: 1;
        animation: orb-float 12s ease-in-out infinite alternate;
      }
      .orb-1 {
        width: 440px; height: 440px;
        top: -120px; left: -100px;
        background: radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%);
        animation-delay: 0s;
      }
      .orb-2 {
        width: 380px; height: 380px;
        bottom: -80px; right: -60px;
        background: radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%);
        animation-delay: -4s;
      }
      .orb-3 {
        width: 300px; height: 300px;
        top: 45%; left: 30%;
        background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%);
        animation-delay: -8s;
      }
      @keyframes orb-float {
        0%   { transform: translate(0,0) scale(1); }
        50%  { transform: translate(24px,-18px) scale(1.07); }
        100% { transform: translate(-16px,14px) scale(0.95); }
      }

      /* Dot-grid */
      .auth-dot-grid {
        position: absolute; inset: 0; z-index: 2;
        background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%);
      }

      /* ── Left Content ─────────────────────────────────────────────── */
      .auth-left-content {
        position: relative; z-index: 10;
        display: flex; flex-direction: column;
        height: 100%;
        padding: 44px 40px 36px;
        gap: 32px;
      }

      /* Brand */
      .auth-brand {
        display: flex; align-items: center; gap: 10px;
      }
      .auth-brand-dot {
        width: 10px; height: 10px; border-radius: 9999px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        box-shadow: 0 0 10px rgba(99,102,241,0.8);
      }
      .auth-brand-name {
        font-size: 18px; font-weight: 700; letter-spacing: -0.5px;
        color: #fff;
      }
      .auth-brand-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 9px; border-radius: 999px;
        font-size: 10px; font-weight: 600; letter-spacing: 0.4px;
        color: rgba(99,102,241,0.9);
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.3);
      }

      /* Hero */
      .auth-hero { display: flex; flex-direction: column; gap: 10px; }
      .auth-hero-title {
        font-size: clamp(28px, 3vw, 40px);
        font-weight: 800;
        line-height: 1.18;
        letter-spacing: -1px;
        color: #f0f0ff;
        margin: 0;
      }
      .auth-hero-gradient {
        background: linear-gradient(100deg, #818cf8,#a78bfa,#67e8f9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .auth-hero-sub {
        font-size: 14px; color: rgba(200,200,240,0.55);
        margin: 0; font-weight: 400; line-height: 1.5;
      }

      /* ── Bento Grid ───────────────────────────────────────────────── */
      .auth-bento {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .bento-card {
        display: flex; align-items: flex-start; gap: 10px;
        padding: 14px 14px;
        background: var(--bg);
        border: 1px solid rgba(255,255,255,0.065);
        border-radius: 14px;
        cursor: default;
        transition: all 0.25s ease;
        position: relative;
        overflow: hidden;
      }
      .bento-card::before {
        content: ''; position: absolute; inset: 0;
        border-radius: 14px;
        background: linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.25s;
      }
      .bento-card:hover::before { opacity: 1; }
      .bento-card:hover {
        border-color: rgba(255,255,255,0.13);
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.3);
      }
      .bento-icon-wrap {
        width: 32px; height: 32px; flex-shrink: 0;
        border-radius: 9px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        color: var(--accent);
      }
      .bento-body { flex: 1; min-width: 0; }
      .bento-label {
        font-size: 12px; font-weight: 600;
        color: rgba(230,230,255,0.9);
        margin: 0 0 2px;
      }
      .bento-desc {
        font-size: 10.5px; color: rgba(180,180,220,0.5);
        margin: 0; line-height: 1.4;
      }
      .bento-arrow {
        color: rgba(255,255,255,0.2); flex-shrink: 0; margin-top: 2px;
        transition: color 0.2s, transform 0.2s;
      }
      .bento-card:hover .bento-arrow {
        color: var(--accent); transform: translate(2px,-2px);
      }

      /* ── Marquee ──────────────────────────────────────────────────── */
      .auth-marquee-wrap { display: flex; flex-direction: column; gap: 10px; }
      .auth-marquee-eyebrow {
        font-size: 10px; font-weight: 600; letter-spacing: 1.2px;
        text-transform: uppercase;
        color: rgba(180,180,220,0.4);
        margin: 0;
      }
      .auth-marquee-track {
        overflow: hidden;
        mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      }
      .auth-marquee-row {
        display: flex; gap: 8px;
        width: max-content;
      }
      .marquee-fwd { animation: marquee-scroll 38s linear infinite; }
      @keyframes marquee-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .module-pill {
        display: inline-flex; align-items: center;
        padding: 5px 13px;
        border-radius: 999px;
        font-size: 11px; font-weight: 500;
        color: var(--pill-color);
        background: color-mix(in srgb, var(--pill-color) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--pill-color) 25%, transparent);
        white-space: nowrap;
        transition: transform 0.2s;
      }
      .module-pill:hover { transform: scale(1.05); }

      /* ── Stats ────────────────────────────────────────────────────── */
      .auth-stats {
        display: flex; gap: 0;
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px;
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(12px);
        overflow: hidden;
        margin-top: auto;
      }
      .auth-stat {
        flex: 1;
        display: flex; flex-direction: column; align-items: center;
        padding: 16px 8px;
        gap: 3px;
        border-right: 1px solid rgba(255,255,255,0.07);
      }
      .auth-stat:last-child { border-right: none; }
      .auth-stat-val {
        font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
        background: linear-gradient(120deg, #818cf8, #c4b5fd);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .auth-stat-label {
        font-size: 10px; color: rgba(180,180,220,0.45); font-weight: 500;
        letter-spacing: 0.3px;
      }

      /* ── RIGHT PANEL ──────────────────────────────────────────────── */
      .auth-right {
        flex: 1;
        display: flex; align-items: center; justify-content: center;
        padding: 32px 20px;
        position: relative;
        background: #f8f8fc;
      }
      @media (min-width: 1024px) {
        .auth-right { padding: 48px 40px; }
      }
      .auth-right-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse 60% 50% at 80% 10%, rgba(99,102,241,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 10% 90%, rgba(139,92,246,0.07) 0%, transparent 70%),
          #f5f5fb;
      }

      /* ── Card ─────────────────────────────────────────────────────── */
      .auth-card {
        position: relative; z-index: 1;
        width: 100%; max-width: 420px;
        background: rgba(255,255,255,0.95);
        border: 1px solid rgba(99,102,241,0.12);
        border-radius: 24px;
        box-shadow:
          0 2px 4px rgba(0,0,0,0.04),
          0 8px 24px rgba(99,102,241,0.1),
          0 32px 64px rgba(0,0,0,0.07);
        backdrop-filter: blur(24px);
        overflow: hidden;
        animation: card-in 0.6s cubic-bezier(0.22,1,0.36,1) both;
      }
      @keyframes card-in {
        from { opacity: 0; transform: translateY(24px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* Top accent stripe */
      .auth-card-stripe {
        height: 3px;
        background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
      }

      /* Logo */
      .auth-card-logo {
        display: flex; justify-content: center;
        padding: 28px 32px 8px;
      }
      .auth-card-logo > * {
        transition: transform 0.3s ease;
      }
      .auth-card-logo > *:hover {
        transform: scale(1.04);
      }

      /* Body */
      .auth-card-body {
        padding: 16px 32px 8px;
      }

      /* Footer */
      .auth-card-footer {
        display: flex; flex-direction: column; gap: 12px;
        align-items: center;
        padding: 16px 32px 24px;
        border-top: 1px solid rgba(0,0,0,0.05);
        background: rgba(248,248,252,0.7);
      }
      .auth-footer-links {
        display: flex; align-items: center; gap: 20px;
      }
      .auth-footer-link {
        font-size: 11.5px; font-weight: 500;
        color: #94a3b8;
        text-decoration: none;
        transition: color 0.2s;
        position: relative;
      }
      .auth-footer-link::after {
        content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
        height: 1px; background: #6366f1;
        transform: scaleX(0); transform-origin: left;
        transition: transform 0.2s;
      }
      .auth-footer-link:hover { color: #6366f1; }
      .auth-footer-link:hover::after { transform: scaleX(1); }
      .auth-footer-trust {
        display: flex; align-items: center; gap: 10px;
      }
      .trust-badge {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 3px 10px; border-radius: 999px;
        font-size: 10.5px; font-weight: 600;
      }
      .trust-green {
        color: #059669;
        background: rgba(5,150,105,0.07);
        border: 1px solid rgba(5,150,105,0.15);
      }
      .trust-blue {
        color: #4f46e5;
        background: rgba(79,70,229,0.07);
        border: 1px solid rgba(79,70,229,0.15);
      }
    `}</style>
  </div>
);

export default AuthLayout;

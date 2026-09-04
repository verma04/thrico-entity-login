"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";

export const ThricoBrandEmblem = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 818.34 799.46"
    className={className || "w-11 h-11 drop-shadow-md"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="thrico-brand-emblem-grad"
        x1="82.48"
        y1="135.11"
        x2="713.44"
        y2="655.6"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.46" stopColor="#fd5531" />
        <stop offset="0.72" stopColor="#0d63f4" />
      </linearGradient>
    </defs>
    <path
      fill="url(#thrico-brand-emblem-grad)"
      d="M151.1,455.57l-52.66,7.33c-7.89,1.1-13.89-7.48-16.07-13.65-2.4-6.81-1.13-12.21,2.74-17.62,8.06-11.29,11.11-24.94,9.39-38.65-1.37-10.89-6.45-19.54-11.93-28.71-3.48-5.83-.41-13.99,2.59-19.12,4.75-8.12,12.47-9.81,21.18-7.67l168.36,41.36,50.29,12.66c8.86,2.23,13.14,12.97,12.31,20.9-1.19,11.34-8.72,17.1-19.09,18.57l-67.21,9.57-99.9,15.05ZM736.36,435.98c-17.28-21.35-16-47.12-.65-69.33,3.49-5.05,1.67-11.96-.57-17.02-3.01-6.78-8.6-10.91-16.12-10.97l-130.09,30.55-88.49,21.15c-9.36,2.24-14.6,12.27-14.44,21.01.15,8.2,5.69,18.84,15.18,20.33l122.63,19.22,93.52,14.54c5.1.79,11.26-.8,14.53-4.76,5.96-7.22,7.43-16.54,4.51-24.72ZM359.92,323.14l-20.93-29.7-36.18-50.64-67.08-95.03c-7.13-6.83-17.52-6.53-24.74-.14-4.06,3.61-6.59,8.12-6.61,13.73-5.06,21.34-22.18,37.82-44,41.47-8.9,1.49-15.28,9.84-15.61,18.63-.26,6.73,2.76,11.49,8.09,15.28l170.34,121.38c9.05,6.45,21.87,3.65,29.76-3.01,9.96-8.39,12.3-20.92,6.95-31.99ZM475.83,100.01c1.45-7.03-5.16-13.01-10.57-15.68-5.98-2.96-11.82-3.46-17.69-.49-21.16,18.18-50.27,17.69-72.4.6-7.06-5.45-17.89-2.03-24.69,3.23-5.54,4.28-6.79,10.57-5.44,16.94l4.4,20.78,42.3,189.76c3.92,7.82,11.14,12.22,19.55,11.76,6.91-.39,16.16-4.32,17.94-12.31l16.89-76,17.63-80.08,12.08-58.5ZM220.57,673.27c5.87.59,14.19.46,18.11-5.2l57.08-82.43,65.24-94.64c5.58-8.1,3.08-18.95-1.98-26.59-6.79-10.26-21.48-14.93-31.91-7.32l-43.22,31.5-130.36,95.11c-5.06,3.69-5.63,12.02-4.11,17.23,1.43,4.86,5.48,10.84,11.16,11.93,9.56,1.84,17.92,4.71,25.49,11.02,11.3,9.42,18.88,22.65,20.37,37.9,2.98,6.34,8.47,9.88,14.13,11.49ZM670.6,235.19c4.27-5.27,5.42-11.34,3.87-18.43-1.83-3.93-5.28-11.46-11.57-12.41-22.99-3.48-41.8-19.98-46.46-43.39-.77-3.86-1.72-7.49-4.88-10.23-6.95-7.89-18.64-8.29-26.07-.62l-94.09,141.91-25.74,38.51c-4.36,6.52-2.24,15.07,1.12,21.6,6.94,11.22,21.09,15.55,33.26,9.31l170.56-126.25ZM627.39,628.92c8.5-9.21,19.66-15.17,32.14-16.02,5.9-2.94,9.77-7.85,10.79-13.61.67-5.66.16-13.2-5.12-16.97l-173.99-123.91c-9.84-4.26-20.1-1.92-27.57,5.09-6.41,6.74-11.38,18.57-5.47,27.15l20.31,29.53,46.25,64.66,59.33,83.22c3.83,5.37,12.12,5.89,17.78,4.06,4.9-1.58,10.53-5.8,11.55-12.16,1.91-11.89,6.07-22.44,14.01-31.04ZM446.06,718.73c8.82,2.98,18.94-.68,24.05-8.46,2.53-3.86,2.45-7.76,1.53-12.11l-21.56-102.14-20.72-99.98c-4.28-9.31-14.41-13.61-24.33-11.88-9.55,1.66-16.39,8.65-17.2,18.49l-41.97,199.51,1.89,8.2c1.41,6.12,7.1,10.14,13.39,8.37,6.06,2.44,11.3.51,16.17-3.22,14.62-11.2,33.51-14.45,50.68-7.54,6.64,2.67,12.17,6.6,18.07,10.75ZM431.01,5.29c-16.69-9.81-37.41-5.55-49.76,9.23-11.06,13.24-12.46,31.97-3.35,46.94,5.38,8.83,14.38,15.26,24.57,17.46,23.9,5.14,45.17-10.91,48.05-33.48,2.08-16.35-5.39-31.84-19.51-40.15ZM186.74,134.75c-3.43-12.53-12.38-22.24-24.76-26.62-12.51-4.44-26.55-1.78-36.87,6.51-9.89,7.95-15.42,20.22-14.64,33.77,1.41,24.19,24.75,41.82,48.73,35.32,21.65-5.87,33.29-27.93,27.53-48.99ZM709.38,145.22c-.47-17.67-11.49-32.98-28.93-37.64-22.62-6.05-44.84,9.62-47.98,32.92-2.91,21.54,12.3,42.38,34.64,44.65,24.26,2.47,42.89-16.51,42.27-39.93ZM166.06,701.71c15.87-7.19,24.41-23.22,22.19-40.85-2.18-17.25-15.21-31.06-31.79-33.65-17.67-2.76-34.4,6.58-41.54,22.85-6.04,13.78-4.43,28.92,5.32,40.65,11.58,13.92,30.03,18.15,45.82,11ZM51.81,363.31c-12.41-4.77-26.28-2.23-36.54,5.93-13.22,10.51-18.34,27.1-13.44,43.34,5.43,18,22.94,29,41.35,26.71s32.44-16.98,33.55-36.21c1.03-17.76-8.74-33.54-24.92-39.77ZM804.81,371.15c-17.4-15.03-43.75-10.98-56.35,8.29-11.15,17.06-8.04,39.99,8.31,52.63,11.38,8.8,26.31,10.44,39.73,4.37,11.54-5.22,20.36-16.95,21.64-30.9,1.25-13.65-3.34-25.77-13.33-34.39ZM701.49,646.75c-9.22-16.88-28.39-24.05-46.33-17.05-12.58,4.9-21.29,16.43-23.64,29.78-2.22,12.59,1.06,25.09,10.06,34.32,9.33,9.58,22.57,13.28,36.44,9.99,10.77-2.56,21.8-11.16,26.02-23.48,3.9-11.39,2.93-23.54-2.54-33.55ZM447.31,756.68c-2.04-17.96-15.33-32.37-33.31-34.55-19.12-2.32-36.21,9.9-41.11,28.27-3.31,12.43-.98,25.35,7.53,35.38,7.5,8.83,19.35,14.67,32.34,13.55,21.78-1.89,36.96-21.54,34.55-42.64Z"
    />
  </svg>
);

interface AuthLayoutProps {
  children: React.ReactNode;
  logoAlign?: "left" | "center";
  hideLogo?: boolean;
  cardClassName?: string;
}

const AuthLayout = ({
  children,
  logoAlign = "left",
  hideLogo = false,
  cardClassName = "",
}: AuthLayoutProps) => {
  return (
    <div className="auth-root-shopify">
      <Toaster position="top-center" richColors />

      {/* Subtle background gradient and dark glow */}
      <div className="auth-ambient-bg" />

      <div className="auth-container">
        {/* Center Card */}
        <div className={`auth-card-shopify ${cardClassName}`.trim()}>
          {/* Brand Logo inside Card */}
          {!hideLogo && (
            <div
              className={`mb-4 flex ${
                logoAlign === "center" ? "justify-center" : "justify-start"
              }`}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center transition-transform hover:scale-105 duration-200"
              >
                <Image
                  src="/thrico-logo.png"
                  alt="Thrico"
                  width={130}
                  height={45}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
          )}

          {children}
        </div>

        {/* Bottom Footer */}
        <footer className="auth-footer-shopify">
          <Link
            href="https://thrico.com/contact"
            target="_blank"
            className="auth-help-link"
          >
            Need Help?
          </Link>

          <p className="auth-disclaimer">
            By continuing, you agree to the{" "}
            <Link
              href="https://thrico.com/terms"
              target="_blank"
              className="auth-legal-link"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="https://thrico.com/privacy-policy"
              target="_blank"
              className="auth-legal-link"
            >
              Privacy Policy
            </Link>
            , and to receive marketing emails from Thrico. Unsubscribe anytime.
          </p>
        </footer>
      </div>

      {/* Global CSS for Shopify Style Login */}
      <style>{`
        .auth-root-shopify {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: #060809;
          font-family: var(--font-figtree), "Figtree", -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          color: #ffffff;
          overflow-x: hidden;
        }

        .auth-ambient-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 65% 50% at 50% 32%, rgba(20, 26, 35, 0.9) 0%, #060809 100%);
          z-index: 0;
        }

        .auth-container {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 32px 16px 20px;
        }

        @media (min-width: 640px) {
          .auth-container {
            padding: 40px 20px 24px;
          }
        }

        .auth-card-shopify {
          width: 100%;
          max-width: 360px;
          background-color: #ffffff;
          color: #1a1a1a;
          border-radius: 16px;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 20px 40px -4px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          padding: 26px 24px 24px;
          margin: auto 0;
          animation: auth-card-appear 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (min-width: 640px) {
          .auth-card-shopify {
            padding: 28px 26px 26px;
          }
        }

        @keyframes auth-card-appear {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .auth-footer-shopify {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          margin-top: 24px;
          max-width: 440px;
        }

        .auth-help-link {
          font-size: 12px;
          color: #a0a6ad;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .auth-help-link:hover {
          color: #ffffff;
        }

        .auth-disclaimer {
          font-size: 10.5px;
          line-height: 1.45;
          color: #6d7580;
          margin: 0;
        }

        .auth-legal-link {
          color: #a0a6ad;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }

        .auth-legal-link:hover {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;

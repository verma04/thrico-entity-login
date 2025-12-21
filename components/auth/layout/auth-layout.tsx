import Link from "next/link";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ThricoLogo from "../logo";
import { Users, Globe, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";

const AuthLayout = ({ children }: React.PropsWithChildren) => (
  <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    {/* Left Side - Branding & Features */}
    <div className="flex w-1/2 relative overflow-hidden p-12 flex-col justify-between">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10">
        <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-700">
          <h1 className="text-5xl font-bold text-white leading-tight animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
            Create & Run Your Own
            <span className="block mt-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Social Media Universe
            </span>
          </h1>

          <p className="text-lg text-blue-100/90 max-w-md leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
            Everything you need to create engaging experiences, manage members,
            and scale your community to new heights.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
        {/* Features with icons */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-white/20">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1 group-hover:text-blue-200 transition-colors">
                Member Management
              </h3>
              <p className="text-sm text-blue-100/80">
                Powerful tools to engage and grow your community
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-white/20">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1 group-hover:text-blue-200 transition-colors">
                Website Builder
              </h3>
              <p className="text-sm text-blue-100/80">
                Create stunning pages without writing code
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-white/20">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1 group-hover:text-blue-200 transition-colors">
                Real-time Analytics
              </h3>
              <p className="text-sm text-blue-100/80">
                Track engagement and make data-driven decisions
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Categories and Features Display */}
        <div className="py-4 space-y-6">
          {/* Entity Categories - Static Grid */}
          <div>
            <p className="text-xs text-blue-300/70 mb-3 text-center font-medium uppercase tracking-wider">
              Supporting Communities
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20 font-medium hover:scale-105 transition-transform">
                🎓 Academia
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20 font-medium hover:scale-105 transition-transform">
                🏢 Enterprise
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20 font-medium hover:scale-105 transition-transform">
                ✨ Creator
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20 font-medium hover:scale-105 transition-transform">
                🤝 Association
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20 font-medium hover:scale-105 transition-transform">
                🚀 Startup
              </span>
            </div>
          </div>

          {/* Feature Modules - Organized by Category */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <p className="text-xs text-purple-300/70 mb-4 text-center font-medium uppercase tracking-wider">
              Powerful Features
            </p>

            {/* Marquee Container */}
            <div className="relative overflow-hidden">
              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .marquee-content {
                  animation: marquee 40s linear infinite;
                }
                .marquee-content:hover {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="flex gap-2.5 marquee-content">
                {/* First set of categories */}
                <div className="flex gap-2.5 shrink-0">
                  {/* Content */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-blue-300 mb-1.5 uppercase tracking-wider">
                      Content
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Feed
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Stories
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Media
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Newsletter
                      </span>
                    </div>
                  </div>

                  {/* Connections */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                      Connections
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Network
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Nearby
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        New to City
                      </span>
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-purple-300 mb-1.5 uppercase tracking-wider">
                      Conversations
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Events
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Forums
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Chat
                      </span>
                    </div>
                  </div>

                  {/* Commerce */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-pink-300 mb-1.5 uppercase tracking-wider">
                      Commerce
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Shop
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Offers
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Marketplace
                      </span>
                    </div>
                  </div>

                  {/* Celebrations */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-yellow-300 mb-1.5 uppercase tracking-wider">
                      Celebrations
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Birthdays
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Anniversaries
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Spotlight
                      </span>
                    </div>
                  </div>

                  {/* Careers */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-green-300 mb-1.5 uppercase tracking-wider">
                      Careers
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Jobs
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Mentorship
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Companies
                      </span>
                    </div>
                  </div>

                  {/* Gamification */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                      Gamification
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Badges
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Ranks
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Leaderboard
                      </span>
                    </div>
                  </div>

                  {/* Care */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-teal-300 mb-1.5 uppercase tracking-wider">
                      Care
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Polls
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Surveys
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Feedback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex gap-2.5 shrink-0">
                  {/* Content */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-blue-300 mb-1.5 uppercase tracking-wider">
                      Content
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Feed
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Stories
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Media
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Newsletter
                      </span>
                    </div>
                  </div>

                  {/* Connections */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                      Connections
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Network
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Nearby
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        New to City
                      </span>
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-purple-300 mb-1.5 uppercase tracking-wider">
                      Conversations
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Events
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Forums
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Chat
                      </span>
                    </div>
                  </div>

                  {/* Commerce */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-pink-300 mb-1.5 uppercase tracking-wider">
                      Commerce
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Shop
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Offers
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Marketplace
                      </span>
                    </div>
                  </div>

                  {/* Celebrations */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-yellow-300 mb-1.5 uppercase tracking-wider">
                      Celebrations
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Birthdays
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Anniversaries
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Spotlight
                      </span>
                    </div>
                  </div>

                  {/* Careers */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-green-300 mb-1.5 uppercase tracking-wider">
                      Careers
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Jobs
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Mentorship
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Companies
                      </span>
                    </div>
                  </div>

                  {/* Gamification */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                      Gamification
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Badges
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Ranks
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Leaderboard
                      </span>
                    </div>
                  </div>

                  {/* Care */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 hover:bg-white/10 transition-colors w-38">
                    <h4 className="text-[8px] font-semibold text-teal-300 mb-1.5 uppercase tracking-wider">
                      Care
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Polls
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Surveys
                      </span>
                      <span className="text-[7px] text-white/80 px-1.5 py-0.5 bg-white/10 rounded-full">
                        Feedback
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side - Auth Form */}
    <div className="flex w-1/2 items-center justify-center p-6 lg:p-12 relative">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10 lg:hidden" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <Card className="border border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white dark:bg-slate-900 backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-700 overflow-hidden">
          {/* Card Header with gradient border */}
          <CardHeader className="relative pb-6 pt-8 px-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="flex justify-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <ThricoLogo />
              </div>
            </div>
          </CardHeader>

          {/* Form Content */}
          <CardContent className="px-8 pb-8">{children}</CardContent>

          {/* Footer */}
          <CardFooter className="flex-col gap-4 border-t border-slate-100 dark:border-slate-800 pt-6 pb-8 px-8 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Footer Links */}
            <div className="flex items-center justify-center gap-6">
              <Link
                target="_blank"
                href="https://thrico.com/privacy-policy/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Help
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link
                target="_blank"
                href="https://thrico.com/privacy-policy/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Privacy
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link
                target="_blank"
                href="https://thrico.com/privacy-policy/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Terms
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="text-green-500">🔒</span>
                  SSL Secured
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="inline-flex items-center gap-1">
                  <span className="text-blue-500">⚡</span>
                  Fast & Reliable
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/70">
                Trusted by 10,000+ communities worldwide
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
);

export default AuthLayout;

"use client";

import React, { useEffect, useState } from "react";
import { siteMetadata, metricsData } from "@/data/siteData";
import { HeroCanvas } from "@/components/HeroCanvas";

export const HeroBento: React.FC = () => {
  const [animatedPrograms, setAnimatedPrograms] = useState("1,000+");

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1500;
    const start = 0;
    const end = 1000;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);

      setAnimatedPrograms(current.toLocaleString() + "+");

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <>
      {/* 2. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[88vh] pt-32 pb-20 flex items-center overflow-hidden"
      >
        {/* Background Canvas Layer (Renders 3D CAD Impeller on the right, calm breathing motion) */}
        <HeroCanvas />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left / Primary Content */}
            <div className="lg:col-span-7">
              {/* Small Eyebrow */}
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 uppercase mb-4">
                {siteMetadata.heroEyebrow}
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.08] mb-6 max-w-2xl">
                {siteMetadata.heroHeadline}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400">
                  {siteMetadata.heroHeadlineHighlight}
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl font-normal max-w-xl mb-8 leading-relaxed font-sans">
                {siteMetadata.heroSubtitle}
              </p>

              {/* Clean CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#estimator"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-heading font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Request a Quote</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
                <a
                  href="#services"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-lg font-heading font-medium text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-medium)] hover:border-blue-500 transition-all flex items-center justify-center"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Right Side: Clean Focal Space for 3D CAD Visualization */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none">
              {/* The interactive 3D geometry rendered by HeroCanvas occupies this space */}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRECISION METRICS SECTION */}
      <section id="metrics" className="py-12 border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div
                id="metric-programs"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-1.5"
              >
                {animatedPrograms}
              </div>
              <div className="font-sans text-xs sm:text-sm font-medium text-[var(--text-muted)]">
                {metricsData[0].label}
              </div>
            </div>

            <div>
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 tracking-tight mb-1.5">
                {metricsData[1].value}
              </div>
              <div className="font-sans text-xs sm:text-sm font-medium text-[var(--text-muted)]">
                {metricsData[1].label}
              </div>
            </div>

            <div>
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-1.5">
                {metricsData[2].value}
              </div>
              <div className="font-sans text-xs sm:text-sm font-medium text-[var(--text-muted)]">
                {metricsData[2].label}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

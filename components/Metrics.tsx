"use client";

import React, { useEffect, useRef, useState } from "react";
import { metricsData } from "@/data/siteData";

export const Metrics: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedPrograms, setAnimatedPrograms] = useState("1,000+");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
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
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="py-12 border-t border-b border-slate-800 bg-slate-900/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div
              id="metric-programs"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-1.5"
            >
              {animatedPrograms}
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-400">
              {metricsData[0].label}
            </div>
          </div>

          <div>
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 tracking-tight mb-1.5">
              {metricsData[1].value}
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-400">
              {metricsData[1].label}
            </div>
          </div>

          <div>
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-1.5">
              {metricsData[2].value}
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-400">
              {metricsData[2].label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

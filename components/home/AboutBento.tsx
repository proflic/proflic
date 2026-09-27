import React from "react";
import { aboutData } from "@/data/aboutData";
import { CadVisualizer } from "@/components/CadVisualizer";

export const AboutBento: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: About Narrative */}
          <div className="lg:col-span-6">
            <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-3">
              {aboutData.eyebrow}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-6 leading-tight">
              {aboutData.heading}
            </h2>
            <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 font-normal font-sans">
              <strong className="text-[var(--text-main)] font-semibold">PROFLIC Technologies</strong> is an
              advanced industrial metrology and precision quality engineering firm based in Chhatrapati Sambhajinagar,
              Maharashtra, India. We bridge the gap between physical manufacturing and digital CAD data using coordinate
              measuring machines, high-speed 3D laser scanners, and dedicated offline programming software.
            </p>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Whether verifying critical aerospace castings, automotive dies, sheet metal stampings, or precision machined
              components, our engineers deliver actionable ASME Y14.5 GD&amp;T inspection reports, certified AS9102 FAIR packages, and turnkey
              offline CMM routines in <span className="text-[var(--text-main)] font-medium">PC-DMIS</span> and{" "}
              <span className="text-[var(--text-main)] font-medium">PolyWorks</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-sans text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-6">
              {aboutData.capabilities.map((cap, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[var(--text-main)] font-semibold mb-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    {cap.title}
                  </span>
                  <span className="text-[var(--text-dim)] text-xs pl-3">{cap.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live CAD / XYZ Visualizer */}
          <div className="lg:col-span-6">
            <CadVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
};

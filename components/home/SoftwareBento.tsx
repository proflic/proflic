import React from "react";
import { softwareData } from "@/data/softwareData";

export const SoftwareBento: React.FC = () => {
  return (
    <section id="software" className="pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 uppercase mb-2">
            {softwareData.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-3">
            {softwareData.heading}
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed font-sans">
            {softwareData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {softwareData.platforms.map((platform, idx) => (
            <div
              key={idx}
              className="metrology-panel p-6 sm:p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
                <h3 className="font-heading text-xl font-bold text-[var(--text-main)]">
                  {platform.title}
                </h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 font-normal font-sans">
                {platform.description}
              </p>
              <div className="space-y-2.5 text-xs font-mono text-[var(--text-muted)]">
                {platform.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

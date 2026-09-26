import React from "react";

export const HomeCtaBento: React.FC = () => {
  return (
    <section id="final-cta" className="py-24 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-4 tracking-tight">
          Every Micron Matters.
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg mb-8 font-sans font-normal leading-relaxed">
          From CAD to CMM inspection, scanning to inspection — PROFLIC Technologies helps you
          measure with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#estimator"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-heading font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-sm hover:shadow-blue-500/20 active:scale-[0.98]"
          >
            Request a Quote
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg font-heading font-medium text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-blue-500/50 transition-all"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

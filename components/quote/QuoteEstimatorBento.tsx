"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  serviceOptions,
  complexityOptions,
  softwareOptions,
  calculateTurnaroundAndRating,
} from "@/data/estimatorData";
import { BentoCard } from "@/components/bento/BentoCard";
import { TechnicalBadge } from "@/components/bento/TechnicalBadge";

export const QuoteEstimatorBento: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "scanning";

  const [service, setService] = useState(initialService);
  const [complexity, setComplexity] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [software, setSoftware] = useState("PC-DMIS");

  useEffect(() => {
    const s = searchParams.get("service");
    if (s) setService(s);
  }, [searchParams]);

  const { turnaround, rating, equipment } = calculateTurnaroundAndRating(
    service,
    complexity,
    quantity,
    software
  );

  const handleTransferToContact = () => {
    const params = new URLSearchParams({
      service,
      complexity,
      quantity: String(quantity),
      software,
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <TechnicalBadge icon="fa-solid fa-calculator" className="mb-3">
            PRECISION PARAMETER CALCULATOR
          </TechnicalBadge>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Metrology Quote Estimator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
            Configure your project parameters to calculate indicative turnaround windows and
            metrology frameworks.
          </p>
        </div>

        {/* Bento Grid Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Bento Card (lg:col-span-7) */}
          <BentoCard
            className="lg:col-span-7 space-y-5"
            code="// CONFIG_PARAMETERS"
            badge="STEP-BASED CONFIG"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label
                  htmlFor="calcService"
                  className="block text-xs font-sans font-semibold text-slate-300 mb-1.5 tracking-wide uppercase"
                >
                  01 Service Category
                </label>
                <select
                  id="calcService"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="calcComplexity"
                    className="block text-xs font-sans font-semibold text-slate-300 mb-1.5 tracking-wide uppercase"
                  >
                    02 Complexity
                  </label>
                  <select
                    id="calcComplexity"
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  >
                    {complexityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="calcQuantity"
                    className="block text-xs font-sans font-semibold text-slate-300 mb-1.5 tracking-wide uppercase"
                  >
                    03 Quantity
                  </label>
                  <input
                    type="number"
                    id="calcQuantity"
                    value={quantity}
                    min="1"
                    max="500"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5 tracking-wide uppercase">
                  04 Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {softwareOptions.map((sw) => (
                    <label
                      key={sw}
                      className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="calcSoftware"
                        value={sw}
                        checked={software === sw}
                        onChange={() => setSoftware(sw)}
                        className="text-blue-600"
                      />
                      <span className="text-xs font-mono text-slate-300">{sw}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </BentoCard>

          {/* Results Bento Card (lg:col-span-5) */}
          <BentoCard
            className="lg:col-span-5 flex flex-col justify-between"
            code="// TELEMETRY_ESTIMATE"
            badge="LIVE COMPUTATION"
          >
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                Indicative Project Summary
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    INDICATIVE TURNAROUND:
                  </span>
                  <span className="text-base font-bold text-white mt-0.5 block">
                    {turnaround}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    METROLOGY RATING:
                  </span>
                  <span className="text-xs font-semibold text-blue-400 mt-0.5 block">
                    {rating}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    DEPLOYED HARDWARE / ENGINE:
                  </span>
                  <span className="text-xs font-medium text-slate-300 mt-0.5 block">
                    {equipment}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6">
              <div className="text-[10px] font-mono text-slate-500 italic mb-3">
                *Indicative estimate — final timeline depends on engineering review.
              </div>
              <button
                type="button"
                onClick={handleTransferToContact}
                className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Transfer to Inquiry Form</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

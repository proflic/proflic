"use client";

import React, { useState, useEffect } from "react";
import {
  serviceOptions,
  complexityOptions,
  softwareOptions,
  calculateTurnaroundAndRating,
} from "@/data/estimatorData";

interface EstimatorProps {
  onTransfer: (data: {
    service: string;
    serviceText: string;
    complexity: string;
    complexityText: string;
    quantity: number;
    software: string;
  }) => void;
  selectedService?: string;
}

export const Estimator: React.FC<EstimatorProps> = ({ onTransfer, selectedService }) => {
  const [service, setService] = useState("scanning");
  const [complexity, setComplexity] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [software, setSoftware] = useState("PC-DMIS");

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const { turnaround, rating } = calculateTurnaroundAndRating(
    service,
    complexity,
    quantity,
    software
  );

  const handleTransfer = () => {
    const serviceObj = serviceOptions.find((s) => s.value === service);
    const complexityObj = complexityOptions.find((c) => c.value === complexity);

    onTransfer({
      service,
      serviceText: serviceObj ? serviceObj.label : service,
      complexity,
      complexityText: complexityObj ? complexityObj.label : complexity,
      quantity,
      software,
    });
  };

  return (
    <div className="metrology-panel p-6 sm:p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
      <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 uppercase mb-2">
        QUOTE ESTIMATOR
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-6">
        Configure Your Project
      </h2>

      <form id="calcForm" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="calcService"
            className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1.5 tracking-wide uppercase"
          >
            01 Service Category
          </label>
          <select
            id="calcService"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-mono focus:border-blue-500 focus:outline-none min-h-[44px]"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="calcComplexity"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1.5 tracking-wide uppercase"
            >
              02 Complexity
            </label>
            <select
              id="calcComplexity"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-mono focus:border-blue-500 focus:outline-none min-h-[44px]"
            >
              {complexityOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="calcQuantity"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1.5 tracking-wide uppercase"
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
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-mono focus:border-blue-500 focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1.5 tracking-wide uppercase">
            04 Platform
          </label>
          <div className="grid grid-cols-3 gap-2">
            {softwareOptions.map((sw) => (
              <label
                key={sw}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors min-h-[44px] ${
                  software === sw
                    ? "bg-blue-600/10 border-blue-500 text-blue-500"
                    : "bg-[var(--bg-input)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-medium)]"
                }`}
              >
                <input
                  type="radio"
                  name="calcSoftware"
                  value={sw}
                  checked={software === sw}
                  onChange={() => setSoftware(sw)}
                  className="text-blue-600"
                />
                <span className="text-xs font-mono font-medium">{sw}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Result Box */}
        <div className="p-4 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] space-y-2.5 font-mono text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-dim)] text-[11px]">INDICATIVE TURNAROUND:</span>
            <span id="calcResultTurnaround" className="font-bold text-white text-xs sm:text-sm">
              {turnaround}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-dim)] text-[11px]">METROLOGY RATING:</span>
            <span id="calcResultRating" className="text-blue-400 font-semibold text-[11px]">
              {rating}
            </span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[var(--text-dim)] italic">
          *Indicative estimate — final timeline depends on engineering review.
        </div>

        <button
          type="button"
          id="calcTransferBtn"
          onClick={handleTransfer}
          className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] shadow-sm hover:shadow-blue-500/20 active:scale-[0.98]"
        >
          <span>Transfer to Inquiry Form</span>
          <i className="fa-solid fa-arrow-down-long text-xs"></i>
        </button>
      </form>
    </div>
  );
};

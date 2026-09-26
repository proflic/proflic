"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesData, serviceFilters, ServiceItem } from "@/data/servicesData";
import { BentoCard } from "@/components/bento/BentoCard";
import { TechnicalBadge } from "@/components/bento/TechnicalBadge";

export const ServicesListBento: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = servicesData.filter(
    (s) => activeFilter === "all" || s.category === activeFilter
  );

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <TechnicalBadge icon="fa-solid fa-list-check" className="mb-3">
            COMPLETE CAPABILITY CATALOG
          </TechnicalBadge>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Metrology &amp; Precision Engineering Services
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Explore our end-to-end industrial inspection, high-density 3D scanning, offline CMM
            programming routines, and reverse engineering solutions.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {serviceFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "border border-slate-800 text-slate-400 hover:text-white bg-slate-900/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <BentoCard
              key={service.id}
              interactive={true}
              className="flex flex-col justify-between"
              code={`// SVC_${String(idx + 1).padStart(2, "0")}`}
              badge={service.categoryLabel}
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-white mb-2">
                  {service.title}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Key Spec Highlights */}
                <div className="space-y-2 font-mono text-xs mb-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-start justify-between text-slate-400">
                    <span className="text-[10px] uppercase text-slate-500">Equipment:</span>
                    <span className="text-white text-right max-w-[65%] text-[11px] truncate">
                      {service.equipment.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between text-slate-400">
                    <span className="text-[10px] uppercase text-slate-500">Standards:</span>
                    <span className="text-blue-400 text-right max-w-[65%] text-[11px]">
                      {service.standards.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="px-4 py-2 rounded-lg font-heading font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5"
                >
                  <span>Full Details</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
                <Link
                  href={`/quote?service=${service.id}`}
                  className="px-3 py-2 rounded-lg font-mono text-xs text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 transition-colors"
                >
                  Instant Quote
                </Link>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  );
};

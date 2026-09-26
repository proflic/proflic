import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/servicesData";
import { BentoCard } from "@/components/bento/BentoCard";
import { TechnicalBadge } from "@/components/bento/TechnicalBadge";

export const ServiceDetailBento: React.FC<{ service: ServiceItem }> = ({ service }) => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-semibold">{service.title}</span>
        </div>

        {/* Header Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Service Overview Bento Card (lg:col-span-8) */}
          <BentoCard
            className="lg:col-span-8 flex flex-col justify-between"
            code="// SERVICE_SPECIFICATION"
            badge={service.categoryLabel}
          >
            <div>
              <TechnicalBadge icon="fa-solid fa-microchip" className="mb-3">
                {service.category.toUpperCase()} CAPABILITY
              </TechnicalBadge>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal font-sans">
                {service.overview}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact?service=${service.id}`}
                className="px-6 py-3 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-sm flex items-center gap-2"
              >
                <span>Request Quote for This Service</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
              <Link
                href={`/quote?service=${service.id}`}
                className="px-5 py-3 rounded-lg font-mono text-xs text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 transition-all flex items-center gap-2"
              >
                <span>Configure Estimator</span>
                <i className="fa-solid fa-calculator text-[10px]"></i>
              </Link>
            </div>
          </BentoCard>

          {/* Key Standards & Equipment Bento Card (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Equipment Card */}
            <BentoCard code="// HARDWARE_OPTICS" badge="CERTIFIED">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold tracking-wider mb-1">
                EQUIPMENT &amp; OPTICS:
              </div>
              <div className="text-white font-mono text-xs font-semibold leading-relaxed">
                {service.equipment}
              </div>
            </BentoCard>

            {/* Standards Card */}
            <BentoCard code="// COMPLIANCE" badge="VERIFIED">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold tracking-wider mb-1">
                SUPPORTED STANDARDS:
              </div>
              <div className="text-blue-400 font-mono text-xs font-semibold leading-relaxed">
                {service.standards}
              </div>
            </BentoCard>

            {/* Deliverables Card */}
            <BentoCard code="// DELIVERABLES" badge="OUTPUT">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold tracking-wider mb-1">
                FORMAL DELIVERABLES:
              </div>
              <div className="text-emerald-400 font-mono text-xs font-semibold leading-relaxed">
                {service.deliverables}
              </div>
            </BentoCard>
          </div>

          {/* Capabilities List Bento Card (lg:col-span-12) */}
          <BentoCard
            className="lg:col-span-12"
            code="// CORE_EXECUTION_CAPABILITIES"
            badge="SCOPE OF WORK"
          >
            <h2 className="font-heading text-xl font-bold text-white mb-4">
              Key Engineering Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-sm">
              {service.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                >
                  <i className="fa-solid fa-circle-check text-blue-500 mt-1 shrink-0 text-xs"></i>
                  <span className="text-slate-300 leading-relaxed">{cap}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

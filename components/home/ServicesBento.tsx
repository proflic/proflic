"use client";

import React, { useState } from "react";
import {
  servicesData,
  serviceFilters,
  serviceSpecsData,
  ServiceItem,
} from "@/data/servicesData";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";

interface ServicesBentoProps {
  onSelectServiceForInquiry?: (serviceKey: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectServiceForInquiry }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalKey, setModalKey] = useState<string | null>(null);

  const filteredServices = servicesData.filter(
    (s) => activeFilter === "all" || s.category === activeFilter
  );

  const handleOpenModal = (key: string) => {
    setModalKey(key);
  };

  const handleCloseModal = () => {
    setModalKey(null);
  };

  const handleRequestQuote = (key: string) => {
    handleCloseModal();
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(key);
    } else {
      const formService = document.getElementById("formService") as HTMLSelectElement | null;
      const calcService = document.getElementById("calcService") as HTMLSelectElement | null;
      if (formService) formService.value = key;
      if (calcService) calcService.value = key;
      const contactSection = document.getElementById("estimator");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderServiceVisual = (service: ServiceItem) => {
    switch (service.visualType) {
      case "faro_arm":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 200 60" fill="none">
              <circle cx="30" cy="48" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
              <circle cx="30" cy="48" r="2.5" fill="currentColor" />
              <line x1="30" y1="48" x2="75" y2="18" stroke="#0052FF" strokeWidth="2" />
              <circle cx="75" cy="18" r="4" fill="#080E1A" stroke="#0052FF" strokeWidth="1.5" />
              <line x1="75" y1="18" x2="135" y2="35" stroke="#0052FF" strokeWidth="1.8" />
              <circle cx="135" cy="35" r="3.5" fill="#080E1A" stroke="#0052FF" strokeWidth="1.5" />
              <line x1="135" y1="35" x2="165" y2="48" stroke="#00C8FF" strokeWidth="1.5" />
              <circle cx="165" cy="48" r="3" fill="#DC2626" />
              <text x="80" y="55" fill="#64748B" fontFamily="JetBrains Mono" fontSize="8">
                7-AXIS ARTICULATION ARM
              </text>
            </svg>
          </div>
        );
      case "blue_laser":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 200 60" fill="none">
              <path d="M 20,45 Q 60,15 100,40 T 180,28" stroke="rgba(0, 82, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
              <polygon points="100,8 75,45 125,45" fill="rgba(0, 82, 255, 0.1)" stroke="rgba(0, 82, 255, 0.5)" strokeWidth="1" />
              <line x1="70" y1="45" x2="130" y2="45" stroke="#00C8FF" strokeWidth="1.8" />
              <circle cx="75" cy="44" r="1.5" fill="#10B981" />
              <circle cx="92" cy="40" r="1.5" fill="#00C8FF" />
              <circle cx="110" cy="41" r="1.5" fill="#10B981" />
              <text x="45" y="56" fill="#64748B" fontFamily="JetBrains Mono" fontSize="8">
                BLUE LASER • 2,000,000 PTS/SEC
              </text>
            </svg>
          </div>
        );
      case "pcdmis_code":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] p-2.5 font-mono text-[9px] text-[var(--text-muted)] overflow-hidden flex flex-col justify-center">
            <div className="text-blue-400 font-bold mb-0.5">// PC-DMIS ROUTINE</div>
            <div className="text-emerald-400">F(CIR1) = FEAT/CIRCLE,CART,0,0,0,0,0,1,28.00</div>
            <div className="text-[var(--text-muted)]">MEAS/CIRCLE,CIR1,4 $ TOUCH 4-HITS</div>
            <div className="text-cyan-400">GOTO/125.483, 48.201, +40.000</div>
          </div>
        );
      case "reverse_cad":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 200 60" fill="none">
              <polygon points="25,45 45,18 55,50" stroke="#0052FF" strokeWidth="1.2" fill="rgba(0, 82, 255, 0.1)" />
              <polygon points="45,18 75,22 55,50" stroke="#00C8FF" strokeWidth="1.2" fill="rgba(0, 200, 255, 0.1)" />
              <line x1="94" y1="35" x2="114" y2="35" stroke="#0052FF" strokeWidth="1.8" />
              <polygon points="114,31 122,35 114,39" fill="#0052FF" />
              <rect x="130" y="18" width="42" height="30" rx="3" stroke="#00C8FF" strokeWidth="1.5" fill="rgba(0, 200, 255, 0.1)" />
              <text x="45" y="56" fill="#64748B" fontFamily="JetBrains Mono" fontSize="8">
                MESH &gt;&gt; PARAMETRIC STEP/NX
              </text>
            </svg>
          </div>
        );
      case "gdt_frame":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] p-2 flex flex-col items-center justify-center gap-1 font-mono">
            <div className="text-[8px] text-[var(--text-dim)] uppercase tracking-wider">
              ASME Y14.5 FEATURE CONTROL
            </div>
            <div className="gdt-frame text-white text-[9px]">
              <div className="gdt-cell text-blue-400 text-xs">⌖</div>
              <div className="gdt-cell">Ø 0.025 Ⓜ</div>
              <div className="gdt-cell">A</div>
              <div className="gdt-cell">B Ⓜ</div>
              <div className="gdt-cell">C</div>
            </div>
          </div>
        );
      case "cad_fixture":
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 200 60" fill="none">
              <rect x="30" y="36" width="140" height="14" rx="2" stroke="#0052FF" strokeWidth="1.5" fill="rgba(0, 82, 255, 0.1)" />
              <rect x="50" y="20" width="30" height="16" rx="2" stroke="#00C8FF" strokeWidth="1.2" fill="rgba(0, 200, 255, 0.15)" />
              <circle cx="65" cy="28" r="4" stroke="#10B981" strokeWidth="1.2" />
              <rect x="120" y="24" width="30" height="12" rx="2" stroke="#00C8FF" strokeWidth="1.2" fill="rgba(0, 200, 255, 0.15)" />
              <line x1="40" y1="43" x2="40" y2="43.01" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" />
              <line x1="160" y1="43" x2="160" y2="43.01" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" />
              <text x="45" y="56" fill="#64748B" fontFamily="JetBrains Mono" fontSize="8">
                2D DRAFTING • 3D CAD MODELLING
              </text>
            </svg>
          </div>
        );
      case "collision_avoidance":
      default:
        return (
          <div className="h-20 w-full mb-5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)] flex items-center justify-center p-2 overflow-hidden">
            <svg className="w-full h-full text-blue-500" viewBox="0 0 200 60" fill="none">
              <line x1="15" y1="15" x2="185" y2="15" stroke="#0052FF" strokeWidth="1" strokeDasharray="3,3" />
              <text x="20" y="12" fill="#0052FF" fontFamily="JetBrains Mono" fontSize="7">
                +Z CLEARANCE PLANE
              </text>
              <rect x="75" y="32" width="50" height="20" stroke="#64748B" strokeWidth="1.2" fill="rgba(15, 29, 56, 0.4)" />
              <path d="M 25,15 L 55,15 L 68,26 L 75,32" stroke="#10B981" strokeWidth="1.5" />
              <circle cx="75" cy="32" r="2.5" fill="#DC2626" />
              <text x="42" y="55" fill="#64748B" fontFamily="JetBrains Mono" fontSize="8">
                COLLISION AVOIDANCE PATH
              </text>
            </svg>
          </div>
        );
    }
  };

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-2">
              PRECISION METROLOGY &amp; INSPECTION
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-3">
              CMM Inspection &amp; Metrology Services
            </h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed font-sans">
              Turnkey on-site CMM inspection, high-speed 3D blue-laser scanning, scan-to-CAD reverse engineering,
              and offline CMM programming support across Maharashtra.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("inspection")}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                activeFilter === "inspection"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Inspection
            </button>
            <button
              onClick={() => setActiveFilter("programming")}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                activeFilter === "programming"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              CMM Scripting
            </button>
            <button
              onClick={() => setActiveFilter("cad")}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                activeFilter === "cad"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              CAD / Reverse
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card metrology-panel metrology-panel-hover p-6 flex flex-col justify-between rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
              data-category={service.category}
            >
              <div>
                {renderServiceVisual(service)}
                <h3 className="font-heading text-lg font-bold text-[var(--text-main)] mb-2">
                  {service.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 font-sans font-normal">
                  {service.description}
                </p>
              </div>
              <button
                onClick={() => handleOpenModal(service.id)}
                className="open-spec-btn text-sm font-heading font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1.5 transition-colors pt-2 border-t border-[var(--border-subtle)]"
                data-service-key={service.id}
              >
                <span>Explore Service</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Detail Modal */}
      <ServiceDetailModal
        isOpen={modalKey !== null}
        spec={modalKey ? serviceSpecsData[modalKey] || null : null}
        serviceKey={modalKey || ""}
        onClose={handleCloseModal}
        onRequestQuote={handleRequestQuote}
      />
    </section>
  );
};

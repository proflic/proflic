"use client";

import React, { useEffect } from "react";
import { ServiceSpec } from "@/data/servicesData";

interface ServiceDetailModalProps {
  isOpen: boolean;
  spec: ServiceSpec | null;
  serviceKey: string;
  onClose: () => void;
  onRequestQuote: (serviceKey: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  spec,
  serviceKey,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !spec) return null;

  return (
    <div
      id="serviceDetailModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        id="modalBackdrop"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="metrology-panel max-w-xl w-full p-6 sm:p-8 border border-slate-700 relative z-10 max-h-[90vh] overflow-y-auto">
        <button
          id="modalCloseBtn"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 text-base focus:outline-none"
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div
          className="text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-1 font-semibold"
          id="modalCategory"
        >
          {spec.category}
        </div>
        <h3 id="modalTitle" className="font-heading text-2xl font-bold text-white mb-4">
          {spec.title}
        </h3>

        <div className="space-y-4 font-mono text-xs mb-6">
          <p
            id="modalOverview"
            className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base"
          >
            {spec.overview}
          </p>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
              EQUIPMENT &amp; OPTICS:
            </div>
            <div id="modalEquipment" className="text-white font-semibold mt-0.5">
              {spec.equipment}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
              SUPPORTED STANDARDS:
            </div>
            <div id="modalStandards" className="text-white font-semibold mt-0.5">
              {spec.standards}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase mb-2 font-semibold tracking-wider">
              KEY CAPABILITIES:
            </div>
            <ul id="modalCapabilities" className="space-y-2 text-slate-300 font-sans">
              {spec.capabilities.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-check text-blue-500 mt-1 shrink-0 text-xs"></i>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
              DELIVERABLES:
            </div>
            <div id="modalDeliverables" className="text-emerald-400 font-semibold mt-0.5">
              {spec.deliverables}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-heading font-medium text-sm text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            id="modalQuoteBtn"
            onClick={() => onRequestQuote(serviceKey)}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-sm transition-all"
          >
            Request Quote for This Service
          </button>
        </div>
      </div>
    </div>
  );
};

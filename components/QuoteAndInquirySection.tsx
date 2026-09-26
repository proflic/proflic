"use client";

import React, { useState } from "react";
import { Estimator } from "./Estimator";
import { EngineeringInquiry } from "./EngineeringInquiry";

interface QuoteAndInquirySectionProps {
  onShowToast: (title: string, desc: string, isSuccess: boolean) => void;
  selectedService?: string;
}

export const QuoteAndInquirySection: React.FC<QuoteAndInquirySectionProps> = ({
  onShowToast,
  selectedService,
}) => {
  const [inquiryData, setInquiryData] = useState<{
    service: string;
    complexity: string;
    quantity: number;
    software: string;
    message?: string;
  } | undefined>(undefined);

  const handleTransfer = (data: {
    service: string;
    serviceText: string;
    complexity: string;
    complexityText: string;
    quantity: number;
    software: string;
  }) => {
    const formattedMessage = `[ENGINEERING INQUIRY PARAMETERS]
• Selected Service: ${data.serviceText}
• Part Complexity: ${data.complexityText}
• Estimated Batch: ${data.quantity} Unit(s)
• Preferred Software / Platform: ${data.software}
• GD&T Framework: ASME Y14.5 / ISO 1101 Standard

Please review our CAD / drawing specifications and advise engineer availability.`;

    setInquiryData({
      service: data.service,
      complexity: data.complexity,
      quantity: data.quantity,
      software: data.software,
      message: formattedMessage,
    });

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="estimator"
      className="pt-12 pb-20 sm:pt-14 sm:pb-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Estimator (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <Estimator
              onTransfer={handleTransfer}
              selectedService={selectedService}
            />
          </div>

          {/* Right: Engineering Inquiry (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <EngineeringInquiry
              initialValues={inquiryData}
              onShowToast={onShowToast}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

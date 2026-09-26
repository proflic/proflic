"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteMetadata } from "@/data/siteData";
import { serviceOptions, complexityOptions } from "@/data/estimatorData";

interface EngineeringInquiryProps {
  initialValues?: {
    service: string;
    complexity: string;
    quantity: number;
    software: string;
    message?: string;
  };
  onShowToast: (title: string, desc: string, isSuccess: boolean) => void;
}

export const EngineeringInquiry: React.FC<EngineeringInquiryProps> = ({
  initialValues,
  onShowToast,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("scanning");
  const [complexity, setComplexity] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [software, setSoftware] = useState("PC-DMIS");
  const [message, setMessage] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [showStatus, setShowStatus] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [gmailUrl, setGmailUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [fullEmailBody, setFullEmailBody] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialValues) {
      if (initialValues.service) setService(initialValues.service);
      if (initialValues.complexity) setComplexity(initialValues.complexity);
      if (initialValues.quantity) setQuantity(initialValues.quantity);
      if (initialValues.software) setSoftware(initialValues.software);
      if (initialValues.message) setMessage(initialValues.message);

      if (containerRef.current) {
        containerRef.current.classList.add("ring-2", "ring-blue-500");
        setTimeout(() => {
          containerRef.current?.classList.remove("ring-2", "ring-blue-500");
        }, 2200);
      }
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: boolean } = {};
    if (!name.trim()) errors.name = true;
    if (!company.trim()) errors.company = true;
    if (!email.trim()) errors.email = true;
    if (!message.trim()) errors.message = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      errors.email = true;
      setFormErrors(errors);
      onShowToast("Invalid Email", "Please enter a valid email address.", false);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      onShowToast("Validation Error", "Please complete all required fields.", false);
      return;
    }

    setFormErrors({});

    const serviceObj = serviceOptions.find((s) => s.value === service);
    const complexityObj = complexityOptions.find((c) => c.value === complexity);
    const serviceText = serviceObj ? serviceObj.label : service;
    const complexityText = complexityObj ? complexityObj.label : complexity;
    const phoneVal = phone.trim() ? phone.trim() : "Not Provided";

    const emailBody = `PROFLIC TECHNOLOGIES
ENGINEERING INQUIRY

CONTACT DETAILS
Name: ${name.trim()}
Company: ${company.trim()}
Email: ${email.trim()}
Phone: ${phoneVal}

PROJECT REQUIREMENTS
Service: ${serviceText}
Complexity: ${complexityText}
Quantity: ${quantity}
Platform: ${software}

PROJECT DETAILS / TOLERANCE SPECIFICATIONS
${message.trim()}`;

    setFullEmailBody(emailBody);

    const recipient = siteMetadata.email;
    const subject = "Engineering Inquiry — PROFLIC Technologies";
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    const whatsappLink = `https://wa.me/${siteMetadata.whatsappNumber}?text=${encodeURIComponent(
      `*PROFLIC Engineering Inquiry*\n\n${emailBody}`
    )}`;

    setMailtoUrl(mailtoLink);
    setGmailUrl(gmailLink);
    setWhatsappUrl(whatsappLink);
    setShowStatus(true);

    try {
      const mailtoAnchor = document.createElement("a");
      mailtoAnchor.href = mailtoLink;
      document.body.appendChild(mailtoAnchor);
      mailtoAnchor.click();
      document.body.removeChild(mailtoAnchor);
    } catch {
      window.location.href = mailtoLink;
    }

    onShowToast(
      "Inquiry Prepared",
      "Your inquiry has been prepared in your email app. Please review and send it to PROFLIC Technologies.",
      true
    );
  };

  const handleCopyDetails = async () => {
    const recipient = siteMetadata.email;
    const subject = "Engineering Inquiry — PROFLIC Technologies";
    const clipboardContent = `To: ${recipient}
Subject: ${subject}

${fullEmailBody}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(clipboardContent);
      } else {
        const ta = document.createElement("textarea");
        ta.value = clipboardContent;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      onShowToast(
        "Ready to Direct Paste!",
        "Inquiry copied. Press Ctrl + V to paste directly into Gmail, WhatsApp, or any app.",
        true
      );
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch {
      onShowToast("Copy Failed", "Please manually select and copy your text.", false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="contact"
      className="metrology-panel p-6 sm:p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] scroll-mt-24 transition-all duration-300"
    >
      <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 uppercase mb-2">
        ENGINEERING INQUIRY
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-2">
        Have a Measurement Challenge?
      </h2>
      <p className="text-[var(--text-muted)] text-sm mb-6 font-sans leading-relaxed">
        Talk directly with the PROFLIC engineering team. Submit drawing details or request mobile
        on-site dispatch.
      </p>

      {/* Contact Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
        <a
          href={`tel:${siteMetadata.phoneTel}`}
          className="p-3.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] hover:border-blue-500/50 transition-colors flex items-center gap-3 min-h-[52px]"
        >
          <i className="fa-solid fa-phone text-blue-500 text-sm"></i>
          <div>
            <span className="text-[10px] text-[var(--text-dim)] block font-semibold tracking-wider">
              CALL ENGINEERING
            </span>
            <span className="text-[var(--text-main)] font-bold text-sm">{siteMetadata.phone}</span>
          </div>
        </a>
        <a
          href={`mailto:${siteMetadata.email}`}
          className="p-3.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] hover:border-blue-500/50 transition-colors flex items-center gap-3 min-h-[52px]"
        >
          <i className="fa-solid fa-envelope text-blue-500 text-sm"></i>
          <div>
            <span className="text-[10px] text-[var(--text-dim)] block font-semibold tracking-wider">
              EMAIL INQUIRIES
            </span>
            <span className="text-[var(--text-main)] font-bold text-sm truncate max-w-[180px] sm:max-w-none block">
              {siteMetadata.email}
            </span>
          </div>
        </a>
      </div>

      {/* Formal Form */}
      <form id="inquiryForm" className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="formName"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="formName"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (formErrors.name) setFormErrors({ ...formErrors, name: false });
              }}
              className={`w-full bg-[var(--bg-input)] border rounded-lg p-2.5 text-xs text-[var(--text-main)] font-sans focus:border-blue-500 focus:outline-none min-h-[44px] ${
                formErrors.name ? "border-red-500" : "border-[var(--border-subtle)]"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="formCompany"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Company *
            </label>
            <input
              type="text"
              id="formCompany"
              required
              placeholder="Precision Mfg Inc."
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (formErrors.company) setFormErrors({ ...formErrors, company: false });
              }}
              className={`w-full bg-[var(--bg-input)] border rounded-lg p-2.5 text-xs text-[var(--text-main)] font-sans focus:border-blue-500 focus:outline-none min-h-[44px] ${
                formErrors.company ? "border-red-500" : "border-[var(--border-subtle)]"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="formEmail"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="formEmail"
              required
              placeholder="engineer@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) setFormErrors({ ...formErrors, email: false });
              }}
              className={`w-full bg-[var(--bg-input)] border rounded-lg p-2.5 text-xs text-[var(--text-main)] font-sans focus:border-blue-500 focus:outline-none min-h-[44px] ${
                formErrors.email ? "border-red-500" : "border-[var(--border-subtle)]"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="formPhone"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="formPhone"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-sans focus:border-blue-500 focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div>
            <label
              htmlFor="formService"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Service
            </label>
            <select
              id="formService"
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
          <div>
            <label
              htmlFor="formComplexity"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Complexity
            </label>
            <select
              id="formComplexity"
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
              htmlFor="formQuantity"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Qty
            </label>
            <input
              type="number"
              id="formQuantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-mono focus:border-blue-500 focus:outline-none min-h-[44px]"
            />
          </div>
          <div>
            <label
              htmlFor="formSoftware"
              className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
            >
              Platform
            </label>
            <select
              id="formSoftware"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-main)] font-mono focus:border-blue-500 focus:outline-none min-h-[44px]"
            >
              <option value="PC-DMIS" className="bg-[var(--bg-surface)] text-[var(--text-main)]">PC-DMIS</option>
              <option value="PolyWorks" className="bg-[var(--bg-surface)] text-[var(--text-main)]">PolyWorks</option>
              <option value="N/A" className="bg-[var(--bg-surface)] text-[var(--text-main)]">N/A</option>
              <option value="Other" className="bg-[var(--bg-surface)] text-[var(--text-main)]">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="formMessage"
            className="block text-xs font-sans font-semibold text-[var(--text-main)] mb-1 tracking-wide uppercase"
          >
            Project Details / Tolerance Specifications *
          </label>
          <textarea
            id="formMessage"
            rows={3}
            required
            placeholder="Describe requirements, blueprint tolerances (e.g. ASME Y14.5), CAD format, or location for on-site dispatch..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (formErrors.message) setFormErrors({ ...formErrors, message: false });
            }}
            className={`w-full bg-[var(--bg-input)] border rounded-lg p-2.5 text-xs text-[var(--text-main)] font-sans focus:border-blue-500 focus:outline-none min-h-[80px] ${
              formErrors.message ? "border-red-500" : "border-[var(--border-subtle)]"
            }`}
          />
        </div>

        {/* Mailto Confirmation & Fallback Status */}
        {showStatus && (
          <div
            id="formStatus"
            className="p-4 rounded-lg border border-blue-500/30 bg-slate-900/80 font-sans text-xs sm:text-sm text-slate-300 space-y-3"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-2.5">
              <i className="fa-solid fa-circle-check text-emerald-400 text-base shrink-0 mt-0.5"></i>
              <div className="space-y-1">
                <div className="font-heading font-semibold text-white text-sm">
                  Inquiry Prepared in Your Email App
                </div>
                <p id="formStatusDesc" className="text-slate-300 leading-relaxed text-xs">
                  Please review and click <strong>Send</strong> in your email client to dispatch to
                  PROFLIC Technologies.
                </p>
              </div>
            </div>

            {/* Actionable Fallback Options */}
            <div className="pt-2.5 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 font-semibold">
                <i className="fa-solid fa-triangle-exclamation text-xs"></i>
                <span>Email client didn&apos;t open or data wasn&apos;t sent?</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  id="formStatusGmailLink"
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center gap-1.5 transition-colors min-h-[38px]"
                >
                  <i className="fa-brands fa-google text-xs"></i>
                  <span>Open in Gmail</span>
                </a>
                <a
                  id="formStatusWhatsAppLink"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition-colors min-h-[38px]"
                >
                  <i className="fa-brands fa-whatsapp text-xs"></i>
                  <span>Send via WhatsApp</span>
                </a>
                <button
                  type="button"
                  id="formCopyDataBtn"
                  onClick={handleCopyDetails}
                  className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors min-h-[38px]"
                >
                  <i className="fa-solid fa-copy text-xs"></i>
                  <span id="formCopyDataText">
                    {copied ? "Copied to Clipboard!" : "Copy Details"}
                  </span>
                </button>
                <a
                  id="formStatusMailLink"
                  href={mailtoUrl}
                  className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors min-h-[38px]"
                >
                  <i className="fa-solid fa-envelope text-xs"></i>
                  <span>Retry Email</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          id="submitQuoteBtn"
          className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-sm transition-all shadow-sm min-h-[44px]"
        >
          Request Engineering Quote
        </button>

        <p className="text-[11px] font-mono text-slate-400 text-center flex items-center justify-center gap-1.5 pt-0.5 leading-relaxed">
          <i className="fa-solid fa-circle-info text-blue-400 text-xs shrink-0"></i>
          <span>
            Note: Reach us directly at{" "}
            <a href={`mailto:${siteMetadata.email}`} className="text-blue-400 hover:underline">
              {siteMetadata.email}
            </a>{" "}
            or{" "}
            <a
              href={`https://wa.me/${siteMetadata.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              WhatsApp (+91 84597 06344)
            </a>
            .
          </span>
        </p>
      </form>
    </div>
  );
};

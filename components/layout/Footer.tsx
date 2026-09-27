"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { mainNavLinks, siteMetadata } from "@/data/siteData";
import { servicesData } from "@/data/servicesData";

export const Footer: React.FC = () => {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-[var(--border-subtle)] py-14 bg-[var(--bg-card)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#hero" className="inline-block" aria-label="PROFLIC Technologies Home">
              <Image
                src="/assets/logo.png"
                alt="PROFLIC Technologies Logo - Trusted in Every Measurement"
                width={160}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </a>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p className="text-xs font-mono text-blue-500 font-semibold tracking-wider uppercase">
                TRUSTED IN EVERY MEASUREMENT
              </p>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm font-sans">
              We reveal the invisible, measuring everything in microns. On-site CMM inspection,
              CMM programming support, 3D laser scanning, and dimensional quality verification across
              Chhatrapati Sambhajinagar and Maharashtra.
            </p>
            <div className="text-xs font-mono text-[var(--text-dim)] flex items-center gap-2 pt-1">
              <i className="fa-solid fa-clock text-blue-500 text-[11px]"></i>
              <span>{siteMetadata.rapidDispatch}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <div className="font-heading text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-3.5">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[var(--text-muted)]">
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[var(--text-main)] hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2">
            <div className="font-heading text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-3.5">
              Services
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-[var(--text-muted)]">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-[var(--text-main)] hover:translate-x-0.5 transition-all inline-block leading-snug"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="lg:col-span-3">
            <div className="font-heading text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-3.5">
              Contact
            </div>
            <div className="space-y-3 text-xs sm:text-sm font-sans text-[var(--text-muted)] mb-4">
              <div>
                <a
                  href={`tel:${siteMetadata.phoneTel}`}
                  className="hover:text-blue-500 transition-colors flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
                >
                  <i className="fa-solid fa-phone text-xs text-blue-500 shrink-0"></i>
                  <span>{siteMetadata.phone}</span>
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${siteMetadata.email}`}
                  className="hover:text-blue-500 transition-colors flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] break-all"
                >
                  <i className="fa-solid fa-envelope text-xs text-blue-500 shrink-0"></i>
                  <span>{siteMetadata.email}</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.proflic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
                >
                  <i className="fa-solid fa-globe text-xs text-blue-500 shrink-0"></i>
                  <span>proflic.in</span>
                </a>
              </div>
              <div className="flex items-start gap-2 text-xs pt-1 leading-relaxed text-[var(--text-dim)]">
                <i className="fa-solid fa-location-dot text-xs text-blue-500 shrink-0 mt-0.5"></i>
                <span>{siteMetadata.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[var(--text-dim)] gap-3">
          <div>
            © <span>{year}</span> PROFLIC Technologies. All Rights Reserved.
          </div>
          <div className="text-[11px] text-[var(--text-dim)] font-mono text-center sm:text-right">
            Standards presented reflect engineering frameworks supported in client workflows.
          </div>
        </div>
      </div>
    </footer>
  );
};

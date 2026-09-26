"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { navLinks, siteMetadata } from "@/data/siteData";
import { useTheme } from "@/components/ThemeContext";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll state and section spying
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "services", "simulation", "software", "estimator"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="siteHeader"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-sm py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Precision Tag */}
        <div className="flex items-center gap-3.5">
          <a
            href="#hero"
            className="flex items-center group focus:outline-none"
            aria-label="PROFLIC Technologies Home"
          >
            <Image
              src="/assets/logo.png"
              alt="Proflic Technologies Logo"
              width={160}
              height={36}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[var(--border-subtle)] text-[10px] font-mono font-medium text-[var(--text-dim)] tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PROFLIC.IN • METROLOGY LAB</span>
          </div>
        </div>

        {/* Desktop Navigation Links with Active Indicator */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 backdrop-blur-md shadow-sm"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-subtle)]/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Phone Call Pill */}
          <a
            href={`tel:${siteMetadata.phoneTel}`}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-blue-500/50 shadow-sm"
            title="Call PROFLIC Engineering Team"
          >
            <i className="fa-solid fa-phone text-xs text-blue-500"></i>
            <span>Call</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-blue-500/50 transition-all focus:outline-none min-w-[36px] min-h-[36px] flex items-center justify-center shadow-sm"
            aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            title="Toggle Theme"
          >
            <i
              className={`text-sm transition-transform duration-300 ${
                theme === "light"
                  ? "fa-solid fa-moon text-indigo-500 rotate-0"
                  : "fa-solid fa-sun text-amber-400 rotate-90"
              }`}
            ></i>
          </button>

          {/* Primary Request Quote CTA */}
          <a
            href="#estimator"
            className="px-5 py-2.5 rounded-lg font-heading font-semibold text-xs tracking-wide uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-sm hover:shadow-blue-500/20 active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Request Quote</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)] min-w-[40px] min-h-[40px] flex items-center justify-center shadow-sm"
            aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            <i
              className={`text-sm ${
                theme === "light"
                  ? "fa-solid fa-moon text-indigo-500"
                  : "fa-solid fa-sun text-amber-400"
              }`}
            ></i>
          </button>
          <button
            id="mobileMenuBtn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-lg focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center shadow-sm"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <i
              id="mobileMenuIcon"
              className={`text-base ${
                mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="lg:hidden mx-4 mt-3 p-4 border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-2xl rounded-2xl shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`py-2.5 px-3.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-subtle)]/40"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <i className="fa-solid fa-circle-check text-xs text-white"></i>}
              </a>
            );
          })}
          <div className="pt-3 mt-1 border-t border-[var(--border-subtle)] flex flex-col gap-2.5">
            <a
              href={`tel:${siteMetadata.phoneTel}`}
              className="py-3 text-center bg-[var(--bg-app)] text-[var(--text-main)] font-mono text-xs rounded-xl flex items-center justify-center gap-2 border border-[var(--border-subtle)]"
            >
              <i className="fa-solid fa-phone text-xs text-blue-500"></i> Call {siteMetadata.phone}
            </a>
            <a
              href="#estimator"
              onClick={closeMobileMenu}
              className="py-3 text-center bg-blue-600 text-white font-heading font-semibold text-sm rounded-xl shadow-sm hover:bg-blue-500 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

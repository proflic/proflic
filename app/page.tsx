"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBento } from "@/components/home/HeroBento";
import { AboutBento } from "@/components/home/AboutBento";
import { ServicesBento } from "@/components/home/ServicesBento";
import { SimulatorBento } from "@/components/home/SimulatorBento";
import { SoftwareBento } from "@/components/home/SoftwareBento";
import { QuoteAndInquirySection } from "@/components/QuoteAndInquirySection";
import { HomeCtaBento } from "@/components/home/HomeCtaBento";
import { Footer } from "@/components/layout/Footer";
import { Toast, ToastState } from "@/components/Toast";

export default function Home() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: "",
    desc: "",
    isSuccess: true,
  });

  const showToast = (title: string, desc: string, isSuccess = true) => {
    const refId = `PRF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setToast({
      show: true,
      title,
      desc,
      isSuccess,
      refId,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5500);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Bento Hero Section */}
        <HeroBento />

        {/* 2. Bento About & Live CAD Viewport */}
        <AboutBento />

        {/* 3. Bento Services Section */}
        <ServicesBento />

        {/* 4. Interactive 3D CMM & Laser Scan Simulator */}
        <SimulatorBento />

        {/* 5. Software Platforms Bento */}
        <SoftwareBento />

        {/* 6. Integrated Quote Estimator & Engineering Inquiry Bento Section */}
        <QuoteAndInquirySection onShowToast={showToast} />

        {/* 7. Final Call to Action */}
        <HomeCtaBento />
      </main>

      <Footer />
      <Toast toast={toast} />
    </>
  );
}

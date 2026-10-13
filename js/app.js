/**
 * PROFLIC TECHNOLOGIES — INDUSTRIAL METROLOGY CLIENT ENGINE
 * Architecture: Vanilla JavaScript (ES6+), Modular, Accessible (WCAG 2.2 AA)
 * Brand: PROFLIC Technologies (proflic.in) • Chhatrapati Sambhajinagar, Maharashtra
 * Verified Phone: +91 84597 06344 • Verified Email: proflic.tech@gmail.com
 */

(function () {
  "use strict";

  // --- 1. Service Technical Specifications Dataset ---
  const servicesSpecs = {
    portable: {
      title: "On-Site Portable CMM Inspection (7-Axis Articulated Arm)",
      eyebrow: "Mobile On-Site Probing • Maharashtra",
      overview: "Direct on-site mobile coordinate measurement using high-precision 7-axis articulated arms. Deployed directly to machining shop floors, toolrooms, and press shops across Chhatrapati Sambhajinagar, Waluj, Chikalthana, Shendra, and Pune. Enables in-situ inspection on CNC beds before unclamping, eliminating setup downtime and transit risks.",
      specs: [
        { label: "Arm Architecture", value: "7-Axis High-Accuracy Articulated Measuring Arm" },
        { label: "Measurement Volume", value: "Up to 2.5 m - 3.5 m Spherical Working Envelope" },
        { label: "Probing Systems", value: "Kinematic Touch-Trigger & Hard Carbide Styli" },
        { label: "Inspection Environment", value: "In-Situ Machine Beds, Welding Fixtures & Toolrooms" },
        { label: "Response Coverage", value: "Chhatrapati Sambhajinagar, Pune & Maharashtra Industrial Belts" },
        { label: "Traceability", value: "ISO 10360-12 Articulated Arm Standard Calibration" }
      ],
      deliverables: [
        "In-situ CNC bedplate machining verification reports",
        "ASME Y14.5 Geometric Dimensioning & Tolerancing (GD&T) evaluation",
        "Machining datum qualification and alignment verification",
        "Signed on-floor inspection sign-off sheets"
      ]
    },
    laser: {
      title: "3D Blue Laser Scanning & Optical Surface Inspection",
      eyebrow: "High-Density Optical Metrology • 2,000,000 Pts / Sec",
      overview: "High-density blue laser optical scanning for non-contact measurement of complex contours, sheet metal stamping dies, injection mold cavities, and turbine components. Rapidly generates complete 3D surface deviation colormaps against nominal CAD models.",
      specs: [
        { label: "Acquisition Speed", value: "Up to 2,000,000 measurements / second" },
        { label: "Optical Resolution", value: "Down to 0.020 mm point grid density" },
        { label: "Light Source", value: "Narrowband Blue Laser Cross-Line Optics" },
        { label: "Software Systems", value: "PolyWorks|Inspector™ & GOM Inspect Pro" },
        { label: "Standard", value: "VDI/VDE 2634 Part 2/3 Optical Metrology Standard" },
        { label: "Deliverable Formats", value: "Cleaned STL Mesh, OBJ, Raw Point Clouds (.pts, .asc)" }
      ],
      deliverables: [
        "Full 3D surface color deviation maps (CAD vs. actual part)",
        "Cross-sectional inspection & wall-thickness analysis",
        "High-density polygonal STL mesh models for tooling modification",
        "Comprehensive dimensional inspection dossier"
      ]
    },
    reverse: {
      title: "Scan-to-CAD Reverse Engineering & Surface Reconstruction",
      eyebrow: "Parametric 3D Solid & Surface Modeling",
      overview: "Transforming dense physical scan meshes into production-grade parametric 3D CAD solid models. Essential for reproducing worn stamping dies, legacy components without engineering drawings, casting patterns, and complex mold tooling.",
      specs: [
        { label: "Target CAD Platforms", value: "SolidWorks • Siemens NX • PTC Creo • CATIA V5" },
        { label: "Surface Geometry", value: "Class-A Continuous NURBS & Parametric Solids" },
        { label: "Exchange Formats", value: "STEP AP242 / AP214, IGES 5.3, Parasolid (.x_t)" },
        { label: "Parametric Fidelity", value: "Fully constrained sketches & editable feature trees" },
        { label: "Tooling Compensation", value: "Wear healing & nominal design reconstruction" },
        { label: "Drafting Standard", value: "2D Production Prints compliant with ASME Y14.5" }
      ],
      deliverables: [
        "Fully editable parametric 3D CAD files (.sldprt, .prt, .step)",
        "Neutral STEP and IGES surface and solid geometries",
        "CAD-to-scan deviation verification reports",
        "2D manufacturing blueprint drawings with complete datum schemes"
      ]
    },
    cmm: {
      title: "Bridge Coordinate Measuring Machine (CMM) Probing",
      eyebrow: "Laboratory Sub-Micron Probing • < 0.001 mm",
      overview: "Certified sub-micron coordinate measurement inside our climate-controlled metrology laboratory. Specialized for precision CNC machined housings, automotive powertrain components, transmission casings, and aerospace blisks requiring strict dimensional verification.",
      specs: [
        { label: "Measurement Volumetric Uncertainty", value: "E0,MPE = 1.5 + L/350 µm (< 0.001 mm)" },
        { label: "Probing Repeatability", value: "0.8 µm Single-Point Repeatability" },
        { label: "Probe Heads", value: "Renishaw Motorized Indexing PH10M / TP20 Stylus" },
        { label: "Software Systems", value: "Zeiss CALYPSO • Hexagon PC-DMIS CAD++" },
        { label: "Controlled Environment", value: "Temperature-Stabilized Metrology Lab (20°C ± 0.5°C)" },
        { label: "Calibration Standard", value: "NABL & ISO 10360-2 Traceable Reference Standards" }
      ],
      deliverables: [
        "Certified First Article Inspection Reports (AS9102 / PPAP Level 3)",
        "Complete GD&T feature control frame verification sheets",
        "Coordinate point deviation data logs (.csv, .xlsx, .pdf)",
        "Formal certificate of dimensional compliance"
      ]
    },
    programming: {
      title: "Offline CMM Programming & Probe Path Simulation",
      eyebrow: "PC-DMIS CAD++ • PolyWorks • Zeiss CALYPSO",
      overview: "Turnkey offline DCC probe path scripting and collision-free clearance simulation. Allows manufacturing facilities to generate CMM inspection routines directly from 3D CAD before physical parts arrive, cutting shop floor CMM cycle times by up to 40%.",
      specs: [
        { label: "Supported Platforms", value: "Hexagon PC-DMIS CAD++, PolyWorks, Zeiss CALYPSO" },
        { label: "Probe Configuration", value: "Motorized indexing (PH10, PH20 5-axis) & stylus racks" },
        { label: "Datum Schemes", value: "Iterative, 3-2-1, and Best-Fit CAD datum alignments" },
        { label: "Simulation", value: "Virtual probe clearance & collision avoidance check" },
        { label: "Cycle Optimization", value: "Optimized stylus index paths cutting runtime up to 40%" },
        { label: "Deliverables", value: "Ready-to-run .prg routines and operator setup sheets" }
      ],
      deliverables: [
        "Production-ready DCC inspection programs (.prg / .pwk)",
        "3D collision-free simulation verification records",
        "Operator probe setup & part clamping documentation",
        "Automated Excel / PDF quality report templates"
      ]
    },
    quality: {
      title: "Quality Documentation (FAIR AS9102 & AIAG PPAP Level 3)",
      eyebrow: "Third-Party Dimensional Quality Dossiers",
      overview: "Comprehensive third-party inspection documentation meeting aerospace and automotive compliance requirements. Producing certified AS9102 Rev B First Article Inspection Reports, AIAG PPAP Level 3 dimensional layouts, and Measurement Systems Analysis (Gauge R&R).",
      specs: [
        { label: "Aerospace Standard", value: "SAE AS9102 Rev B (Forms 1, 2, and 3)" },
        { label: "Automotive Standard", value: "AIAG PPAP Level 3 Dimensional Results" },
        { label: "Drawing Ballooning", value: "100% Characteristic Numbering on PDF Blueprints" },
        { label: "Statistical Tools", value: "Cp, Cpk, Pp, Ppk Process Capability Calculations" },
        { label: "Gauge Capability", value: "Gauge R&R (Repeatability & Reproducibility Analysis)" },
        { label: "Authority", value: "Independent Third-Party Senior Metrologist Sign-Off" }
      ],
      deliverables: [
        "Ballooned 2D engineering blueprints with serialized callouts",
        "Certified AS9102 Form 1, 2, 3 or PPAP Level 3 packages",
        "Raw CMM coordinate inspection logs and statistical summaries",
        "Official Certificate of Dimensional Conformity"
      ]
    }
  };

  // --- 2. Interactive Machine Console in Hero Stage ---
  // --- 2. Auto-Changing Hero Image Carousel (Slideshow) ---
  const heroSlides = [
    {
      image: "assets/hero_metrology_widescreen.jpg",
      alt: "PROFLIC Technologies Sub-Micron Bridge CMM Laboratory"
    },
    {
      image: "assets/portable_arm.jpg",
      alt: "On-Site Portable 7-Axis CMM Articulated Arm"
    },
    {
      image: "assets/laser_scan.jpg",
      alt: "3D Blue Laser Optical Scanning Inspection"
    }
  ];

  function initHeroCarousel() {
    const indicators = document.querySelectorAll(".hero-slide-indicator");
    const heroImg = document.getElementById("consoleStageImg");
    if (!heroImg || !indicators.length) return;

    // Preload all slides for zero-flicker transitions
    heroSlides.forEach(slide => {
      const preloadImg = new Image();
      preloadImg.src = slide.image;
    });

    let currentIndex = 0;
    let autoTimer = null;
    const SLIDE_DURATION = 5000; // 5 seconds per slide

    function restartProgressBar(btn) {
      const prog = btn ? btn.querySelector(".slide-indicator-progress") : null;
      if (prog) {
        prog.style.animation = "none";
        void prog.offsetWidth; // trigger reflow
        prog.style.animation = `slideProgressFill ${SLIDE_DURATION}ms linear forwards`;
      }
    }

    function goToSlide(index) {
      currentIndex = (index + heroSlides.length) % heroSlides.length;
      const slide = heroSlides[currentIndex];

      // Update indicator buttons
      indicators.forEach((btn, idx) => {
        const isActive = idx === currentIndex;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");

        const prog = btn.querySelector(".slide-indicator-progress");
        if (prog) {
          if (isActive) {
            restartProgressBar(btn);
          } else {
            prog.style.animation = "none";
            prog.style.width = "0%";
          }
        }
      });

      // Smooth crossfade image
      heroImg.classList.add("crossfading");
      setTimeout(() => {
        heroImg.src = slide.image;
        heroImg.alt = slide.alt;
        heroImg.onload = () => {
          heroImg.classList.remove("crossfading");
        };
        setTimeout(() => {
          heroImg.classList.remove("crossfading");
        }, 150);
      }, 250);
    }

    function startAutoSlide() {
      stopAutoSlide();
      restartProgressBar(indicators[currentIndex]);
      autoTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, SLIDE_DURATION);
    }

    function stopAutoSlide() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Click handlers for slide indicators
    indicators.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        goToSlide(idx);
        startAutoSlide(); // Reset auto timer on manual click
      });
    });

    // Pause on hover over carousel tracker
    const tracker = document.querySelector(".hero-carousel-tracker");
    if (tracker) {
      tracker.addEventListener("mouseenter", stopAutoSlide);
      tracker.addEventListener("mouseleave", startAutoSlide);
    }

    // Start auto carousel
    startAutoSlide();
  }

  // --- 3. Header Scroll, Precision Progress & Mobile Navigation ---
  function initHeader() {
    const header = document.querySelector(".site-header");
    const progressBar = document.getElementById("headerScrollProgress");
    let ticking = false;

    function updateScrollState() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (header) {
        if (scrollY > 20) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
      }

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }, { passive: true });

    // Initial check on load
    updateScrollState();

    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const drawer = document.querySelector(".mobile-nav-drawer");
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener("click", () => {
        const isOpen = drawer.classList.toggle("open");
        toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggleBtn.innerHTML = isOpen ? "✕" : "☰";
      });

      drawer.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          drawer.classList.remove("open");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.innerHTML = "☰";
        });
      });

      // Close drawer if clicking outside
      document.addEventListener("click", (e) => {
        if (drawer.classList.contains("open") && !header.contains(e.target)) {
          drawer.classList.remove("open");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.innerHTML = "☰";
        }
      });
    }

    // Active Navigation Highlight
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav-link, .mobile-nav-drawer a").forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      const cleanHref = href.replace(/\/$/, "").replace(/\.html$/, "");
      const cleanPath = currentPath.replace(/\.html$/, "");

      if (cleanHref === cleanPath || (cleanHref === "" && cleanPath === "/")) {
        link.classList.add("active");
      }
    });
  }

  // --- 4. Technical Specifications Modal Dialog ---
  function initServiceModal() {
    const modal = document.getElementById("serviceModal");
    if (!modal) return;

    const closeBtn = modal.querySelector(".modal-close-trigger");
    const modalEyebrow = document.getElementById("modalEyebrow");
    const modalTitle = document.getElementById("modalTitle");
    const modalOverview = document.getElementById("modalOverview");
    const modalSpecsList = document.getElementById("modalSpecsList");
    const modalDeliverablesList = document.getElementById("modalDeliverablesList");

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });

    document.querySelectorAll("[data-service-trigger]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const serviceKey = btn.getAttribute("data-service-trigger");
        const data = servicesSpecs[serviceKey];
        if (!data) return;

        if (modalEyebrow) modalEyebrow.textContent = data.eyebrow;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalOverview) modalOverview.textContent = data.overview;

        if (modalSpecsList) {
          modalSpecsList.innerHTML = data.specs.map(s => `
            <div style="display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--color-border-subtle); font-size: 13px;">
              <span style="font-weight: 600; color: var(--color-graphite); font-family: var(--font-body);">${s.label}</span>
              <span style="font-family: var(--font-mono); color: var(--color-muted); text-align: right; margin-left: 12px;">${s.value}</span>
            </div>
          `).join("");
        }

        if (modalDeliverablesList) {
          modalDeliverablesList.innerHTML = data.deliverables.map(d => `
            <li style="display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--color-graphite-secondary); margin-bottom: 8px;">
              <span style="color: var(--color-emerald); font-weight: bold;">✓</span>
              <span>${d}</span>
            </li>
          `).join("");
        }

        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
  }

  // --- 5. Accessible FAQ Accordion ---
  function initFaqAccordion() {
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        if (!item) return;
        const isActive = item.classList.contains("active");

        // Close other items
        document.querySelectorAll(".faq-item").forEach(i => {
          if (i !== item) {
            i.classList.remove("active");
            const btn = i.querySelector(".faq-trigger");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove("active");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("active");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // --- 6. Robust RFQ Validation & Truthful Enquiry Journey ---
  function initRfqForm() {
    const form = document.getElementById("rfqForm");
    if (!form) return;

    const nameInput = form.querySelector('[name="name"]');
    const companyInput = form.querySelector('[name="company"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const serviceInput = form.querySelector('[name="service"]');
    const messageInput = form.querySelector('[name="message"]');
    const feedbackBanner = document.getElementById("formFeedback");

    const btnWhatsApp = document.getElementById("btnSubmitWhatsApp");
    const btnEmail = document.getElementById("btnSubmitEmail");

    function validateField(input, condition) {
      if (!input) return true;
      if (!condition) {
        input.classList.add("is-invalid");
        input.setAttribute("aria-invalid", "true");
        return false;
      } else {
        input.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
        return true;
      }
    }

    function validateAll() {
      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isCompanyValid = validateField(companyInput, companyInput.value.trim().length >= 2);
      // Valid phone check: minimum 10 digits
      const phoneDigits = (phoneInput.value || "").replace(/\D/g, "");
      const isPhoneValid = validateField(phoneInput, phoneDigits.length >= 10);
      const isServiceValid = validateField(serviceInput, serviceInput.value.trim() !== "");
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 5);

      return isNameValid && isCompanyValid && isPhoneValid && isServiceValid && isMessageValid;
    }

    // Clear validation error on user input
    [nameInput, companyInput, phoneInput, serviceInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener("input", () => {
          inp.classList.remove("is-invalid");
          inp.removeAttribute("aria-invalid");
          if (feedbackBanner) feedbackBanner.classList.remove("visible");
        });
      }
    });

    // Handle WhatsApp Submission Path
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener("click", (e) => {
        e.preventDefault();
        if (!validateAll()) {
          if (feedbackBanner) {
            feedbackBanner.className = "rfq-result-banner visible";
            feedbackBanner.style.backgroundColor = "var(--color-error-subtle)";
            feedbackBanner.style.borderColor = "var(--color-error)";
            feedbackBanner.style.color = "var(--color-error)";
            feedbackBanner.innerHTML = "<strong>Please fill in all required fields</strong> with valid information so we can prepare your enquiry.";
          }
          return;
        }

        const name = nameInput.value.trim();
        const company = companyInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();

        const waText = encodeURIComponent(
          `*PROFLIC TECHNOLOGIES — ENGINEERING RFQ*\n` +
          `------------------------------------\n` +
          `• Contact Name: ${name}\n` +
          `• Company / Plant: ${company}\n` +
          `• Contact Phone: ${phone}\n` +
          `• Service Category: ${service}\n` +
          `• Scope / Tolerances: ${message}\n` +
          `------------------------------------\n` +
          `Please review tolerance specifications and provide feasibility analysis & quote.`
        );

        const waUrl = `https://wa.me/918459706344?text=${waText}`;

        // Truthful feedback: do NOT falsely claim inquiry received before user sends it
        if (feedbackBanner) {
          feedbackBanner.className = "rfq-result-banner visible info";
          feedbackBanner.style.backgroundColor = "";
          feedbackBanner.style.borderColor = "";
          feedbackBanner.style.color = "";
          feedbackBanner.innerHTML = `
            <div>
              <strong>WhatsApp RFQ Ready!</strong> Your enquiry has been prepared. Please click the button below to open WhatsApp and tap <em>Send</em> to deliver your message to the PROFLIC engineering desk (+91 84597 06344).
            </div>
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="margin-top: 10px; display: inline-flex;">
              Open WhatsApp to Send Enquiry →
            </a>
          `;
        }

        // Open WhatsApp window
        window.open(waUrl, "_blank", "noopener");
      });
    }

    // Handle Email Submission Path
    if (btnEmail) {
      btnEmail.addEventListener("click", (e) => {
        e.preventDefault();
        if (!validateAll()) {
          if (feedbackBanner) {
            feedbackBanner.className = "rfq-result-banner visible";
            feedbackBanner.style.backgroundColor = "var(--color-error-subtle)";
            feedbackBanner.style.borderColor = "var(--color-error)";
            feedbackBanner.style.color = "var(--color-error)";
            feedbackBanner.innerHTML = "<strong>Please fill in all required fields</strong> before generating your email draft.";
          }
          return;
        }

        const name = nameInput.value.trim();
        const company = companyInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();

        const subject = encodeURIComponent(`RFQ: ${service} - ${company}`);
        const body = encodeURIComponent(
          `Dear PROFLIC Technologies Engineering Team,\n\n` +
          `We would like to request an engineering inspection / quotation:\n\n` +
          `Contact Person: ${name}\n` +
          `Company / Facility: ${company}\n` +
          `Phone: ${phone}\n` +
          `Service Category: ${service}\n\n` +
          `Project Scope & Tolerances:\n${message}\n\n` +
          `Looking forward to your technical review.\n`
        );

        const mailtoUrl = `mailto:proflic.tech@gmail.com?subject=${subject}&body=${body}`;

        if (feedbackBanner) {
          feedbackBanner.className = "rfq-result-banner visible info";
          feedbackBanner.style.backgroundColor = "";
          feedbackBanner.style.borderColor = "";
          feedbackBanner.style.color = "";
          feedbackBanner.innerHTML = `
            <div>
              <strong>Email RFQ Drafted!</strong> Your default mail client should now open. If it did not open automatically, please send your project drawings to <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 700; color: var(--color-cobalt);">proflic.tech@gmail.com</a>.
            </div>
          `;
        }

        window.location.href = mailtoUrl;
      });
    }

    // Prevent default form submit enter key
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (btnWhatsApp) {
        btnWhatsApp.click();
      }
    });
  }

  // --- 7. Number Counter on Scroll (Reduced Motion Aware) ---
  function initCounters() {
    const counters = document.querySelectorAll(".counter-val");
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-target") || "0");
          const prefix = el.getAttribute("data-prefix") || "";
          const suffix = el.getAttribute("data-suffix") || "";
          const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);

          if (prefersReducedMotion) {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            obs.unobserve(el);
            return;
          }

          const duration = 1200;
          const startTime = performance.now();

          function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;
            el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            }
          }

          requestAnimationFrame(update);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => observer.observe(c));
  }

  // --- Bootstrapper ---
  document.addEventListener("DOMContentLoaded", () => {
    initHeroCarousel();
    initHeader();
    initServiceModal();
    initFaqAccordion();
    initRfqForm();
    initCounters();
  });

})();

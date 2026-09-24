/**
 * PROFLIC Technologies — Main Application Controller
 * Sticky Navigation, Mobile Drawer, Services Filtering, Technical Modal,
 * and Form Validation with Toast Telemetry.
 */

(function () {
  'use strict';

  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Scroll Dynamics
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Mobile Navigation Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileIcon = document.getElementById('mobileMenuIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');

      if (mobileIcon) {
        mobileIcon.className = isExpanded 
          ? 'fa-solid fa-bars text-xl' 
          : 'fa-solid fa-xmark text-xl';
      }
    });

    // Close menu when clicking navigation link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }

  // 4. Services Filter Tabs
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('border', 'border-slate-800', 'text-slate-400');
      });

      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('border-slate-800', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    });
  });

  // 5. Technical Service Deep-Dive Modal Data & Controller
  const serviceSpecsData = {
    'onsite': {
      title: 'On-Site CMM Inspection Services',
      category: 'Shop-Floor Metrology / Portable Arms',
      equipment: 'Portable Articulated Arms (FaroArm Platinum/Edge / Hexagon Romer Absolute), Optical Trackers',
      standards: 'ASME Y14.5-2018, ISO 10360-12, ISO 1101',
      overview: 'Deploys high-precision multi-axis portable inspection arms directly to your manufacturing facility, machine tool spindle, or assembly line. Eliminates part transit risk, crane rig delays, and machine downtime for oversized weldments and precision castings.',
      capabilities: [
        'Shop-floor in-situ inspection on CNC machine beds before unclamping',
        'Large volume assembly and structural frame alignment',
        'Direct CAD-to-part live inspection with real-time audio guidance',
        'Rapid turn-around dimensional reports with zero shipping delays'
      ],
      deliverables: 'Instant PDF / Excel Inspection Report, Bubble Drawing, Deviation CSV'
    },
    'scanning': {
      title: '3D Scanning & Probe-Based Inspection',
      category: 'Optical Blue Laser & Tactile Verification',
      equipment: 'High-Density Blue Laser Line Scanners (2,000,000 pts/sec), Photogrammetry Systems',
      standards: 'VDI/VDE 2634 Part 2/3, ASME Y14.5M, ISO 17025 Ready Methodology',
      overview: 'Synchronizes high-speed non-contact optical laser scanning with tactile touch-probing to capture both organic freeform surfaces and tight-tolerance prismatic bores with sub-micron repeatability.',
      capabilities: [
        'High-density point cloud acquisition on dark, reflective, or flexible parts',
        'Full 3D surface color deviation heatmaps mapped to nominal CAD models',
        'Wall-thickness analysis and critical turbine blade profile inspection',
        'Non-destructive reverse engineering and prototype validation'
      ],
      deliverables: 'Raw Point Cloud (.pts, .asc), PolyWorks Clean STL Mesh, Color Inspection PDF'
    },
    'training': {
      title: 'CMM Programming Training',
      category: 'Corporate Metrology & Software Certification',
      equipment: 'PC-DMIS CAD++, PolyWorks Inspector Suite, Offline Simulation Rigs',
      standards: 'ASME Y14.5-2018 GD&T Fundamentals, ISO 1101 Geometric Verification',
      overview: 'Comprehensive industrial training tailored for Quality Managers, Metrologists, and CMM Operators. Master hands-on offline programming, probe head cluster angles, automated loop routines, and collision-free clearance paths.',
      capabilities: [
        'Iterative, 3-2-1, and Best-Fit coordinate alignment strategies',
        'True Position ⌖, Maximum Material Condition (MMC) datum shifts, and Profile tolerances',
        'Parametric variable coding, loop structures, and automated Excel reporting scripts',
        'Probe qualification, star clusters, stylus change racks, and calibration workflows'
      ],
      deliverables: 'Training Syllabus, Practice CAD Models, Course Completion Certification'
    },
    'reverse': {
      title: 'Reverse Engineering & 3D Modelling',
      category: 'Scan-to-CAD / Parametric Reconstruction',
      equipment: 'Siemens NX, SolidWorks, PolyWorks Modeler, Geomagic Design X',
      standards: 'STEP AP242 / AP214, IGES 5.3, Parasolid (.x_t)',
      overview: 'Transforms complex physical parts, worn stamping dies, tooling fixtures, or legacy components without blueprints into fully editable, parametric feature-based CAD solid models ready for immediate CNC machining.',
      capabilities: [
        'Conversion of noisy polygon STL meshes into Class-A NURBS surfaces',
        'Native parametric feature trees with sketch constraints and design intent',
        'Tool & die wear compensation and remanufacturing engineering',
        'Full 2D manufacturing drawings with ASME Y14.5 GD&T datum callouts'
      ],
      deliverables: 'Parametric SolidWorks / NX Files, Neutral STEP/IGES, 2D Production Blueprints'
    },
    'dimensional': {
      title: 'Dimensional Inspection Services',
      category: 'Quality Assurance & First Article Verification',
      equipment: 'High-Precision Bridge CMMs, Micro-Hite Gauges, Optical Comparators',
      standards: 'AS9102 FAIR Standard, PPAP Level 1–5, AIAG MSA Gauge R&R',
      overview: 'Comprehensive quality control verification certifying manufactured components against blueprint tolerance limits. Validates prototype batches, production run sampling, and supplier parts.',
      capabilities: [
        'AS9102 Aerospace First Article Inspection Reports (FAIR Form 1, 2, 3)',
        'Automotive Production Part Approval Process (PPAP) dimensional data packages',
        'Gauge Repeatability & Reproducibility (Gauge R&R) measurement system analysis',
        'Pass/Fail statistical process control (SPC) data logging'
      ],
      deliverables: 'Formal AS9102 FAIR Report, PPAP Package, Certified Measurement Certificate'
    },
    'consultancy': {
      title: 'CMM Programming Support & Consultancy',
      category: 'Turnkey Offline DCC Scripting & Cycle-Time Optimization',
      equipment: 'PC-DMIS Offline DCC, PolyWorks Scripting Engine, Renishaw PH10/PH20',
      standards: 'DMIS Standard Protocol, ASME Y14.5 Geometric Tolerancing',
      overview: 'Senior offline programming support creating turnkey, collision-free CMM inspection routines before parts reach the shop floor. We eliminate machine bottlenecks, optimize probe head rotation angles, and reduce cycle times up to 40%.',
      capabilities: [
        'DCC offline path simulation with full CAD fixture and clamp collision checking',
        'Custom scripting for automatic statistical data export to ERP/QMS databases',
        'Multi-probe cluster calibration routines for complex deep bores and undercuts',
        'Debugging and optimization of legacy CMM scripts'
      ],
      deliverables: 'Turnkey Program File (.prg, .pwk), Setup Sheet with Probe & Part Zero Guide'
    },
    'cad': {
      title: '2D & 3D CAD Design & Fixture Tooling',
      category: 'Inspection Fixtures & Manufacturing Drafting',
      equipment: 'Siemens NX, SolidWorks, Modular Metrology Fixture Components',
      standards: 'ASME Y14.5 Dimensioning & Tolerancing, ISO 128 Technical Drawings',
      overview: 'Engineering design of dedicated or modular inspection holding fixtures specifically engineered for CMM probe accessibility, kinematic repeatability, and minimum component deflection.',
      capabilities: [
        'Modular fixturing plates with magnetic and vacuum clamp integration',
        'Specialized nests for flexible sheet metal, plastic molded, or thin-walled parts',
        '2D manufacturing blueprints with complete GD&T tolerancing and ballooning',
        'Full assembly collision models for seamless CMM path planning'
      ],
      deliverables: 'Complete 3D CAD Assembly, 2D Fabrication Drawings (PDF/DWG), BOM'
    }
  };

  const modal = document.getElementById('serviceDetailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalQuoteBtn = document.getElementById('modalQuoteBtn');

  function openServiceModal(serviceKey) {
    const data = serviceSpecsData[serviceKey];
    if (!data || !modal) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalEquipment').textContent = data.equipment;
    document.getElementById('modalStandards').textContent = data.standards;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalDeliverables').textContent = data.deliverables;

    const capList = document.getElementById('modalCapabilities');
    if (capList) {
      capList.innerHTML = data.capabilities.map(c => `
        <li class="flex items-start gap-2">
          <i class="fa-solid fa-circle-check text-blue-500 mt-1 shrink-0 text-xs"></i>
          <span>${c}</span>
        </li>
      `).join('');
    }

    if (modalQuoteBtn) {
      modalQuoteBtn.onclick = () => {
        closeServiceModal();
        const formService = document.getElementById('formService');
        if (formService) {
          formService.value = serviceKey;
          if (window.proflicCalculator && window.proflicCalculator.recalc) {
            const calcService = document.getElementById('calcService');
            if (calcService) calcService.value = serviceKey;
            window.proflicCalculator.recalc();
          }
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      };
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeServiceModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeServiceModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeServiceModal();
    }
  });

  // Attach to modal trigger buttons
  document.querySelectorAll('.open-spec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-service-key');
      openServiceModal(key);
    });
  });

  // 6. Engineering Inquiry Form Validation & Submission
  const inquiryForm = document.getElementById('inquiryForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastRefId = document.getElementById('toastRefId');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form Elements
      const name = document.getElementById('formName');
      const company = document.getElementById('formCompany');
      const email = document.getElementById('formEmail');
      const phone = document.getElementById('formPhone');
      const serviceSelect = document.getElementById('formService');
      const complexitySelect = document.getElementById('formComplexity');
      const quantity = document.getElementById('formQuantity');
      const software = document.getElementById('formSoftware');
      const message = document.getElementById('formMessage');

      const formStatus = document.getElementById('formStatus');
      const formStatusMailLink = document.getElementById('formStatusMailLink');

      let isValid = true;

      // 1. Required Fields Validation
      [name, company, email, message].forEach(field => {
        if (!field || !field.value.trim()) {
          if (field) {
            field.classList.add('border-red-500');
            field.classList.remove('border-slate-800');
          }
          isValid = false;
        } else {
          if (field) {
            field.classList.remove('border-red-500');
            field.classList.add('border-slate-800');
          }
        }
      });

      if (!isValid) {
        showToast('Validation Error', 'Please complete all required fields.', false);
        return;
      }

      // 2. Email Format Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add('border-red-500');
        email.classList.remove('border-slate-800');
        showToast('Invalid Email', 'Please enter a valid email address.', false);
        return;
      }

      // 3. Extract Form Values
      const nameVal = name.value.trim();
      const companyVal = company.value.trim();
      const emailVal = email.value.trim();
      const phoneVal = (phone && phone.value.trim()) ? phone.value.trim() : 'Not Provided';
      const serviceVal = (serviceSelect && serviceSelect.selectedIndex >= 0) 
        ? serviceSelect.options[serviceSelect.selectedIndex].text 
        : 'N/A';
      const complexityVal = (complexitySelect && complexitySelect.selectedIndex >= 0) 
        ? complexitySelect.options[complexitySelect.selectedIndex].text 
        : 'N/A';
      const qtyVal = (quantity && quantity.value) ? quantity.value : '1';
      const platformVal = (software && software.value.trim()) ? software.value.trim() : 'PC-DMIS';
      const detailsVal = message.value.trim();

      // 4. Construct Email Body according to specification
      const emailBody = `PROFLIC TECHNOLOGIES
ENGINEERING INQUIRY

CONTACT DETAILS
Name: ${nameVal}
Company: ${companyVal}
Email: ${emailVal}
Phone: ${phoneVal}

PROJECT REQUIREMENTS
Service: ${serviceVal}
Complexity: ${complexityVal}
Quantity: ${qtyVal}
Platform: ${platformVal}

PROJECT DETAILS / TOLERANCE SPECIFICATIONS
${detailsVal}`;

      // 5. Build and URL-encode mailto Link
      const recipient = 'proflic.tech@gmail.com';
      const subject = 'Engineering Inquiry — PROFLIC Technologies';
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      // 6. Attempt to Open Mail Client
      try {
        const mailtoAnchor = document.createElement('a');
        mailtoAnchor.href = mailtoUrl;
        document.body.appendChild(mailtoAnchor);
        mailtoAnchor.click();
        document.body.removeChild(mailtoAnchor);
      } catch (err) {
        window.location.href = mailtoUrl;
      }

      // 7. Display Confirmation & Fallback State in Form UI
      if (formStatus) {
        formStatus.classList.remove('hidden');
        if (formStatusMailLink) {
          formStatusMailLink.href = mailtoUrl;
        }
      }

      // 8. Visual Toast Feedback (Reference tracking)
      const refId = `PRF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      if (toastRefId) toastRefId.textContent = refId;
      showToast('Inquiry Prepared', 'Your inquiry has been prepared in your email app. Please review and send it to PROFLIC Technologies.', true);
    });
  }

  function showToast(title, desc, isSuccess = true) {
    if (!toastNotification) return;

    const toastTitle = document.getElementById('toastTitle');
    const toastDesc = document.getElementById('toastDesc');
    const toastIcon = document.getElementById('toastIcon');

    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = desc;

    if (toastIcon) {
      toastIcon.className = isSuccess 
        ? 'fa-solid fa-circle-check text-emerald-400 text-2xl shrink-0' 
        : 'fa-solid fa-triangle-exclamation text-amber-400 text-2xl shrink-0';
    }

    toastNotification.classList.remove('hidden');
    toastNotification.classList.add('flex');

    setTimeout(() => {
      toastNotification.classList.add('hidden');
      toastNotification.classList.remove('flex');
    }, 5500);
  }

  // Global API
  window.proflicApp = {
    openModal: openServiceModal,
    closeModal: closeServiceModal,
    showToast: showToast
  };
})();

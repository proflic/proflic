/**
 * PROFLIC Technologies — Motion & Interactive Engineering Widgets
 * Metrics Counter Animation, Interactive Metrology Workflow Pipeline,
 * and Live CAD / XYZ Coordinate Visualizer Widget.
 */

(function () {
  'use strict';

  // 1. Precision Metrics Counter Animation
  function initMetricsCounter() {
    const metricsSection = document.getElementById('metrics');
    if (!metricsSection) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateValue('metric-programs', 0, 1000, 1500, '+');
          animateValue('metric-gdt', 0, 100, 1200, '%');
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);
  }

  function animateValue(id, start, end, duration, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // 2. Interactive Metrology Workflow Pipeline
  const workflowData = [
    {
      step: 1,
      title: 'CAD Model & Blueprint Analysis',
      badge: 'INPUT STAGE',
      description: 'Import nominal 3D CAD data (STEP, IGES, CATIA, NX) and analyze 2D engineering drawings for GD&T datum reference frames, critical tolerances, and MMC/LMC modifiers.',
      parameters: 'Datum Alignment: [A|B|C] • Tolerance Band: ±0.010 mm • Format: STEP AP242',
      equipment: 'Siemens NX / CATIA / SolidWorks'
    },
    {
      step: 2,
      title: 'Measurement Strategy & Fixturing',
      badge: 'SETUP STAGE',
      description: 'Selection of optimal tactile probe cluster star angles or blue laser line scanning optics. Design or setup of rigid modular fixtures to ensure vibration-free repeatable measurement.',
      parameters: 'Probe Configuration: 4mm Ruby Stylus / PH10M Head • Clearance Plane: +50 mm',
      equipment: 'Modular Holding Fixtures / Renishaw Star Clusters'
    },
    {
      step: 3,
      title: 'CMM & 3D Laser Data Capture',
      badge: 'ACQUISITION STAGE',
      description: 'Execution of collision-free automated DCC probing paths or high-speed optical scanning generating millions of surface coordinate points per second.',
      parameters: 'Point Density: 12,000 pts/cm² • Scanning Speed: 480 mm/s • Touch Trigger: 0.05 N',
      equipment: 'Hexagon Bridge CMM / Portable FaroArm Blue Laser'
    },
    {
      step: 4,
      title: 'Deviation & Surface Analysis',
      badge: 'ANALYSIS STAGE',
      description: 'Alignment of captured 3D point cloud or tactile coordinates against nominal CAD using Best-Fit or Datum Reference Frames. Generation of color deviation heatmaps.',
      parameters: 'Algorithm: Gauss Best-Fit / Iterative 3-2-1 • Colormap: ±0.050 mm Range',
      equipment: 'PolyWorks Inspector / PC-DMIS Metrology'
    },
    {
      step: 5,
      title: 'GD&T Standards Verification',
      badge: 'COMPLIANCE STAGE',
      description: 'Mathematical verification of ASME Y14.5 and ISO 1101 geometric characteristics: True Position ⌖, Profile of a Surface ⌓, Flatness ⏥, Cylindricity ⌭, and Runout.',
      parameters: 'Standard: ASME Y14.5-2018 • Confidence Interval: 99.73% (3-Sigma)',
      equipment: 'ASME Y14.5 / ISO 17025 Compliant Math Engine'
    },
    {
      step: 6,
      title: 'Formal Metrology Reporting',
      badge: 'DELIVERY STAGE',
      description: 'Publication of comprehensive First Article Inspection Reports (FAIR), PPAP documentation, Pass/Fail bubble drawings, and tabular deviation Excel/PDF exports.',
      parameters: 'Outputs: AS9102 FAIR / PPAP Level 3 / 3D PDF Deviation Map',
      equipment: 'PROFLIC Automated Reporting Suite / AS9102'
    }
  ];

  function initWorkflow() {
    const stageButtons = document.querySelectorAll('.workflow-stage-btn');
    const detailTitle = document.getElementById('workflowDetailTitle');
    const detailBadge = document.getElementById('workflowDetailBadge');
    const detailDesc = document.getElementById('workflowDetailDesc');
    const detailParams = document.getElementById('workflowDetailParams');
    const detailEquipment = document.getElementById('workflowDetailEquipment');

    if (!stageButtons.length) return;

    stageButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        stageButtons.forEach(b => {
          b.classList.remove('active', 'border-blue-500', 'bg-blue-500/10');
          b.classList.add('border-slate-800', 'bg-slate-900/40');
          const stepNum = b.querySelector('.font-mono');
          if (stepNum) {
            stepNum.classList.remove('text-blue-400');
            stepNum.classList.add('text-slate-400');
          }
        });

        btn.classList.add('active', 'border-blue-500', 'bg-blue-500/10');
        btn.classList.remove('border-slate-800', 'bg-slate-900/40');
        const activeNum = btn.querySelector('.font-mono');
        if (activeNum) {
          activeNum.classList.remove('text-slate-400');
          activeNum.classList.add('text-blue-400');
        }

        const data = workflowData[idx];
        if (data) {
          if (detailTitle) detailTitle.textContent = `${data.step}. ${data.title}`;
          if (detailBadge) detailBadge.textContent = data.badge;
          if (detailDesc) detailDesc.textContent = data.description;
          if (detailParams) detailParams.textContent = data.parameters;
          if (detailEquipment) detailEquipment.textContent = data.equipment;
        }
      });
    });
  }

  // 3. Live CAD / XYZ Coordinate Visualizer (Section 15)
  function initCadVisualizer() {
    const canvas = document.getElementById('cadVisualizerCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let crosshairX = 140;
    let crosshairY = 110;
    let targetX = 140;
    let targetY = 110;

    function resize() {
      width = canvas.parentElement.offsetWidth || 400;
      height = canvas.parentElement.offsetHeight || 260;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');
      const primaryColor = isLight ? '#0052FF' : '#00C8FF';
      const wireColor = isLight ? 'rgba(0, 82, 255, 0.35)' : 'rgba(0, 200, 255, 0.4)';

      // Background Grid
      ctx.strokeStyle = isLight ? 'rgba(0, 82, 255, 0.06)' : 'rgba(0, 200, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 18) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 18) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Simulated CAD Prismatic Part Wireframe
      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 1.5;

      // Base Box (Isometric)
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 20);
      ctx.lineTo(cx + 10, cy - 60);
      ctx.lineTo(cx + 80, cy - 25);
      ctx.lineTo(cx, cy + 15);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 70, cy + 30);
      ctx.lineTo(cx, cy + 65);
      ctx.lineTo(cx + 80, cy + 25);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 20); ctx.lineTo(cx - 70, cy + 30);
      ctx.moveTo(cx, cy + 15); ctx.lineTo(cx, cy + 65);
      ctx.moveTo(cx + 80, cy - 25); ctx.lineTo(cx + 80, cy + 25);
      ctx.stroke();

      // Cylindrical Boss Bore
      ctx.beginPath();
      ctx.ellipse(cx + 10, cy - 20, 24, 12, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Smooth Crosshair Interpolation
      crosshairX += (targetX - crosshairX) * 0.08;
      crosshairY += (targetY - crosshairY) * 0.08;

      // Draw Precision Crosshairs
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(crosshairX - 16, crosshairY);
      ctx.lineTo(crosshairX + 16, crosshairY);
      ctx.moveTo(crosshairX, crosshairY - 16);
      ctx.lineTo(crosshairX, crosshairY + 16);
      ctx.stroke();

      // Target ring
      ctx.strokeStyle = primaryColor;
      ctx.beginPath();
      ctx.arc(crosshairX, crosshairY, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Update Coordinate Display
      const mmX = (125.483 + (crosshairX - cx) * 0.1).toFixed(3);
      const mmY = (48.201 + (cy - crosshairY) * 0.1).toFixed(3);
      const mmZ = (12.904 + Math.sin(crosshairX * 0.05) * 0.08).toFixed(3);

      const xyzEl = document.getElementById('cadCoordReadout');
      if (xyzEl) {
        xyzEl.textContent = `X ${mmX} mm   Y ${mmY} mm   Z ${mmZ} mm   DEV +0.008 mm`;
      }

      requestAnimationFrame(draw);
    }

    // Auto subtle drifting target
    setInterval(() => {
      const cx = width / 2;
      const cy = height / 2;
      targetX = cx + (Math.random() - 0.5) * 90;
      targetY = cy + (Math.random() - 0.5) * 60;
    }, 2800);

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  // General Scroll Reveal Observer
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  }

  function init() {
    initMetricsCounter();
    initWorkflow();
    initCadVisualizer();
    initScrollReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

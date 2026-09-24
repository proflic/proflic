/**
 * PROFLIC Technologies — Flagship 3D CMM & Laser Scanner Simulator
 * Dual-Mode Metrology Engine: Tactile Ruby Probe vs 3D Laser Scanning Mesh
 * High-DPI Canvas with animated stylus kinematics, deviation heatmap, and DRO telemetry.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('simCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = null;

  // Simulator Modes: 'probe' | 'laser'
  let currentMode = 'probe';
  let showHeatmap = false;

  // Probe Kinematics & Points
  const probePoints = [];
  let probeHitCounter = 0;
  const probeStylus = {
    x: 0,
    y: 0,
    z: 50, // Clearance plane
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    isProbing: false,
    probeProgress: 0,
    touchTriggered: false
  };

  // Laser Scan State
  let laserPoints = [];
  let laserX = 0;
  let laserY = 0;
  let isLaserActive = false;
  let scanProgressPct = 0;

  // Component Geometry Dimensions (centered on canvas)
  const partSpec = {
    outerRadius: 130,
    innerBoreRadius: 45,
    pcdRadius: 90,
    holeRadius: 14,
    holeCount: 6,
    keywayWidth: 16,
    keywayDepth: 10
  };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement.offsetWidth || 800;
    height = canvas.parentElement.offsetHeight || 480;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Initial probe stylus position at center clearance
    if (!probeStylus.isProbing) {
      probeStylus.x = width / 2;
      probeStylus.y = height / 2;
      probeStylus.targetX = width / 2;
      probeStylus.targetY = height / 2;
    }
  }

  // Draw Component: Precision Turbine Mounting Flange
  function drawMechanicalFlange(cx, cy, isLight) {
    const primaryBorder = isLight ? '#0052FF' : '#00C8FF';
    const wireColor = isLight ? 'rgba(0, 82, 255, 0.45)' : 'rgba(0, 200, 255, 0.55)';
    const centerlineColor = isLight ? 'rgba(0, 82, 255, 0.25)' : 'rgba(0, 200, 255, 0.3)';

    // Optional: Draw Deviation Heatmap Surface if enabled
    if (showHeatmap) {
      drawHeatmapSurface(cx, cy);
    } else {
      // Solid/Translucent CAD body fill
      ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.85)' : 'rgba(15, 29, 56, 0.7)';
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Punch out center bore
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.innerBoreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Outer Flange Boundary
    ctx.strokeStyle = primaryBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Chamfer Ring
    ctx.strokeStyle = wireColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, partSpec.outerRadius - 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pitch Circle Diameter (PCD) Centerline
    ctx.strokeStyle = centerlineColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 4, 2, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, partSpec.pcdRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Center Bore & Keyway
    ctx.strokeStyle = primaryBorder;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(cx, cy, partSpec.innerBoreRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Bore Keyway Slot
    const kw = partSpec.keywayWidth / 2;
    const kd = partSpec.keywayDepth;
    ctx.beginPath();
    ctx.moveTo(cx - kw, cy - partSpec.innerBoreRadius);
    ctx.lineTo(cx - kw, cy - partSpec.innerBoreRadius - kd);
    ctx.lineTo(cx + kw, cy - partSpec.innerBoreRadius - kd);
    ctx.lineTo(cx + kw, cy - partSpec.innerBoreRadius);
    ctx.stroke();

    // 6 PCD Bolt Holes with crosshairs
    for (let i = 0; i < partSpec.holeCount; i++) {
      const angle = (i * Math.PI * 2) / partSpec.holeCount;
      const hx = cx + Math.cos(angle) * partSpec.pcdRadius;
      const hy = cy + Math.sin(angle) * partSpec.pcdRadius;

      // Hole circle
      ctx.strokeStyle = primaryBorder;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, partSpec.holeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Center crosshairs
      ctx.strokeStyle = centerlineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx - partSpec.holeRadius - 4, hy);
      ctx.lineTo(hx + partSpec.holeRadius + 4, hy);
      ctx.moveTo(hx, hy - partSpec.holeRadius - 4);
      ctx.lineTo(hx, hy + partSpec.holeRadius + 4);
      ctx.stroke();

      // Datum label on Hole 1
      if (i === 0) {
        ctx.fillStyle = isLight ? '#0052FF' : '#00C8FF';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText('[DAT-B] 6x Ø28.00 H7', hx + 18, hy - 8);
      }
    }

    // Main Centerlines
    ctx.strokeStyle = centerlineColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([12, 6, 2, 6]);
    ctx.beginPath();
    ctx.moveTo(cx - partSpec.outerRadius - 20, cy);
    ctx.lineTo(cx + partSpec.outerRadius + 20, cy);
    ctx.moveTo(cx, cy - partSpec.outerRadius - 20);
    ctx.lineTo(cx, cy + partSpec.outerRadius + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Part Identification Callout
    ctx.fillStyle = isLight ? '#475569' : '#94A3B8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('PART ID: PRF-8840-FLANGE', cx - partSpec.outerRadius, cy + partSpec.outerRadius + 28);
    ctx.fillText('MATERIAL: 316L SS / FORGED', cx - partSpec.outerRadius, cy + partSpec.outerRadius + 42);
  }

  // Draw Conceptual Heatmap Inspection Overlay (PolyWorks Style)
  function drawHeatmapSurface(cx, cy) {
    const radialGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, partSpec.outerRadius);
    radialGrad.addColorStop(0, 'rgba(16, 185, 129, 0.7)'); // Nominal center
    radialGrad.addColorStop(0.35, 'rgba(6, 182, 212, 0.65)'); // -0.005mm
    radialGrad.addColorStop(0.65, 'rgba(59, 130, 246, 0.6)'); // -0.015mm
    radialGrad.addColorStop(0.85, 'rgba(245, 158, 11, 0.65)'); // +0.010mm
    radialGrad.addColorStop(1, 'rgba(239, 68, 68, 0.7)'); // +0.025mm

    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Stylized Ruby Stylus CMM Probe
  function drawRubyStylus(x, y, z, isLight) {
    // Stylus shaft (carbon fiber / stainless)
    const shaftLen = 45;
    const shaftTopY = y - z - shaftLen;
    const shaftBottomY = y - z;

    // Stylus Mount / Shank
    ctx.fillStyle = isLight ? '#475569' : '#94A3B8';
    ctx.fillRect(x - 4, shaftTopY - 12, 8, 12);

    // Carbon / Ceramic Stem
    ctx.strokeStyle = isLight ? '#1E293B' : '#CBD5E1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x, shaftTopY);
    ctx.lineTo(x, shaftBottomY);
    ctx.stroke();

    // Stylus Sphere Tip (Ruby Metrology Ball Ø 4mm)
    const rubyRadius = 6;
    const rubyGrad = ctx.createRadialGradient(
      x - 2, shaftBottomY - 2, 1,
      x, shaftBottomY, rubyRadius
    );
    rubyGrad.addColorStop(0, '#FF8A9E');
    rubyGrad.addColorStop(0.6, '#DC2626');
    rubyGrad.addColorStop(1, '#7F1D1D');

    ctx.fillStyle = rubyGrad;
    ctx.beginPath();
    ctx.arc(x, shaftBottomY, rubyRadius, 0, Math.PI * 2);
    ctx.fill();

    // Ruby contact glow
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Contact ripple ring when probe touches component (z near 0)
    if (z < 3) {
      ctx.strokeStyle = '#00C8FF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Animation & Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.classList.contains('light');
    const cx = width / 2;
    const cy = height / 2;

    // Background Metrology Inspection Grid
    ctx.strokeStyle = isLight ? 'rgba(0, 82, 255, 0.05)' : 'rgba(0, 200, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 24) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 24) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Draw the CAD Component
    drawMechanicalFlange(cx, cy, isLight);

    // Render Laser Scan Point Cloud (if points exist)
    if (laserPoints.length > 0) {
      for (let i = 0; i < laserPoints.length; i++) {
        const pt = laserPoints[i];
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Render Recorded Probe Points
    for (let i = 0; i < probePoints.length; i++) {
      const pt = probePoints[i];
      // Target Ring
      ctx.strokeStyle = pt.devColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Center Dot
      ctx.fillStyle = pt.devColor;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Point Index Badge (#01, #02...)
      ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillText(`#${pt.id.toString().padStart(2, '0')}`, pt.x + 11, pt.y - 4);
    }

    // PROBE MODE KINEMATICS
    if (currentMode === 'probe') {
      if (probeStylus.isProbing) {
        probeStylus.probeProgress += 0.08;

        if (probeStylus.probeProgress < 0.5) {
          // Move from clearance to target touch
          const t = probeStylus.probeProgress * 2;
          probeStylus.x += (probeStylus.targetX - probeStylus.x) * 0.3;
          probeStylus.y += (probeStylus.targetY - probeStylus.y) * 0.3;
          probeStylus.z = 40 * (1 - t);
        } else if (probeStylus.probeProgress < 0.6) {
          // Moment of Contact
          probeStylus.z = 0;
          if (!probeStylus.touchTriggered) {
            triggerProbePointRegistration(probeStylus.targetX, probeStylus.targetY, cx, cy);
            probeStylus.touchTriggered = true;
          }
        } else if (probeStylus.probeProgress <= 1.0) {
          // Retract back to safe clearance
          const t = (probeStylus.probeProgress - 0.6) * 2.5;
          probeStylus.z = 40 * Math.min(t, 1);
        } else {
          // Probing complete
          probeStylus.isProbing = false;
          probeStylus.z = 40;
        }
      }

      drawRubyStylus(probeStylus.x, probeStylus.y, probeStylus.z, isLight);
    }

    // LASER SCAN MODE SWEEP
    if (currentMode === 'laser' && isLaserActive) {
      // Draw Laser Projector Line
      const laserWidth = 140;
      const grad = ctx.createLinearGradient(laserX - laserWidth / 2, laserY, laserX + laserWidth / 2, laserY);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      grad.addColorStop(0.5, '#00E5FF');
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(laserX - laserWidth / 2, laserY);
      ctx.lineTo(laserX + laserWidth / 2, laserY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    animationId = requestAnimationFrame(render);
  }

  // Compute Metrology Coordinates and Record Point
  function triggerProbePointRegistration(px, py, cx, cy) {
    probeHitCounter++;

    // Engineering calculation relative to origin (cx, cy)
    const scaleFactor = 0.42; // pixels to mm
    const mmX = ((px - cx) * scaleFactor);
    const mmY = ((cy - py) * scaleFactor);
    const dist = Math.sqrt(mmX * mmX + mmY * mmY);
    const mmZ = dist < 20 ? 0.0 : 18.0;

    // Realistic micron deviation: -0.006 to +0.007 mm
    const deviation = (Math.sin(px * 0.1) * 0.005 + (Math.random() - 0.45) * 0.003);
    const devMm = parseFloat(deviation.toFixed(3));

    let status = 'NOMINAL';
    let devColor = '#10B981'; // Green
    if (Math.abs(devMm) > 0.006) {
      status = 'WARNING';
      devColor = '#F59E0B'; // Amber
    }

    const hit = {
      id: probeHitCounter,
      x: px,
      y: py,
      mmX: (mmX >= 0 ? '+' : '') + mmX.toFixed(3),
      mmY: (mmY >= 0 ? '+' : '') + mmY.toFixed(3),
      mmZ: (mmZ >= 0 ? '+' : '') + mmZ.toFixed(3),
      dev: (devMm >= 0 ? '+' : '') + devMm.toFixed(3),
      devColor: devColor,
      status: status
    };

    probePoints.push(hit);

    // Update DRO & HUD
    updateDRO(hit.mmX, hit.mmY, hit.mmZ, hit.dev, hit.devColor);
    updateProbeTable();
    updateCounterHUD();
  }

  function updateDRO(x, y, z, dev, devColor) {
    const elX = document.getElementById('droX');
    const elY = document.getElementById('droY');
    const elZ = document.getElementById('droZ');
    const elDev = document.getElementById('droDev');

    if (elX) elX.textContent = `${x} mm`;
    if (elY) elY.textContent = `${y} mm`;
    if (elZ) elZ.textContent = `${z} mm`;
    if (elDev) {
      elDev.textContent = `${dev} mm`;
      elDev.style.color = devColor;
    }
  }

  function updateCounterHUD() {
    const pointCountEl = document.getElementById('simPointCount');
    if (pointCountEl) {
      pointCountEl.textContent = currentMode === 'probe' ? probePoints.length : laserPoints.length;
    }
  }

  function updateProbeTable() {
    const listEl = document.getElementById('probeHitsList');
    if (!listEl) return;

    if (probePoints.length === 0) {
      listEl.innerHTML = '<div class="text-xs font-mono text-slate-400 py-3 text-center">No CMM probe hits recorded. Click on part to inspect.</div>';
      return;
    }

    // Display last 5 points
    const recentHits = probePoints.slice(-5).reverse();
    listEl.innerHTML = recentHits.map(h => `
      <div class="flex items-center justify-between text-[11px] font-mono p-2 rounded bg-slate-900/60 border border-slate-800 mb-1.5">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full" style="background-color: ${h.devColor}"></span>
          <span class="text-white font-bold">HIT #${h.id.toString().padStart(2, '0')}</span>
        </div>
        <div class="text-slate-400">X:${h.mmX} Y:${h.mmY}</div>
        <div class="font-bold" style="color: ${h.devColor}">${h.dev} mm</div>
      </div>
    `).join('');
  }

  // Pointer & Touch Events
  function handleProbeInteraction(clientX, clientY) {
    if (currentMode !== 'probe') return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    probeStylus.targetX = x;
    probeStylus.targetY = y;
    probeStylus.probeProgress = 0;
    probeStylus.isProbing = true;
    probeStylus.touchTriggered = false;
  }

  function handleLaserMovement(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    laserX = clientX - rect.left;
    laserY = clientY - rect.top;

    const cx = width / 2;
    const cy = height / 2;
    const dx = laserX - cx;
    const dy = laserY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Live DRO update on mouse movement
    const scaleFactor = 0.42;
    const mmX = (dx * scaleFactor).toFixed(3);
    const mmY = (-dy * scaleFactor).toFixed(3);
    const mmZ = dist < partSpec.outerRadius ? '18.000' : '0.000';
    const dev = (Math.random() * 0.005).toFixed(3);

    updateDRO(
      `${mmX >= 0 ? '+' : ''}${mmX}`,
      `${mmY >= 0 ? '+' : ''}${mmY}`,
      `+${mmZ}`,
      `+${dev}`,
      '#10B981'
    );

    if (currentMode === 'laser' && dist <= partSpec.outerRadius + 30) {
      isLaserActive = true;

      // Stream high-density point cloud particles along laser line
      const pointsToGen = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i < pointsToGen; i++) {
        const spreadX = (Math.random() - 0.5) * 110;
        const ptX = laserX + spreadX;
        const ptY = laserY + (Math.random() - 0.5) * 4;

        // Check if within part bounds
        const pDist = Math.sqrt((ptX - cx) ** 2 + (ptY - cy) ** 2);
        if (pDist <= partSpec.outerRadius + 10) {
          const devVal = (Math.random() - 0.48) * 0.012;
          let color = '#10B981';
          if (devVal > 0.004) color = '#F59E0B';
          if (devVal < -0.004) color = '#3B82F6';

          laserPoints.push({
            x: ptX,
            y: ptY,
            color: color,
            size: Math.random() * 1.5 + 1
          });
        }
      }

      // Cap points to 1,200 for peak smooth 60fps performance
      if (laserPoints.length > 1200) {
        laserPoints.splice(0, 15);
      }

      scanProgressPct = Math.min(100, Math.floor((laserPoints.length / 800) * 100));

      const scanStatEl = document.getElementById('laserScanStats');
      if (scanStatEl) {
        scanStatEl.textContent = `POINTS: ${laserPoints.length.toLocaleString()} | SCAN: ${scanProgressPct}%`;
      }
      updateCounterHUD();
    }
  }

  // Pre-programmed automated routine demo
  function runAutomatedInspectionRoutine() {
    clearSimulatorData();
    currentMode = 'probe';
    setModeUI('probe');

    const cx = width / 2;
    const cy = height / 2;
    let step = 0;

    const interval = setInterval(() => {
      if (step >= partSpec.holeCount) {
        clearInterval(interval);
        return;
      }
      const angle = (step * Math.PI * 2) / partSpec.holeCount;
      const targetX = cx + Math.cos(angle) * partSpec.pcdRadius;
      const targetY = cy + Math.sin(angle) * partSpec.pcdRadius;

      probeStylus.targetX = targetX;
      probeStylus.targetY = targetY;
      probeStylus.probeProgress = 0;
      probeStylus.isProbing = true;
      probeStylus.touchTriggered = false;

      step++;
    }, 900);
  }

  function clearSimulatorData() {
    probePoints.length = 0;
    laserPoints.length = 0;
    probeHitCounter = 0;
    scanProgressPct = 0;
    updateProbeTable();
    updateCounterHUD();
    updateDRO('+000.000', '+000.000', '+000.000', '+0.000', '#10B981');
    const scanStatEl = document.getElementById('laserScanStats');
    if (scanStatEl) scanStatEl.textContent = 'POINTS: 0 | SCAN: 0%';
  }

  function setModeUI(mode) {
    currentMode = mode;
    const btnProbe = document.getElementById('simModeProbe');
    const btnLaser = document.getElementById('simModeScan');
    const modeTitle = document.getElementById('canvasModeTitle');
    const statusText = document.getElementById('simStatusText');

    if (mode === 'probe') {
      if (btnProbe) {
        btnProbe.className = 'px-4 py-2 rounded-lg font-mono text-xs font-bold bg-blue-600 text-white transition-all';
      }
      if (btnLaser) {
        btnLaser.className = 'px-4 py-2 rounded-lg font-mono text-xs font-bold text-slate-400 hover:text-white border border-slate-800 transition-all';
      }
      if (modeTitle) {
        modeTitle.textContent = 'CMM TACTILE TOUCH PROBE (RUBY STYLUS 4mm)';
      }
      if (statusText) {
        statusText.textContent = 'Click part to record CMM point';
      }
    } else {
      if (btnLaser) {
        btnLaser.className = 'px-4 py-2 rounded-lg font-mono text-xs font-bold bg-blue-600 text-white transition-all';
      }
      if (btnProbe) {
        btnProbe.className = 'px-4 py-2 rounded-lg font-mono text-xs font-bold text-slate-400 hover:text-white border border-slate-800 transition-all';
      }
      if (modeTitle) {
        modeTitle.textContent = 'HIGH-SPEED 3D BLUE LASER LINE SCANNER';
      }
      if (statusText) {
        statusText.textContent = 'Drag cursor across surface to stream 3D point cloud';
      }
    }
  }

  // Setup Event Listeners
  function init() {
    resize();
    render();

    window.addEventListener('resize', resize);

    // Mouse Listeners
    canvas.addEventListener('click', (e) => {
      handleProbeInteraction(e.clientX, e.clientY);
    });

    canvas.addEventListener('mousemove', (e) => {
      handleLaserMovement(e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseleave', () => {
      isLaserActive = false;
    });

    // Touch Listeners for Mobile
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        if (currentMode === 'probe') {
          handleProbeInteraction(t.clientX, t.clientY);
        } else {
          handleLaserMovement(t.clientX, t.clientY);
        }
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handleLaserMovement(t.clientX, t.clientY);
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      isLaserActive = false;
    });

    // Control Buttons
    const btnProbe = document.getElementById('simModeProbe');
    const btnLaser = document.getElementById('simModeScan');
    const btnClear = document.getElementById('clearSimPointsBtn');
    const btnAutoRun = document.getElementById('autoRunRoutineBtn');
    const btnHeatmapToggle = document.getElementById('toggleHeatmapBtn');

    if (btnProbe) btnProbe.addEventListener('click', () => setModeUI('probe'));
    if (btnLaser) btnLaser.addEventListener('click', () => setModeUI('laser'));
    if (btnClear) btnClear.addEventListener('click', clearSimulatorData);
    if (btnAutoRun) btnAutoRun.addEventListener('click', runAutomatedInspectionRoutine);
    if (btnHeatmapToggle) {
      btnHeatmapToggle.addEventListener('click', () => {
        showHeatmap = !showHeatmap;
        btnHeatmapToggle.classList.toggle('border-blue-500', showHeatmap);
        btnHeatmapToggle.classList.toggle('bg-blue-500/10', showHeatmap);
        btnHeatmapToggle.classList.toggle('text-blue-400', showHeatmap);
      });
    }

    setModeUI('probe');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.proflicScanner = {
    setMode: setModeUI,
    runAutoDemo: runAutomatedInspectionRoutine,
    clear: clearSimulatorData
  };
})();

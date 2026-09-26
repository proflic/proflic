"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "./ThemeContext";

interface ProbePoint {
  id: number;
  x: number;
  y: number;
  mmX: string;
  mmY: string;
  mmZ: string;
  dev: string;
  devColor: string;
  status: string;
}

interface LaserPoint {
  x: number;
  y: number;
  color: string;
  size: number;
}

export const Simulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  const [currentMode, setCurrentMode] = useState<"probe" | "laser">("probe");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [dro, setDro] = useState({
    x: "+000.000",
    y: "+000.000",
    z: "+000.000",
    dev: "+0.000",
    devColor: "#10B981",
  });
  const [pointCount, setPointCount] = useState(0);
  const [laserScanStats, setLaserScanStats] = useState("SCAN: 0%");

  const modeRef = useRef<"probe" | "laser">("probe");
  modeRef.current = currentMode;

  const heatmapRef = useRef(false);
  heatmapRef.current = showHeatmap;

  const probePointsRef = useRef<ProbePoint[]>([]);
  const laserPointsRef = useRef<LaserPoint[]>([]);
  const probeHitCounterRef = useRef(0);

  const probeStylusRef = useRef({
    x: 0,
    y: 0,
    z: 50,
    targetX: 0,
    targetY: 0,
    isProbing: false,
    probeProgress: 0,
    touchTriggered: false,
  });

  const laserStateRef = useRef({
    x: 0,
    y: 0,
    isActive: false,
  });

  const partSpec = {
    outerRadius: 130,
    innerBoreRadius: 45,
    pcdRadius: 90,
    holeRadius: 14,
    holeCount: 6,
    keywayWidth: 16,
    keywayDepth: 10,
  };

  const updateDROState = useCallback(
    (x: string, y: string, z: string, dev: string, devColor: string) => {
      setDro({ x, y, z, dev, devColor });
    },
    []
  );

  const clearSimulatorData = useCallback(() => {
    probePointsRef.current = [];
    laserPointsRef.current = [];
    probeHitCounterRef.current = 0;
    setPointCount(0);
    setLaserScanStats("SCAN: 0%");
    updateDROState("+000.000", "+000.000", "+000.000", "+0.000", "#10B981");
  }, [updateDROState]);

  const triggerProbePointRegistration = useCallback(
    (px: number, py: number, cx: number, cy: number) => {
      probeHitCounterRef.current++;
      const scaleFactor = 0.42;
      const mmX = (px - cx) * scaleFactor;
      const mmY = (cy - py) * scaleFactor;
      const dist = Math.sqrt(mmX * mmX + mmY * mmY);
      const mmZ = dist < 20 ? 0.0 : 18.0;

      const deviation = Math.sin(px * 0.1) * 0.005 + (Math.random() - 0.45) * 0.003;
      const devMm = parseFloat(deviation.toFixed(3));

      let status = "NOMINAL";
      let devColor = "#10B981";
      if (Math.abs(devMm) > 0.006) {
        status = "WARNING";
        devColor = "#F59E0B";
      }

      const hit: ProbePoint = {
        id: probeHitCounterRef.current,
        x: px,
        y: py,
        mmX: (mmX >= 0 ? "+" : "") + mmX.toFixed(3),
        mmY: (mmY >= 0 ? "+" : "") + mmY.toFixed(3),
        mmZ: (mmZ >= 0 ? "+" : "") + mmZ.toFixed(3),
        dev: (devMm >= 0 ? "+" : "") + devMm.toFixed(3),
        devColor: devColor,
        status: status,
      };

      probePointsRef.current.push(hit);
      setPointCount(probePointsRef.current.length);
      updateDROState(hit.mmX, hit.mmY, hit.mmZ, hit.dev, hit.devColor);
    },
    [updateDROState]
  );

  const runAutomatedRoutine = useCallback(() => {
    clearSimulatorData();
    setCurrentMode("probe");
    modeRef.current = "probe";

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.parentElement?.offsetWidth || 800;
    const height = canvas.parentElement?.offsetHeight || 440;
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

      probeStylusRef.current.targetX = targetX;
      probeStylusRef.current.targetY = targetY;
      probeStylusRef.current.probeProgress = 0;
      probeStylusRef.current.isProbing = true;
      probeStylusRef.current.touchTriggered = false;

      step++;
    }, 900);
  }, [clearSimulatorData, partSpec.holeCount, partSpec.pcdRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId: number;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.offsetWidth || 800;
      height = canvas.parentElement.offsetHeight || 440;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx?.scale(dpr, dpr);

      if (!probeStylusRef.current.isProbing) {
        probeStylusRef.current.x = width / 2;
        probeStylusRef.current.y = height / 2;
        probeStylusRef.current.targetX = width / 2;
        probeStylusRef.current.targetY = height / 2;
      }
    }

    function drawMechanicalFlange(cx: number, cy: number, isLight: boolean) {
      if (!ctx) return;
      const primaryBorder = isLight ? "#0052FF" : "#00C8FF";
      const wireColor = isLight ? "rgba(0, 82, 255, 0.45)" : "rgba(0, 200, 255, 0.55)";
      const centerlineColor = isLight ? "rgba(0, 82, 255, 0.25)" : "rgba(0, 200, 255, 0.3)";

      if (heatmapRef.current) {
        const radialGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, partSpec.outerRadius);
        radialGrad.addColorStop(0, "rgba(16, 185, 129, 0.7)");
        radialGrad.addColorStop(0.35, "rgba(6, 182, 212, 0.65)");
        radialGrad.addColorStop(0.65, "rgba(59, 130, 246, 0.6)");
        radialGrad.addColorStop(0.85, "rgba(245, 158, 11, 0.65)");
        radialGrad.addColorStop(1, "rgba(239, 68, 68, 0.7)");

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = isLight ? "rgba(241, 245, 249, 0.85)" : "rgba(15, 29, 56, 0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(cx, cy, partSpec.innerBoreRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.strokeStyle = primaryBorder;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.outerRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.outerRadius - 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = centerlineColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 4, 2, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.pcdRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = primaryBorder;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(cx, cy, partSpec.innerBoreRadius, 0, Math.PI * 2);
      ctx.stroke();

      const kw = partSpec.keywayWidth / 2;
      const kd = partSpec.keywayDepth;
      ctx.beginPath();
      ctx.moveTo(cx - kw, cy - partSpec.innerBoreRadius);
      ctx.lineTo(cx - kw, cy - partSpec.innerBoreRadius - kd);
      ctx.lineTo(cx + kw, cy - partSpec.innerBoreRadius - kd);
      ctx.lineTo(cx + kw, cy - partSpec.innerBoreRadius);
      ctx.stroke();

      for (let i = 0; i < partSpec.holeCount; i++) {
        const angle = (i * Math.PI * 2) / partSpec.holeCount;
        const hx = cx + Math.cos(angle) * partSpec.pcdRadius;
        const hy = cy + Math.sin(angle) * partSpec.pcdRadius;

        ctx.strokeStyle = primaryBorder;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hx, hy, partSpec.holeRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = centerlineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hx - partSpec.holeRadius - 4, hy);
        ctx.lineTo(hx + partSpec.holeRadius + 4, hy);
        ctx.moveTo(hx, hy - partSpec.holeRadius - 4);
        ctx.lineTo(hx, hy + partSpec.holeRadius + 4);
        ctx.stroke();

        if (i === 0) {
          ctx.fillStyle = isLight ? "#0052FF" : "#00C8FF";
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText("[DAT-B] 6x Ø28.00 H7", hx + 18, hy - 8);
        }
      }

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

      ctx.fillStyle = isLight ? "#475569" : "#94A3B8";
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(
        "PART ID: PRF-8840-FLANGE",
        cx - partSpec.outerRadius,
        cy + partSpec.outerRadius + 24
      );
      ctx.fillText(
        "MATERIAL: 316L SS / FORGED",
        cx - partSpec.outerRadius,
        cy + partSpec.outerRadius + 38
      );
    }

    function drawRubyStylus(x: number, y: number, z: number, isLight: boolean) {
      if (!ctx) return;
      const shaftLen = 45;
      const shaftTopY = y - z - shaftLen;
      const shaftBottomY = y - z;

      ctx.fillStyle = isLight ? "#475569" : "#94A3B8";
      ctx.fillRect(x - 4, shaftTopY - 12, 8, 12);

      ctx.strokeStyle = isLight ? "#1E293B" : "#CBD5E1";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x, shaftTopY);
      ctx.lineTo(x, shaftBottomY);
      ctx.stroke();

      const rubyRadius = 6;
      const rubyGrad = ctx.createRadialGradient(
        x - 2,
        shaftBottomY - 2,
        1,
        x,
        shaftBottomY,
        rubyRadius
      );
      rubyGrad.addColorStop(0, "#FF8A9E");
      rubyGrad.addColorStop(0.6, "#DC2626");
      rubyGrad.addColorStop(1, "#7F1D1D");

      ctx.fillStyle = rubyGrad;
      ctx.beginPath();
      ctx.arc(x, shaftBottomY, rubyRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(220, 38, 38, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (z < 3) {
        ctx.strokeStyle = "#00C8FF";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = isLight ? "rgba(0, 82, 255, 0.05)" : "rgba(0, 200, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      drawMechanicalFlange(cx, cy, isLight);

      const laserPts = laserPointsRef.current;
      for (let i = 0; i < laserPts.length; i++) {
        const pt = laserPts[i];
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const probePts = probePointsRef.current;
      for (let i = 0; i < probePts.length; i++) {
        const pt = probePts[i];
        ctx.strokeStyle = pt.devColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pt.devColor;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isLight ? "#0F172A" : "#FFFFFF";
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillText(`#${pt.id.toString().padStart(2, "0")}`, pt.x + 11, pt.y - 4);
      }

      if (modeRef.current === "probe") {
        const stylus = probeStylusRef.current;
        if (stylus.isProbing) {
          stylus.probeProgress += 0.08;

          if (stylus.probeProgress < 0.5) {
            stylus.x += (stylus.targetX - stylus.x) * 0.3;
            stylus.y += (stylus.targetY - stylus.y) * 0.3;
            stylus.z = 40 * (1 - stylus.probeProgress * 2);
          } else if (stylus.probeProgress < 0.6) {
            stylus.z = 0;
            if (!stylus.touchTriggered) {
              triggerProbePointRegistration(stylus.targetX, stylus.targetY, cx, cy);
              stylus.touchTriggered = true;
            }
          } else if (stylus.probeProgress <= 1.0) {
            const t = (stylus.probeProgress - 0.6) * 2.5;
            stylus.z = 40 * Math.min(t, 1);
          } else {
            stylus.isProbing = false;
            stylus.z = 40;
          }
        }

        drawRubyStylus(stylus.x, stylus.y, stylus.z, isLight);
      }

      if (modeRef.current === "laser" && laserStateRef.current.isActive) {
        const laserWidth = 140;
        const lx = laserStateRef.current.x;
        const ly = laserStateRef.current.y;
        const grad = ctx.createLinearGradient(
          lx - laserWidth / 2,
          ly,
          lx + laserWidth / 2,
          ly
        );
        grad.addColorStop(0, "rgba(0, 229, 255, 0)");
        grad.addColorStop(0.5, "#00E5FF");
        grad.addColorStop(1, "rgba(0, 229, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(lx - laserWidth / 2, ly);
        ctx.lineTo(lx + laserWidth / 2, ly);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    }

    function handleProbeInteraction(clientX: number, clientY: number) {
      if (modeRef.current !== "probe" || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      probeStylusRef.current.targetX = x;
      probeStylusRef.current.targetY = y;
      probeStylusRef.current.probeProgress = 0;
      probeStylusRef.current.isProbing = true;
      probeStylusRef.current.touchTriggered = false;
    }

    function handleLaserMovement(clientX: number, clientY: number) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const lx = clientX - rect.left;
      const ly = clientY - rect.top;
      laserStateRef.current.x = lx;
      laserStateRef.current.y = ly;

      const cx = width / 2;
      const cy = height / 2;
      const dx = lx - cx;
      const dy = ly - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const scaleFactor = 0.42;
      const mmX = (dx * scaleFactor).toFixed(3);
      const mmY = (-dy * scaleFactor).toFixed(3);
      const mmZ = dist < partSpec.outerRadius ? "18.000" : "0.000";
      const dev = (Math.random() * 0.005).toFixed(3);

      updateDROState(
        `${Number(mmX) >= 0 ? "+" : ""}${mmX}`,
        `${Number(mmY) >= 0 ? "+" : ""}${mmY}`,
        `+${mmZ}`,
        `+${dev}`,
        "#10B981"
      );

      if (modeRef.current === "laser" && dist <= partSpec.outerRadius + 30) {
        laserStateRef.current.isActive = true;
        const pointsToGen = Math.floor(Math.random() * 4) + 3;

        for (let i = 0; i < pointsToGen; i++) {
          const spreadX = (Math.random() - 0.5) * 110;
          const ptX = lx + spreadX;
          const ptY = ly + (Math.random() - 0.5) * 4;

          const pDist = Math.sqrt((ptX - cx) ** 2 + (ptY - cy) ** 2);
          if (pDist <= partSpec.outerRadius + 10) {
            const devVal = (Math.random() - 0.48) * 0.012;
            let color = "#10B981";
            if (devVal > 0.004) color = "#F59E0B";
            if (devVal < -0.004) color = "#3B82F6";

            laserPointsRef.current.push({
              x: ptX,
              y: ptY,
              color: color,
              size: Math.random() * 1.5 + 1,
            });
          }
        }

        if (laserPointsRef.current.length > 1200) {
          laserPointsRef.current.splice(0, 15);
        }

        const pct = Math.min(100, Math.floor((laserPointsRef.current.length / 800) * 100));
        setLaserScanStats(`SCAN: ${pct}%`);
        setPointCount(laserPointsRef.current.length);
      }
    }

    const handleClick = (e: MouseEvent) => {
      handleProbeInteraction(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleLaserMovement(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      laserStateRef.current.isActive = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        if (modeRef.current === "probe") {
          handleProbeInteraction(t.clientX, t.clientY);
        } else {
          handleLaserMovement(t.clientX, t.clientY);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handleLaserMovement(t.clientX, t.clientY);
      }
    };

    const handleTouchEnd = () => {
      laserStateRef.current.isActive = false;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("click", handleClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [theme, triggerProbePointRegistration, updateDROState]);

  return (
    <section
      id="simulation"
      className="py-24 border-t border-b border-slate-800 bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Simulator Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-2">
              INTERACTIVE DEMONSTRATION
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Measure It. Scan It. Understand It.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Real-time tactile ruby probing and high-density blue laser optical scanning
              simulation.
            </p>
          </div>

          {/* Mode Buttons & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="simModeProbe"
              onClick={() => setCurrentMode("probe")}
              className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all min-h-[38px] ${
                currentMode === "probe"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)]"
              }`}
              aria-label="Switch to CMM Probe Mode"
            >
              Probe Mode
            </button>
            <button
              id="simModeScan"
              onClick={() => setCurrentMode("laser")}
              className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all min-h-[38px] ${
                currentMode === "laser"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)]"
              }`}
              aria-label="Switch to Laser Scan Mode"
            >
              Laser Scan
            </button>
            <button
              id="toggleHeatmapBtn"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3.5 py-2.5 rounded-lg font-mono text-xs transition-all min-h-[38px] ${
                showHeatmap
                  ? "border border-blue-500 bg-blue-500/10 text-blue-500 font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)]"
              }`}
              title="Toggle Deviation Colormap"
            >
              Heatmap
            </button>
            <button
              id="autoRunRoutineBtn"
              onClick={runAutomatedRoutine}
              className="px-3.5 py-2.5 rounded-lg font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all min-h-[38px]"
              title="Run 6-Hole PCD Routine"
            >
              Auto Demo
            </button>
          </div>
        </div>

        {/* Main Canvas Viewport */}
        <div className="metrology-panel p-4 sm:p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2.5 px-1 gap-1">
            <span id="canvasModeTitle" className="font-semibold truncate">
              {currentMode === "probe"
                ? "CMM TACTILE TOUCH PROBE (RUBY STYLUS 4mm)"
                : "HIGH-SPEED 3D BLUE LASER LINE SCANNER"}
            </span>
            <span id="simStatusText" className="text-blue-500 shrink-0 font-medium">
              {currentMode === "probe"
                ? "Click part to record CMM point"
                : "Drag cursor across surface to stream 3D point cloud"}
            </span>
          </div>

          <div className="h-[340px] sm:h-[440px] rounded-lg bg-black/95 overflow-hidden relative border border-slate-800">
            <canvas
              ref={canvasRef}
              id="simCanvas"
              className="w-full h-full cursor-crosshair"
            />
          </div>

          {/* Clean DRO Display Strip */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-dim)] block uppercase font-mono tracking-wide">
                X Coordinate
              </span>
              <span id="droX" className="text-sm sm:text-base font-bold text-white mt-0.5 block truncate">
                {dro.x} mm
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-dim)] block uppercase font-mono tracking-wide">
                Y Coordinate
              </span>
              <span id="droY" className="text-sm sm:text-base font-bold text-white mt-0.5 block truncate">
                {dro.y} mm
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-dim)] block uppercase font-mono tracking-wide">
                Z Height
              </span>
              <span id="droZ" className="text-sm sm:text-base font-bold text-white mt-0.5 block truncate">
                {dro.z} mm
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--bg-dro)] border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-dim)] block uppercase font-mono tracking-wide">
                Micro-Deviation
              </span>
              <span
                id="droDev"
                className="text-sm sm:text-base font-bold mt-0.5 block truncate"
                style={{ color: dro.devColor }}
              >
                {dro.dev} mm
              </span>
            </div>
          </div>

          {/* Compact Bottom Line: Points & Clear Action */}
          <div className="mt-3.5 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-1">
            <div>
              POINTS:{" "}
              <span id="simPointCount" className="text-[var(--text-main)] font-bold">
                {pointCount}
              </span>{" "}
              | <span id="laserScanStats">{laserScanStats}</span>
            </div>
            <button
              id="clearSimPointsBtn"
              onClick={clearSimulatorData}
              className="text-red-500 hover:text-red-400 transition-colors font-medium p-1"
            >
              Reset Data
            </button>
          </div>
        </div>

        {/* Legal Metrology Disclaimer */}
        <div className="mt-3 text-xs font-mono text-[var(--text-dim)] text-center">
          *Interactive Metrology Demonstration — Simulated measurement data for engineering
          illustration.
        </div>
      </div>
    </section>
  );
};

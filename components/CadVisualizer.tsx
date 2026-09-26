"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

export const CadVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coordReadout, setCoordReadout] = useState("X 125.483 mm   Y 48.201 mm   Z 12.904 mm   DEV +0.008 mm");
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let crosshairX = 140;
    let crosshairY = 110;
    let targetX = 140;
    let targetY = 110;
    let animationId: number;
    let intervalId: NodeJS.Timeout;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth || 400;
      height = canvas.parentElement.offsetHeight || 260;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx?.scale(dpr, dpr);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const primaryColor = isLight ? "#0052FF" : "#00C8FF";
      const wireColor = isLight ? "rgba(0, 82, 255, 0.35)" : "rgba(0, 200, 255, 0.4)";

      // Background Grid
      ctx.strokeStyle = isLight ? "rgba(0, 82, 255, 0.06)" : "rgba(0, 200, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
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
      ctx.moveTo(cx - 70, cy - 20);
      ctx.lineTo(cx - 70, cy + 30);
      ctx.moveTo(cx, cy + 15);
      ctx.lineTo(cx, cy + 65);
      ctx.moveTo(cx + 80, cy - 25);
      ctx.lineTo(cx + 80, cy + 25);
      ctx.stroke();

      // Cylindrical Boss Bore
      ctx.beginPath();
      ctx.ellipse(cx + 10, cy - 20, 24, 12, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Smooth Crosshair Interpolation
      crosshairX += (targetX - crosshairX) * 0.08;
      crosshairY += (targetY - crosshairY) * 0.08;

      // Draw Precision Crosshairs
      ctx.strokeStyle = "#EF4444";
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

      setCoordReadout(`X ${mmX} mm   Y ${mmY} mm   Z ${mmZ} mm   DEV +0.008 mm`);

      animationId = requestAnimationFrame(draw);
    }

    intervalId = setInterval(() => {
      const cx = width / 2;
      const cy = height / 2;
      targetX = cx + (Math.random() - 0.5) * 90;
      targetY = cy + (Math.random() - 0.5) * 60;
    }, 2800);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [theme]);

  return (
    <div className="metrology-panel p-5 border border-slate-800">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800 mb-3">
        <span>CAD_VERIFY_VIEWPORT</span>
        <span className="text-blue-500 font-semibold">LIVE DRO</span>
      </div>

      <div className="h-64 rounded-lg bg-black/80 flex items-center justify-center relative overflow-hidden">
        <canvas
          ref={canvasRef}
          id="cadVisualizerCanvas"
          className="w-full h-full cursor-crosshair"
        />
      </div>

      <div className="mt-4 p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
        <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
          <span>ACTIVE PROBING TARGET</span>
          <span className="text-blue-400 font-bold">±0.010 mm</span>
        </div>
        <div
          id="cadCoordReadout"
          className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wider"
        >
          {coordReadout}
        </div>
      </div>
    </div>
  );
};

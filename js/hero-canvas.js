/**
 * PROFLIC Technologies — Hero Interactive Canvas
 * 3D CAD Wireframe + Optical Laser Sweep + Coordinate Axes + Point Cloud
 * High DPI sharp rendering with calm, elegant motion and mouse tilt parallax.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = null;
  let isVisible = true;

  // Interaction State
  let targetRotX = 0.32;
  let targetRotY = 0.45;
  let rotX = 0.32;
  let rotY = 0.45;
  let mouseActive = false;

  // Scanning Sweep State (Calm, purposeful movement)
  let laserPlaneZ = -60;
  const laserSpeed = 0.45;

  // 3D Geometry Definition (Industrial Impeller / Precision Flange Core)
  const cadNodes = [];
  const cadEdges = [];
  const pointCloud = [];

  function buildCadModel() {
    cadNodes.length = 0;
    cadEdges.length = 0;
    pointCloud.length = 0;

    // Outer Cylindrical Ribs
    const rings = 4;
    const ringRadius = [130, 110, 85, 45];
    const ringZ = [-45, -15, 20, 50];

    const segs = 16;
    for (let r = 0; r < rings; r++) {
      const rad = ringRadius[r];
      const z = ringZ[r];
      const startIndex = cadNodes.length;

      for (let s = 0; s < segs; s++) {
        const theta = (s / segs) * Math.PI * 2;
        const x = Math.cos(theta) * rad;
        const y = Math.sin(theta) * rad;
        cadNodes.push({ x, y, z });

        // Circular edge
        if (s > 0) {
          cadEdges.push([startIndex + s - 1, startIndex + s]);
        }
        if (s === segs - 1) {
          cadEdges.push([startIndex + s, startIndex]);
        }

        // Longitudinal edge connecting to previous ring
        if (r > 0) {
          cadEdges.push([startIndex - segs + s, startIndex + s]);
        }
      }
    }

    // Add 6 Bolt Holes (Circular Datum features)
    const holeRadius = 14;
    const boltCircleRadius = 110;
    const holeCount = 6;
    for (let h = 0; h < holeCount; h++) {
      const angle = (h / holeCount) * Math.PI * 2;
      const hx = Math.cos(angle) * boltCircleRadius;
      const hy = Math.sin(angle) * boltCircleRadius;
      const startHole = cadNodes.length;
      const holeSegs = 8;
      for (let hs = 0; hs < holeSegs; hs++) {
        const ha = (hs / holeSegs) * Math.PI * 2;
        cadNodes.push({
          x: hx + Math.cos(ha) * holeRadius,
          y: hy + Math.sin(ha) * holeRadius,
          z: ringZ[1]
        });
        if (hs > 0) cadEdges.push([startHole + hs - 1, startHole + hs]);
        if (hs === holeSegs - 1) cadEdges.push([startHole + hs, startHole]);
      }
    }

    // Generate Surface Point Cloud for Laser Scanning Simulation (moderate count for clean elegance)
    const totalPoints = 220;
    for (let i = 0; i < totalPoints; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const ringIdx = Math.floor(Math.random() * rings);
      const rad = ringRadius[ringIdx] * (0.85 + Math.random() * 0.25);
      const z = ringZ[0] + u * (ringZ[rings - 1] - ringZ[0]);

      pointCloud.push({
        x: Math.cos(theta) * rad + (Math.random() - 0.5) * 4,
        y: Math.sin(theta) * rad + (Math.random() - 0.5) * 4,
        z: z + (Math.random() - 0.5) * 3,
        deviation: (Math.random() - 0.48) * 0.014,
        baseAlpha: 0.25 + Math.random() * 0.35
      });
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.parentElement.offsetHeight || 600;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  // 3D Projection Engine
  function project(p, cx, cy, scale) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = p.x * cosY + p.z * sinY;
    const z1 = -p.x * sinY + p.z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;

    const fov = 480;
    const distance = 420;
    const depth = fov / (fov + z2 + distance);

    return {
      x: cx + x1 * depth * scale,
      y: cy + y2 * depth * scale,
      depth: z2,
      scale: depth * scale
    };
  }

  function render() {
    if (!isVisible) {
      animationId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.classList.contains('light');
    const primaryColor = isLight ? '#0052FF' : '#00C8FF';
    const wireColor = isLight ? 'rgba(0, 82, 255, 0.22)' : 'rgba(0, 200, 255, 0.24)';

    // Dynamic placement: on desktop, offset subtly to the right; on mobile, centered
    const isDesktop = width >= 1024;
    const cx = isDesktop ? width * 0.65 : width * 0.5;
    const cy = isDesktop ? height * 0.5 : height * 0.52;
    const scale = width > 768 ? (isDesktop ? 1.02 : 0.85) : 0.65;

    // Smooth calm rotation
    if (!mouseActive) {
      targetRotY += 0.0012;
    }
    rotX += (targetRotX - rotX) * 0.04;
    rotY += (targetRotY - rotY) * 0.04;

    // Slow, purposeful laser plane sweep
    laserPlaneZ += laserSpeed;
    if (laserPlaneZ > 70) {
      laserPlaneZ = -60;
    }

    // 1. Draw 3D Coordinate Reference Axes (Minimal Origin Marker)
    const origin3D = project({ x: 0, y: 0, z: 0 }, cx, cy, scale);
    const axisLen = 50;
    const axisX = project({ x: axisLen, y: 0, z: 0 }, cx, cy, scale);
    const axisY = project({ x: 0, y: axisLen, z: 0 }, cx, cy, scale);
    const axisZ = project({ x: 0, y: 0, z: axisLen }, cx, cy, scale);

    // X Axis
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin3D.x, origin3D.y);
    ctx.lineTo(axisX.x, axisX.y);
    ctx.stroke();

    // Y Axis
    ctx.strokeStyle = '#10B981';
    ctx.beginPath();
    ctx.moveTo(origin3D.x, origin3D.y);
    ctx.lineTo(axisY.x, axisY.y);
    ctx.stroke();

    // Z Axis
    ctx.strokeStyle = primaryColor;
    ctx.beginPath();
    ctx.moveTo(origin3D.x, origin3D.y);
    ctx.lineTo(axisZ.x, axisZ.y);
    ctx.stroke();

    // Axis Labels
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#EF4444';
    ctx.fillText('X', axisX.x + 3, axisX.y);
    ctx.fillStyle = '#10B981';
    ctx.fillText('Y', axisY.x + 3, axisY.y);
    ctx.fillStyle = primaryColor;
    ctx.fillText('Z', axisZ.x + 3, axisZ.y);

    // 2. Project and Draw CAD Wireframe Edges
    const projectedNodes = cadNodes.map(n => project(n, cx, cy, scale));

    ctx.strokeStyle = wireColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < cadEdges.length; i++) {
      const [n1, n2] = cadEdges[i];
      const p1 = projectedNodes[n1];
      const p2 = projectedNodes[n2];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    // 3. Project and Draw Point Cloud (Subtle Laser Triangulation)
    for (let i = 0; i < pointCloud.length; i++) {
      const pt = pointCloud[i];
      const p = project(pt, cx, cy, scale);

      const distToLaser = Math.abs(pt.z - laserPlaneZ);
      const isScanned = distToLaser < 10;

      let ptColor;
      let ptRadius = 1.5;

      if (isScanned) {
        ptColor = isLight ? '#0052FF' : '#00E5FF';
        ptRadius = 2.2;
      } else if (pt.deviation > 0.004) {
        ptColor = '#F59E0B';
      } else if (pt.deviation < -0.004) {
        ptColor = '#3B82F6';
      } else {
        ptColor = '#10B981';
      }

      ctx.fillStyle = ptColor;
      ctx.globalAlpha = isScanned ? 0.95 : pt.baseAlpha * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, ptRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 4. Draw Sweeping Laser Line (Sheet of Light)
    const laserTop = project({ x: -130, y: 0, z: laserPlaneZ }, cx, cy, scale);
    const laserBottom = project({ x: 130, y: 0, z: laserPlaneZ }, cx, cy, scale);

    const laserGradient = ctx.createLinearGradient(laserTop.x, laserTop.y, laserBottom.x, laserBottom.y);
    laserGradient.addColorStop(0, 'rgba(0, 229, 255, 0)');
    laserGradient.addColorStop(0.5, isLight ? 'rgba(0, 82, 255, 0.75)' : 'rgba(0, 229, 255, 0.8)');
    laserGradient.addColorStop(1, 'rgba(0, 229, 255, 0)');

    ctx.strokeStyle = laserGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(laserTop.x, laserTop.y);
    ctx.lineTo(laserBottom.x, laserBottom.y);
    ctx.stroke();

    animationId = requestAnimationFrame(render);
  }

  // Pointer Interaction (Subtle, restrained)
  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;

    targetRotY = normX * 0.9;
    targetRotX = 0.32 + normY * 0.45;
    mouseActive = true;
  }

  function onPointerLeave() {
    mouseActive = false;
  }

  // Lifecycle
  function init() {
    buildCadModel();
    resize();
    render();

    window.addEventListener('resize', () => {
      resize();
      buildCadModel();
    });

    canvas.addEventListener('mousemove', onPointerMove, { passive: true });
    canvas.addEventListener('mouseleave', onPointerLeave);
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('proflic:theme-changed', () => {
      // Repaint with new theme tokens
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

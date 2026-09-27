export interface AboutCapability {
  title: string;
  description: string;
}

export const aboutData = {
  eyebrow: "ABOUT PROFLIC TECHNOLOGIES",
  heading: "Engineering Precision at the Micron Scale",
  leadText:
    "PROFLIC Technologies is an advanced industrial metrology and precision quality engineering firm based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India. We bridge the gap between physical manufacturing and digital CAD data using coordinate measuring machines (CMM), high-speed 3D laser scanners, and dedicated offline programming software.",
  supportingText:
    "Whether verifying critical aerospace castings, automotive dies, sheet metal stampings, or precision machined components, our metrology engineers deliver actionable ASME Y14.5 GD&T inspection reports, certified AS9102 FAIR packages, and turnkey offline CMM routines in PC-DMIS and PolyWorks.",
  capabilities: [
    {
      title: "On-site Portable CMM Inspection",
      description: "Precision dimensional inspection and 24/7 mobile articulation arm dispatch across Maharashtra",
    },
    {
      title: "Industrial 3D Laser Scanning",
      description: "High-density blue laser optical scanning, point cloud capture, and surface deviation analysis",
    },
    {
      title: "Scan-to-CAD Reverse Engineering",
      description: "Convert physical parts, tooling dies, and STL scan meshes into parametric 3D CAD models (STEP/IGES/NX/SolidWorks)",
    },
    {
      title: "Quality Assurance & FAIR / PPAP Reports",
      description: "Comprehensive quality documentation including AS9102 First Article Inspection Reports, PPAP packages, and Gauge R&R",
    },
    {
      title: "2D Drafting & 3D CAD Design",
      description: "Precision mechanical drafting, blueprint creation with GD&T datum callouts, and parametric modeling",
    },
    {
      title: "CMM Programming & Metrology Training",
      description: "Hands-on corporate training in PC-DMIS, PolyWorks, CMM operation, and ASME Y14.5 GD&T fundamentals",
    },
    {
      title: "3D Printing & Rapid Prototyping",
      description: "Rapid physical prototyping and form-fit validation directly from digital 3D CAD models",
    },
    {
      title: "Offline CMM Programming Support",
      description: "Turnkey DCC offline scripting in PC-DMIS & PolyWorks, cycle time reduction, and collision-free probe simulation",
    },
  ] as AboutCapability[],
};

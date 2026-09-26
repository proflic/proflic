export interface AboutCapability {
  title: string;
  description: string;
}

export const aboutData = {
  eyebrow: "ABOUT PROFLIC TECHNOLOGIES",
  heading: "Engineering Precision at the Micron Scale",
  leadText: "PROFLIC Technologies is an advanced industrial metrology and precision quality engineering firm. We bridge the gap between physical manufacturing and digital CAD data using coordinate measuring machines, high-speed 3D laser scanners, and dedicated offline programming software.",
  supportingText: "Whether verifying critical aerospace castings, automotive dies, or medical components, our engineers deliver actionable GD&T inspection reports and turnkey offline CMM routines in PC-DMIS and PolyWorks.",
  capabilities: [
    {
      title: "On-site CMM Inspection",
      description: "Accurate dimensional inspection at your facility",
    },
    {
      title: "3D Laser Scanning",
      description: "High-accuracy 3D scanning and surface data capture",
    },
    {
      title: "Reverse Engineering & Modelling",
      description: "Convert scanned data into accurate 3D CAD models",
    },
    {
      title: "Quality Assurance",
      description: "Inspection documentation and quality reporting (FAIR & PPAP Reports)",
    },
    {
      title: "2D/3D Design",
      description: "Precision drafting and 3D CAD design solutions",
    },
    {
      title: "CMM Training",
      description: "Practical training for CMM operation and programming",
    },
    {
      title: "3D Printing",
      description: "Rapid prototyping from digital 3D models",
    },
    {
      title: "CMM Programming Support & Consultancy",
      description: "Expert support for CMM programming and inspection workflows (PC-DMIS, PolyWorks, RDMIS)",
    },
  ] as AboutCapability[],
};

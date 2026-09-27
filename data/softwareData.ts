export interface SoftwareItem {
  title: string;
  description: string;
  features: string[];
}

export const softwareData = {
  eyebrow: "ENGINEERING PLATFORMS",
  heading: "Built Around Industry-Standard CMM & Metrology Tools",
  subtitle: "Industry-standard coordinate measuring machine (CMM) offline programming, 3D laser scanning inspection, and CAD engineering software.",
  platforms: [
    {
      title: "PC-DMIS CAD++",
      description: "Advanced offline CMM programming, collision-free DCC probe path simulation, and automated inspection scripting for Hexagon bridge CMMs and articulated arms.",
      features: [
        "01. Iterative, 3-2-1 & Best-Fit CAD Datum Alignments",
        "02. Collision-Free DCC Probe Path & Angle Simulation (Renishaw PH10/PH20)",
        "03. Automated ASME Y14.5 GD&T Feature Evaluation & Excel Export",
      ],
    },
    {
      title: "PolyWorks|Inspector™",
      description: "Universal 3D optical metrology platform for high-density laser point cloud alignments, color deviation heatmaps, and complex freeform surface quality inspections.",
      features: [
        "01. High-Density Optical & Blue Laser 3D Point Cloud Capture",
        "02. Best-Fit Surface-to-CAD Deviation Heatmap Rendering",
        "03. Cross-Sectional Tolerancing & Full AS9102 / PPAP Quality Reporting",
      ],
    },
  ] as SoftwareItem[],
};

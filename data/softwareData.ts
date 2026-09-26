export interface SoftwareItem {
  title: string;
  description: string;
  features: string[];
}

export const softwareData = {
  eyebrow: "ENGINEERING PLATFORMS",
  heading: "Built Around Industry-Standard Tools",
  subtitle: "Industry-standard CMM offline programming and 3D scanning inspection software.",
  platforms: [
    {
      title: "PC-DMIS CAD++",
      description: "Creation and optimization of collision-free offline measurement scripts for Hexagon bridge CMMs before machine loading.",
      features: [
        "01. Iterative 3-2-1 CAD Datum Alignment",
        "02. Collision-Free DCC Probe Path Simulation",
      ],
    },
    {
      title: "PolyWorks|Inspector™",
      description: "Universal 3D metrology platform for point cloud alignments, color deviation maps, and complex freeform surface inspections.",
      features: [
        "01. High-Density Optical Point Cloud Capture",
        "02. Best-Fit Surface-to-CAD Alignment",
        "03. 3D Color Deviation Heatmap Rendering",
      ],
    },
  ] as SoftwareItem[],
};

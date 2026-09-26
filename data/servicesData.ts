export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "inspection" | "programming" | "cad";
  categoryLabel: string;
  shortDescription: string;
  description: string;
  visualType: "faro_arm" | "blue_laser" | "pcdmis_code" | "reverse_cad" | "gdt_frame" | "collision_avoidance" | "cad_fixture";
  equipment: string;
  standards: string;
  overview: string;
  capabilities: string[];
  deliverables: string;
  featured?: boolean;
}

export type ServiceSpec = ServiceItem;
export type ServiceCardData = ServiceItem;

export const serviceFilters = [
  { id: "all", label: "All Services" },
  { id: "inspection", label: "Dimensional & Scanning" },
  { id: "programming", label: "CMM Programming" },
  { id: "cad", label: "CAD & Reverse Engineering" },
];

export const cadServiceData = {
  title: "2D & 3D CAD Design",
  description: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
  exploreKey: "cad",
  buttonText: "Explore 2D/3D CAD",
};

export const servicesData: ServiceItem[] = [
  {
    id: "onsite",
    slug: "on-site-cmm-inspection",
    title: "On-Site CMM Inspection",
    category: "inspection",
    categoryLabel: "Shop-Floor Metrology",
    shortDescription: "Portable articulation arms deployed directly to your machine shop floor for in-situ verification without part transit risk.",
    description: "Portable articulation arms deployed directly to your machine shop floor for in-situ verification without part transit risk.",
    visualType: "faro_arm",
    equipment: "Portable Articulated Arms (FaroArm Platinum/Edge / Hexagon Romer Absolute), Optical Trackers",
    standards: "ASME Y14.5-2018, ISO 10360-12, ISO 1101",
    overview: "Deploys high-precision multi-axis portable inspection arms directly to your manufacturing facility, machine tool spindle, or assembly line. Eliminates part transit risk, crane rig delays, and machine downtime for oversized weldments and precision castings.",
    capabilities: [
      "Shop-floor in-situ inspection on CNC machine beds before unclamping",
      "Large volume assembly and structural frame alignment",
      "Direct CAD-to-part live inspection with real-time audio guidance",
      "Rapid turn-around dimensional reports with zero shipping delays",
    ],
    deliverables: "Instant PDF / Excel Inspection Report, Bubble Drawing, Deviation CSV",
    featured: true,
  },
  {
    id: "scanning",
    slug: "3d-laser-scanning-inspection",
    title: "3D Scanning & Inspection",
    category: "inspection",
    categoryLabel: "Optical Laser Metrology",
    shortDescription: "High-density blue laser optical scanning combined with touch probing for full surface deviation heatmaps and hole tolerances.",
    description: "High-density blue laser optical scanning combined with touch probing for full surface deviation heatmaps and hole tolerances.",
    visualType: "blue_laser",
    equipment: "High-Density Blue Laser Line Scanners (2,000,000 pts/sec), Photogrammetry Systems",
    standards: "VDI/VDE 2634 Part 2/3, ASME Y14.5M, ISO 17025 Ready Methodology",
    overview: "Synchronizes high-speed non-contact optical laser scanning with tactile touch-probing to capture both organic freeform surfaces and tight-tolerance prismatic bores with sub-micron repeatability.",
    capabilities: [
      "High-density point cloud acquisition on dark, reflective, or flexible parts",
      "Full 3D surface color deviation heatmaps mapped to nominal CAD models",
      "Wall-thickness analysis and critical turbine blade profile inspection",
      "Non-destructive reverse engineering and prototype validation",
    ],
    deliverables: "Raw Point Cloud (.pts, .asc), PolyWorks Clean STL Mesh, Color Inspection PDF",
    featured: true,
  },
  {
    id: "training",
    slug: "cmm-programming-training",
    title: "CMM Programming Training",
    category: "programming",
    categoryLabel: "Software Certification",
    shortDescription: "Hands-on corporate industrial training for quality engineers on PC-DMIS and PolyWorks offline scripting and GD&T logic.",
    description: "Hands-on corporate industrial training for quality engineers on PC-DMIS and PolyWorks offline scripting and GD&T logic.",
    visualType: "pcdmis_code",
    equipment: "PC-DMIS CAD++, PolyWorks Inspector Suite, Offline Simulation Rigs",
    standards: "ASME Y14.5-2018 GD&T Fundamentals, ISO 1101 Geometric Verification",
    overview: "Comprehensive industrial training tailored for Quality Managers, Metrologists, and CMM Operators. Master hands-on offline programming, probe head cluster angles, automated loop routines, and collision-free clearance paths.",
    capabilities: [
      "Iterative, 3-2-1, and Best-Fit coordinate alignment strategies",
      "True Position ⌖, Maximum Material Condition (MMC) datum shifts, and Profile tolerances",
      "Parametric variable coding, loop structures, and automated Excel reporting scripts",
      "Probe qualification, star clusters, stylus change racks, and calibration workflows",
    ],
    deliverables: "Training Syllabus, Practice CAD Models, Course Completion Certification",
  },
  {
    id: "reverse",
    slug: "reverse-engineering-cad",
    title: "Reverse Engineering & CAD",
    category: "cad",
    categoryLabel: "Scan-to-CAD Reconstruction",
    shortDescription: "Transforming raw point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX models.",
    description: "Transforming raw point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX models.",
    visualType: "reverse_cad",
    equipment: "Siemens NX, SolidWorks, PolyWorks Modeler, Geomagic Design X",
    standards: "STEP AP242 / AP214, IGES 5.3, Parasolid (.x_t)",
    overview: "Transforms complex physical parts, worn stamping dies, tooling fixtures, or legacy components without blueprints into fully editable, parametric feature-based CAD solid models ready for immediate CNC machining.",
    capabilities: [
      "Conversion of noisy polygon STL meshes into Class-A NURBS surfaces",
      "Native parametric feature trees with sketch constraints and design intent",
      "Tool & die wear compensation and remanufacturing engineering",
      "Full 2D manufacturing drawings with ASME Y14.5 GD&T datum callouts",
    ],
    deliverables: "Parametric SolidWorks / NX Files, Neutral STEP/IGES, 2D Production Blueprints",
    featured: true,
  },
  {
    id: "dimensional",
    slug: "dimensional-inspection",
    title: "Dimensional Inspection",
    category: "inspection",
    categoryLabel: "Quality Assurance",
    shortDescription: "Complete quality assurance verification delivering First Article Inspection Reports (FAIR AS9102), PPAP packages, and Gauge R&R studies.",
    description: "Complete quality assurance verification delivering First Article Inspection Reports (FAIR AS9102), PPAP packages, and Gauge R&R studies.",
    visualType: "gdt_frame",
    equipment: "High-Precision Bridge CMMs, Micro-Hite Gauges, Optical Comparators",
    standards: "AS9102 FAIR Standard, PPAP Level 1–5, AIAG MSA Gauge R&R",
    overview: "Comprehensive quality control verification certifying manufactured components against blueprint tolerance limits. Validates prototype batches, production run sampling, and supplier parts.",
    capabilities: [
      "AS9102 Aerospace First Article Inspection Reports (FAIR Form 1, 2, 3)",
      "Automotive Production Part Approval Process (PPAP) dimensional data packages",
      "Gauge Repeatability & Reproducibility (Gauge R&R) measurement system analysis",
      "Pass/Fail statistical process control (SPC) data logging",
    ],
    deliverables: "Formal AS9102 FAIR Report, PPAP Package, Certified Measurement Certificate",
  },
  {
    id: "consultancy",
    slug: "cmm-programming-support",
    title: "CMM Programming Support",
    category: "programming",
    categoryLabel: "Turnkey DCC Scripting",
    shortDescription: "Turnkey DCC offline scripting, probe angle indexing, and program debugging reducing measurement cycle times up to 40%.",
    description: "Turnkey DCC offline scripting, probe angle indexing, and program debugging reducing measurement cycle times up to 40%.",
    visualType: "collision_avoidance",
    equipment: "PC-DMIS Offline DCC, PolyWorks Scripting Engine, Renishaw PH10/PH20",
    standards: "DMIS Standard Protocol, ASME Y14.5 Geometric Tolerancing",
    overview: "Senior offline programming support creating turnkey, collision-free CMM inspection routines before parts reach the shop floor. We eliminate machine bottlenecks, optimize probe head rotation angles, and reduce cycle times up to 40%.",
    capabilities: [
      "DCC offline path simulation with full CAD fixture and clamp collision checking",
      "Custom scripting for automatic statistical data export to ERP/QMS databases",
      "Multi-probe cluster calibration routines for complex deep bores and undercuts",
      "Debugging and optimization of legacy CMM scripts",
    ],
    deliverables: "Turnkey Program File (.prg, .pwk), Setup Sheet with Probe & Part Zero Guide",
  },
  {
    id: "cad",
    slug: "2d-3d-cad-design",
    title: "2D & 3D CAD Design",
    category: "cad",
    categoryLabel: "CAD & Drafting Engineering",
    shortDescription: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
    description: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
    visualType: "cad_fixture",
    equipment: "Siemens NX, SolidWorks, Autodesk Inventor, AutoCAD",
    standards: "ASME Y14.5 Dimensioning & Tolerancing, ISO 128 Technical Drawings",
    overview: "Engineering design and drafting of 2D engineering drawings and 3D CAD solid models engineered for manufacturing precision, kinematic repeatability, and CMM inspection workflows.",
    capabilities: [
      "2D manufacturing blueprints with complete GD&T tolerancing and ballooning",
      "Parametric 3D CAD solid modeling and detailed mechanical drafting",
      "Specialized design solutions for sheet metal, plastic molded, and machined parts",
      "Full assembly models for seamless CMM path planning and CNC machining",
    ],
    deliverables: "Complete 3D CAD Assembly (STEP/IGES), 2D Fabrication Drawings (PDF/DWG), BOM",
  },
];

export const serviceSpecsData: Record<string, ServiceItem> = servicesData.reduce(
  (acc, service) => {
    acc[service.id] = service;
    acc[service.slug] = service;
    return acc;
  },
  {} as Record<string, ServiceItem>
);

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData.find((s) => s.slug === slug || s.id === slug);
};

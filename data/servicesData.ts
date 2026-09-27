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
  { id: "all", label: "All Metrology Services" },
  { id: "inspection", label: "CMM & 3D Laser Inspection" },
  { id: "programming", label: "CMM Programming" },
  { id: "cad", label: "CAD & Reverse Engineering" },
];

export const cadServiceData = {
  title: "2D Drafting & 3D Mechanical CAD Design",
  description: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
  exploreKey: "cad",
  buttonText: "Explore 2D/3D CAD",
};

export const servicesData: ServiceItem[] = [
  {
    id: "onsite",
    slug: "on-site-cmm-inspection",
    title: "On-Site Portable CMM Inspection",
    category: "inspection",
    categoryLabel: "Shop-Floor Metrology",
    shortDescription: "Portable articulated CMM arms deployed directly to your machine shop floor for in-situ dimensional inspection without part transit risk.",
    description: "Portable articulated CMM arms deployed directly to your machine shop floor across Chhatrapati Sambhajinagar, Pune, and Maharashtra for in-situ dimensional verification without part transit risk.",
    visualType: "faro_arm",
    equipment: "Portable Multi-Axis Articulated Arms (FaroArm Platinum/Edge / Hexagon Romer Absolute), Touch Probes & Optical Trackers",
    standards: "ASME Y14.5-2018, ISO 10360-12, ISO 1101 Geometric Tolerancing",
    overview: "Deploys high-precision multi-axis portable CMM inspection arms directly to your manufacturing plant, CNC machine tool bed, or assembly line. Eliminates part transit risks, crane rigging delays, and machining downtime for oversized tooling, heavy weldments, and precision castings.",
    capabilities: [
      "In-situ dimensional inspection on CNC machine beds before unclamping",
      "Large-volume assembly alignment, fixture qualification, and structural frame verification",
      "Real-time CAD-to-part live inspection with visual/audio guidance",
      "Fast-turnaround dimensional inspection reports with zero transit delays across Maharashtra",
    ],
    deliverables: "Certified PDF / Excel Inspection Report, Bubble Drawing, Point Deviation CSV",
    featured: true,
  },
  {
    id: "scanning",
    slug: "3d-laser-scanning-inspection",
    title: "3D Laser Scanning & Optical Inspection",
    category: "inspection",
    categoryLabel: "Optical Laser Metrology",
    shortDescription: "High-density blue laser optical 3D scanning combined with touch probing for full surface deviation heatmaps and hole tolerances.",
    description: "High-density blue laser optical 3D scanning combined with tactile touch probing for full surface deviation heatmaps, hole tolerances, and point cloud capture.",
    visualType: "blue_laser",
    equipment: "High-Density Blue Laser Line 3D Scanners (2,000,000 pts/sec), Non-Contact Photogrammetry Systems",
    standards: "VDI/VDE 2634 Part 2/3, ASME Y14.5M, ISO 17025 Ready Metrology Methodology",
    overview: "Synchronizes high-speed non-contact optical blue laser scanning with tactile touch-probing to capture organic freeform contours, stamping dies, turbine blades, and tight-tolerance prismatic features with micrometric repeatability.",
    capabilities: [
      "High-density 3D point cloud acquisition on dark, reflective, machined, or flexible surfaces",
      "Full 3D surface color deviation heatmaps mapped directly to nominal CAD models",
      "Wall-thickness analysis, cross-sectional blade profile analysis, and flush/gap inspection",
      "Non-destructive 3D inspection scanning for first-article verification and prototype validation",
    ],
    deliverables: "Cleaned PolyWorks STL Mesh, Raw Point Cloud (.pts, .asc), 3D Color Deviation Inspection PDF",
    featured: true,
  },
  {
    id: "training",
    slug: "cmm-programming-training",
    title: "CMM Programming & Metrology Training",
    category: "programming",
    categoryLabel: "Industrial Training",
    shortDescription: "Hands-on corporate industrial training for quality engineers on PC-DMIS and PolyWorks offline scripting and GD&T logic.",
    description: "Hands-on corporate industrial training for quality engineers and CMM operators on PC-DMIS and PolyWorks offline scripting and GD&T logic.",
    visualType: "pcdmis_code",
    equipment: "PC-DMIS CAD++, PolyWorks|Inspector Suite, CMM Offline Simulation Rigs",
    standards: "ASME Y14.5-2018 GD&T Fundamentals, ISO 1101 Geometric Verification",
    overview: "Comprehensive industrial metrology training tailored for Quality Managers, Metrologists, and CMM Operators. Master hands-on offline programming, probe head cluster angles, automated loop routines, datum alignment strategies, and collision-free clearance paths.",
    capabilities: [
      "Iterative, 3-2-1, and Best-Fit CAD datum coordinate alignment strategies",
      "True Position ⌖, MMC/LMC datum modifier shifts, and Profile of a Surface tolerances",
      "Parametric variable coding, loop structures, and automated Excel quality reporting scripts",
      "Probe qualification, star stylus cluster calibration, and rack change workflows",
    ],
    deliverables: "Training Curriculum Syllabus, Practical CAD Test Parts, Course Completion Certificate",
  },
  {
    id: "reverse",
    slug: "reverse-engineering-cad",
    title: "Scan-to-CAD Reverse Engineering",
    category: "cad",
    categoryLabel: "Scan-to-CAD Reconstruction",
    shortDescription: "Transforming raw 3D scan point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX models.",
    description: "Transforming raw 3D scan point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX 3D CAD models.",
    visualType: "reverse_cad",
    equipment: "Siemens NX, SolidWorks, PolyWorks Modeler, Geomagic Design X",
    standards: "STEP AP242 / AP214, IGES 5.3, Parasolid (.x_t)",
    overview: "Transforms complex physical parts, worn stamping dies, legacy tooling, castings, or components without existing drawings into fully editable, parametric feature-based 3D CAD solid models ready for immediate CNC machining and tooling reproduction.",
    capabilities: [
      "Conversion of raw polygon STL meshes into Class-A NURBS surfaces and solid geometry",
      "Native parametric feature trees with fully constrained sketches and design intent",
      "Tool, mold, and die wear compensation and remanufacturing engineering",
      "Complete 2D manufacturing drawings with ASME Y14.5 GD&T datum callouts and BOM",
    ],
    deliverables: "Parametric SolidWorks / Siemens NX Files, Neutral STEP/IGES Models, 2D Production Blueprints",
    featured: true,
  },
  {
    id: "dimensional",
    slug: "dimensional-inspection",
    title: "Dimensional Inspection & QA Reporting",
    category: "inspection",
    categoryLabel: "Quality Assurance",
    shortDescription: "Complete quality assurance verification delivering First Article Inspection Reports (FAIR AS9102), PPAP packages, and Gauge R&R studies.",
    description: "Complete quality assurance verification delivering First Article Inspection Reports (FAIR AS9102), PPAP packages, and Gauge R&R studies.",
    visualType: "gdt_frame",
    equipment: "High-Precision Bridge CMMs, Portable Articulation Arms, Digital Height Gauges, Optical Comparators",
    standards: "AS9102 FAIR Standard (Forms 1, 2, 3), AIAG PPAP Level 1–5, AIAG MSA Gauge R&R",
    overview: "Comprehensive dimensional inspection and quality control certification verifying manufactured components against engineering blueprint tolerances. Validates prototype batches, production run sampling, and supplier parts.",
    capabilities: [
      "Aerospace AS9102 First Article Inspection Reports (FAIR Form 1, Form 2, Form 3)",
      "Automotive Production Part Approval Process (PPAP) dimensional data packages",
      "Gauge Repeatability & Reproducibility (Gauge R&R) measurement system analysis (MSA)",
      "Pass/Fail statistical process control (SPC) data logging and bubble drawing creation",
    ],
    deliverables: "Formal AS9102 FAIR Report, PPAP Documentation Package, Certified Inspection Certificate",
  },
  {
    id: "consultancy",
    slug: "cmm-programming-support",
    title: "Offline CMM Programming Support",
    category: "programming",
    categoryLabel: "Turnkey DCC Scripting",
    shortDescription: "Turnkey DCC offline scripting in PC-DMIS & PolyWorks, probe angle indexing, and program debugging reducing measurement cycle times up to 40%.",
    description: "Turnkey DCC offline scripting in PC-DMIS & PolyWorks, probe angle indexing, and program debugging reducing measurement cycle times up to 40%.",
    visualType: "collision_avoidance",
    equipment: "PC-DMIS Offline DCC, PolyWorks Scripting Engine, Renishaw PH10/PH20 Motorized Probe Heads",
    standards: "DMIS Standard Protocol, ASME Y14.5 Geometric Dimensioning & Tolerancing",
    overview: "Senior offline CMM programming support creating turnkey, collision-free CMM measurement routines before components reach the shop floor. We eliminate machine bottlenecks, optimize probe head rotation angles, and reduce measurement cycle times by up to 40%.",
    capabilities: [
      "DCC offline probe path simulation with full CAD fixture and clamp collision avoidance",
      "Automated custom scripting for direct inspection data export to ERP/QMS databases",
      "Multi-probe cluster calibration routines for deep complex cavities, bores, and undercuts",
      "Legacy CMM program optimization, syntax debugging, and cycle time acceleration",
    ],
    deliverables: "Turnkey CMM Program File (.prg, .pwk), Setup Sheet with Probe & Datum Zero Guide",
  },
  {
    id: "cad",
    slug: "2d-3d-cad-design",
    title: "2D Drafting & 3D CAD Design",
    category: "cad",
    categoryLabel: "CAD & Drafting Engineering",
    shortDescription: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
    description: "Precision drafting, manufacturing blueprints, and 3D CAD modeling solutions engineered for precision manufacturing.",
    visualType: "cad_fixture",
    equipment: "Siemens NX, SolidWorks, Autodesk Inventor, AutoCAD",
    standards: "ASME Y14.5 Dimensioning & Tolerancing, ISO 128 Technical Drawings",
    overview: "Engineering design and drafting of 2D manufacturing drawings and 3D CAD solid models engineered for manufacturing precision, kinematic repeatability, inspection fixturing, and CMM workflows.",
    capabilities: [
      "2D manufacturing blueprints with complete GD&T tolerancing and ballooned callouts",
      "Parametric 3D CAD solid modeling and detailed mechanical component drafting",
      "Design solutions for sheet metal, plastic injection molded, forged, and CNC machined parts",
      "Full 3D assembly models for seamless CMM path planning, fixture design, and CNC machining",
    ],
    deliverables: "Complete 3D CAD Assembly (STEP/IGES), 2D Fabrication Drawings (PDF/DWG), Bill of Materials (BOM)",
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

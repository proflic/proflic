export interface ServiceOption {
  value: string;
  label: string;
}

export interface ComplexityOption {
  value: string;
  label: string;
}

export const serviceOptions: ServiceOption[] = [
  { value: "onsite", label: "On-Site CMM Inspection (Portable Arm)" },
  { value: "scanning", label: "3D Scanning & Surface Deviation" },
  { value: "programming", label: "CMM Programming support" },
  { value: "reverse", label: "Reverse Engineering & CAD Modelling" },
  { value: "cad", label: "2D & 3D CAD Design" },
  { value: "training", label: "CMM Programming Training Session" },
  { value: "other", label: "Other" },
];

export const complexityOptions: ComplexityOption[] = [
  { value: "basic", label: "Basic Geometric" },
  { value: "medium", label: "Medium Machined" },
  { value: "high", label: "Turbine / Die" },
  { value: "other", label: "Other" },
];

export const softwareOptions = ["PC-DMIS", "PolyWorks", "N/A"];

export interface CalculationResult {
  turnaround: string;
  rating: string;
  equipment: string;
}

export function calculateTurnaroundAndRating(
  service: string,
  complexity: string,
  quantity: number,
  software: string
): CalculationResult {
  let turnaround = "24–48 Hours";
  let rating = "STANDARD METROLOGY";
  let equipment = "Stationary Bridge CMM / Touch Probe";

  if (service === "onsite") {
    turnaround = quantity > 10 ? "2–3 Working Days" : "Same-Day / 24h Mobile Dispatch";
    rating = "RAPID ON-SITE DISPATCH";
    equipment = "Portable Articulation Arm (Faro / Romer) & Blue Laser";
  } else if (service === "scanning") {
    if (complexity === "high") {
      turnaround = quantity > 5 ? "3–5 Working Days" : "48–72 Hours";
      rating = "HIGH-DENSITY POINT CLOUD RECONSTRUCTION";
    } else {
      turnaround = "24–48 Hours";
      rating = "SURFACE DEVIATION & CAD ALIGNMENT";
    }
    equipment = "Blue Laser Optical Scanner / PolyWorks Inspection";
  } else if (service === "programming") {
    if (complexity === "high") {
      turnaround = "3–4 Working Days";
      rating = "COMPLEX DCC OFFLINE SCRIPTING";
    } else {
      turnaround = "24–48 Hours";
      rating = "TURNKEY CMM ROUTINE GENERATION";
    }
    equipment = `${software} Offline DCC Environment`;
  } else if (service === "reverse") {
    turnaround = complexity === "high" ? "4–7 Working Days" : "2–4 Working Days";
    rating = "PARAMETRIC STEP / IGES RE-ENGINEERING";
    equipment = "High-Precision Mesh to Parametric Solid CAD (SolidWorks/NX)";
  } else if (service === "training") {
    turnaround = "Scheduled Multi-Day Corporate Session";
    rating = "INDUSTRIAL CMM CURRICULUM";
    equipment = `${software} Hands-on Industrial Lab Environment`;
  } else if (service === "cad") {
    turnaround = "2–4 Working Days";
    rating = "2D & 3D CAD DESIGN & DRAFTING";
    equipment = "Siemens NX & SolidWorks CAD Engineering";
  }

  return { turnaround, rating, equipment };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface MetricItem {
  id?: string;
  value: string;
  label: string;
  highlight?: boolean;
}

export const siteMetadata = {
  title: "Proflic Technologies | CMM Inspection, 3D Laser Scanning & Reverse Engineering",
  description: "Proflic Technologies delivers precision CMM inspection, 3D laser scanning, reverse engineering, CMM programming, and dimensional quality verification services.",
  url: "https://www.proflic.in/",
  domain: "proflic.in",
  websiteDisplay: "proflic.in",
  siteName: "Proflic Technologies",
  slogan: "Trusted in Every Measurement",
  author: "Proflic Technologies",
  phone: "+91 84597 06344",
  phoneTel: "+918459706344",
  email: "proflic.tech@gmail.com",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  addressLocality: "Chhatrapati Sambhajinagar",
  addressRegion: "Maharashtra",
  addressCountry: "IN",
  rapidDispatch: "Rapid Mobile Dispatch: 24/7 Available",
  heroEyebrow: "INDUSTRIAL METROLOGY • PRECISION ENGINEERING",
  heroHeadline: "TRUSTED IN EVERY",
  heroHeadlineHighlight: "MEASUREMENT",
  heroSubtitle: "We reveal the invisible, measured everything in microns.",
  whatsappNumber: "918459706344",
};

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "3D Scanner", href: "#simulation" },
  { label: "Software", href: "#software" },
  { label: "Enquire Now", href: "#estimator" },
];

export const navLinks: NavLink[] = mainNavLinks;

export const metricsData: MetricItem[] = [
  {
    id: "metric-programs",
    value: "1,000+",
    label: "CMM Programs Created",
  },
  {
    value: "< 0.001 mm",
    label: "Micrometric Accuracy",
    highlight: true,
  },
  {
    value: "24/7",
    label: "On-Site Metrology Support",
  },
];

export const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.proflic.in/#website",
      "url": "https://www.proflic.in/",
      "name": "Proflic Technologies",
      "description": "Industrial Metrology, Precision CMM Inspection, 3D Laser Scanning & Reverse Engineering",
      "publisher": {
        "@id": "https://www.proflic.in/#organization"
      },
      "inLanguage": "en"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.proflic.in/#organization",
      "name": "Proflic Technologies",
      "slogan": "Trusted in Every Measurement",
      "url": "https://www.proflic.in/",
      "logo": "https://www.proflic.in/assets/logo.png",
      "image": "https://www.proflic.in/assets/logo.png",
      "telephone": "+918459706344",
      "email": "proflic.tech@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chhatrapati Sambhajinagar",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "Coordinate Measuring Machine (CMM)",
        "3D Laser Scanning",
        "PC-DMIS Offline Programming",
        "PolyWorks Metrology",
        "ASME Y14.5 GD&T Standards",
        "First Article Inspection Reports (FAIR)",
        "Reverse Engineering CAD"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Industrial Metrology & Precision Engineering Services",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "On-Site CMM Inspection",
            "description": "Portable articulation arms deployed directly to your machine shop floor for in-situ verification without part transit risk."
          },
          {
            "@type": "Service",
            "name": "3D Scanning & Inspection",
            "description": "High-density blue laser optical scanning combined with touch probing for full surface deviation heatmaps and hole tolerances."
          },
          {
            "@type": "Service",
            "name": "CMM Programming Training",
            "description": "Hands-on corporate industrial training for quality engineers on PC-DMIS and PolyWorks offline scripting and GD&T logic."
          },
          {
            "@type": "Service",
            "name": "Reverse Engineering & CAD",
            "description": "Transforming raw point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX models."
          },
          {
            "@type": "Service",
            "name": "Dimensional Inspection",
            "description": "Complete quality assurance verification delivering First Article Inspection Reports (FAIR AS9102), PPAP packages, and Gauge R&R studies."
          },
          {
            "@type": "Service",
            "name": "CMM Programming Support",
            "description": "Turnkey DCC offline scripting, probe angle indexing, and program debugging reducing measurement cycle times up to 40%."
          }
        ]
      }
    }
  ]
};

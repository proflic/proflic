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
  title: "PROFLIC Technologies | CMM Inspection, 3D Laser Scanning & Reverse Engineering Services",
  description: "PROFLIC Technologies provides precision on-site CMM inspection services, industrial 3D laser scanning, reverse engineering scan-to-CAD, and PC-DMIS/PolyWorks offline CMM programming in Chhatrapati Sambhajinagar, Aurangabad, and Maharashtra, India.",
  url: "https://www.proflic.in/",
  domain: "proflic.in",
  websiteDisplay: "proflic.in",
  siteName: "PROFLIC Technologies",
  legalName: "PROFLIC Technologies",
  alternateName: [
    "PROFLIC",
    "PROFLIC Metrology",
    "PROFLIC CMM",
    "PROFLIC Technologies India",
    "PROFLIC Technologies Maharashtra",
    "PROFLIC Technologies Chhatrapati Sambhajinagar",
    "PROFLIC Inspection Services"
  ],
  slogan: "Trusted in Every Measurement",
  author: "PROFLIC Technologies",
  phone: "+91 84597 06344",
  phoneTel: "+918459706344",
  email: "proflic.tech@gmail.com",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  addressLocality: "Chhatrapati Sambhajinagar",
  addressRegion: "Maharashtra",
  addressCountry: "IN",
  postalCode: "431001",
  rapidDispatch: "Rapid Mobile Dispatch: 24/7 Available Across Maharashtra",
  heroEyebrow: "INDUSTRIAL METROLOGY • PRECISION QUALITY ENGINEERING",
  heroHeadline: "TRUSTED IN EVERY",
  heroHeadlineHighlight: "MEASUREMENT",
  heroSubtitle: "We reveal the invisible, measuring precision manufactured components to the sub-micron scale.",
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
      "name": "PROFLIC Technologies",
      "alternateName": [
        "PROFLIC",
        "PROFLIC Metrology",
        "PROFLIC CMM",
        "PROFLIC Technologies Maharashtra",
        "PROFLIC Technologies India"
      ],
      "description": "Official website of PROFLIC Technologies — Industrial Metrology Services, Precision CMM Inspection, 3D Laser Scanning, Scan-to-CAD Reverse Engineering & PC-DMIS/PolyWorks CMM Programming.",
      "publisher": {
        "@id": "https://www.proflic.in/#organization"
      },
      "inLanguage": "en"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.proflic.in/#webpage",
      "url": "https://www.proflic.in/",
      "name": "PROFLIC Technologies | CMM Inspection, 3D Laser Scanning & Reverse Engineering Services",
      "isPartOf": {
        "@id": "https://www.proflic.in/#website"
      },
      "about": {
        "@id": "https://www.proflic.in/#organization"
      },
      "description": "PROFLIC Technologies delivers precision on-site CMM inspection services, industrial 3D laser scanning, reverse engineering scan-to-CAD, and PC-DMIS/PolyWorks offline CMM programming in Chhatrapati Sambhajinagar, Aurangabad, and Maharashtra, India.",
      "inLanguage": "en"
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.proflic.in/#organization",
      "name": "PROFLIC Technologies",
      "legalName": "PROFLIC Technologies",
      "alternateName": [
        "PROFLIC",
        "PROFLIC Metrology",
        "PROFLIC CMM",
        "PROFLIC Technologies India",
        "PROFLIC Technologies Maharashtra",
        "PROFLIC Technologies Chhatrapati Sambhajinagar",
        "PROFLIC Inspection Services"
      ],
      "slogan": "Trusted in Every Measurement",
      "disambiguatingDescription": "PROFLIC Technologies (proflic.in) is the official precision industrial metrology and quality engineering firm located in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India. PROFLIC specializes in on-site portable CMM arm inspection, high-density 3D optical laser scanning, offline CMM programming in PC-DMIS and PolyWorks, scan-to-CAD reverse engineering, First Article Inspection Reports (FAIR AS9102), PPAP quality documentation, and GD&T verification.",
      "description": "PROFLIC Technologies is an advanced industrial metrology and precision quality engineering firm based in Chhatrapati Sambhajinagar, Maharashtra, India. We bridge the gap between physical manufacturing and digital CAD data using coordinate measuring machines (CMM), high-speed 3D laser scanners, and dedicated offline programming software.",
      "url": "https://www.proflic.in/",
      "logo": "https://www.proflic.in/assets/logo.png",
      "image": "https://www.proflic.in/assets/logo.png",
      "telephone": "+918459706344",
      "email": "proflic.tech@gmail.com",
      "priceRange": "$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chhatrapati Sambhajinagar",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN",
        "postalCode": "431001"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.8762,
        "longitude": 75.3433
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Chhatrapati Sambhajinagar"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Aurangabad"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Pune"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Maharashtra"
        },
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+918459706344",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi", "mr"]
        }
      ],
      "knowsAbout": [
        "Coordinate Measuring Machine (CMM) Inspection",
        "Portable CMM Arm Inspection",
        "3D Laser Scanning Services",
        "Industrial 3D Optical Scanning",
        "PC-DMIS CMM Programming",
        "PC-DMIS Offline Programming",
        "PolyWorks Metrology & Inspection",
        "Scan to CAD Reverse Engineering",
        "Parametric 3D CAD Reconstruction",
        "ASME Y14.5 GD&T Standards",
        "First Article Inspection Reports (FAIR AS9102)",
        "Production Part Approval Process (PPAP)",
        "Dimensional Metrology & Inspection",
        "Gauge R&R (Measurement Systems Analysis)",
        "Automotive Quality Inspection",
        "Aerospace Quality Inspection"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Industrial Metrology & Precision Quality Engineering Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "On-Site CMM Inspection Services",
              "description": "Portable articulated CMM arms deployed directly to CNC machine shops and manufacturing floors across Chhatrapati Sambhajinagar, Aurangabad, Pune, and Maharashtra for in-situ dimensional inspection without part transit risk.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              },
              "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Maharashtra"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "3D Laser Scanning & Optical Inspection Services",
              "description": "High-density blue laser 3D optical scanning combined with tactile touch probing for full 3D surface deviation heatmaps, hole tolerances, and high-resolution point cloud capture.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Offline CMM Programming Support & Consultancy",
              "description": "Turnkey DCC offline CMM programming and scripting in PC-DMIS and PolyWorks, probe angle indexing (PH10/PH20), and collision-free path simulation reducing cycle times up to 40%.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Reverse Engineering & Scan-to-CAD Services",
              "description": "Transforming raw 3D scan point clouds and STL mesh scans into fully editable parametric STEP, IGES, SolidWorks, and Siemens NX 3D CAD solid models.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dimensional Inspection & Quality Documentation (FAIR / PPAP)",
              "description": "Complete quality control verification delivering Aerospace First Article Inspection Reports (FAIR AS9102), Automotive PPAP packages, Gauge R&R studies, and ASME Y14.5 GD&T reports.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Metrology & CMM Programming Training",
              "description": "Hands-on corporate industrial training for quality engineers on PC-DMIS, PolyWorks offline scripting, GD&T logic, and coordinate alignment methodologies.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "2D & 3D Mechanical CAD Design Services",
              "description": "Precision mechanical drafting, 2D manufacturing blueprints with complete ASME Y14.5 GD&T datum callouts, and 3D parametric CAD modeling for manufacturing.",
              "provider": {
                "@id": "https://www.proflic.in/#organization"
              }
            }
          }
        ]
      }
    }
  ]
};

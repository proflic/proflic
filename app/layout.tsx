import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteMetadata, jsonLdData } from "@/data/siteData";
import { ThemeProvider } from "@/components/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080E1A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.proflic.in/"),
  title: siteMetadata.title,
  description: siteMetadata.description,
  applicationName: siteMetadata.siteName,
  authors: [{ name: siteMetadata.author, url: "https://www.proflic.in/" }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  keywords: [
    "PROFLIC Technologies",
    "PROFLIC",
    "PROFLIC Metrology",
    "PROFLIC Technologies Maharashtra",
    "PROFLIC Technologies Chhatrapati Sambhajinagar",
    "CMM Inspection Services",
    "Portable CMM Inspection",
    "CMM Inspection Maharashtra",
    "CMM Inspection Chhatrapati Sambhajinagar",
    "CMM Inspection Aurangabad",
    "Coordinate Measuring Machine Inspection",
    "3D Laser Scanning Services",
    "Industrial 3D Laser Scanning",
    "Blue Laser 3D Scanning",
    "3D Laser Scanning Maharashtra",
    "3D Laser Scanning Chhatrapati Sambhajinagar",
    "Scan to CAD Reverse Engineering",
    "Reverse Engineering Services",
    "Point Cloud to CAD Conversion",
    "Reverse Engineering Maharashtra",
    "Offline CMM Programming",
    "PC-DMIS Programming",
    "PolyWorks Metrology Inspection",
    "Dimensional Inspection Services",
    "First Article Inspection AS9102",
    "FAIR Inspection Report",
    "PPAP Dimensional Documentation",
    "ASME Y14.5 GD&T Inspection",
    "2D Drafting 3D CAD Design",
    "Industrial Metrology Training Maharashtra",
    "Precision Metrology Services India"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.proflic.in/",
  },
  openGraph: {
    type: "website",
    url: "https://www.proflic.in/",
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.siteName,
    locale: "en_IN",
    images: [
      {
        url: "https://www.proflic.in/assets/logo.png",
        width: 800,
        height: 600,
        alt: "PROFLIC Technologies - Industrial Metrology & Precision Inspection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["https://www.proflic.in/assets/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/assets/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} blueprint-bg antialiased selection:bg-[#0052FF] selection:text-white`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

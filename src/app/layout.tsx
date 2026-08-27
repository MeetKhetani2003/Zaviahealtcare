import type { Metadata } from "next";
import "@/index.css";
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: {
    default: "Zivra Health | Best Urologist & Kidney Stone Specialist in Darbhanga",
    template: "%s | Zivra Health Darbhanga"
  },
  description: "Consult Dr. Adeel (BUMS) at Zivra Health for expert, patient-centered care for kidney stones, prostate health, and urinary tract infections in Laheriasarai, Darbhanga, Bihar. 15+ years experience.",
  keywords: [
    "Urologist in Darbhanga",
    "Best Urologist in Darbhanga",
    "Kidney Stone Specialist in Darbhanga",
    "Prostate Doctor Darbhanga",
    "Urinary Tract Infection Treatment Darbhanga",
    "Dr. Adeel Darbhanga",
    "Laheriasarai Urology Clinic",
    "Urology Hospital Darbhanga",
    "Kidney Stone Doctor Bihar"
  ],
  icons: {
    icon: "/images/logo/zivra-health-logo.png",
    shortcut: "/images/logo/zivra-health-logo.png",
    apple: "/images/logo/zivra-health-logo.png",
  },
  metadataBase: new URL("https://zivrahealth.in"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Zivra Health | Best Urologist in Darbhanga, Bihar",
    description: "Consult Dr. Adeel (BUMS) for expert care for kidney stones, prostate issues, and bladder health in Laheriasarai, Darbhanga. 15+ years experience.",
    url: "https://zivrahealth.in",
    siteName: "Zivra Health",
    images: [
      {
        url: "/images/logo/zivra-health-logo.png",
        width: 800,
        height: 600,
        alt: "Zivra Health Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
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
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Adeel - Zivra Health",
  "image": "https://zivrahealth.in/images/logo/zivra-health-logo.png",
  "medicalSpecialty": "Urology",
  "telephone": "+917004553815",
  "email": "zivrahealth25@gmail.com",
  "url": "https://zivrahealth.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sarai Sattar Khan, Laheriasarai",
    "addressLocality": "Darbhanga",
    "addressRegion": "Bihar",
    "postalCode": "846001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "26.1209",
    "longitude": "85.8958"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

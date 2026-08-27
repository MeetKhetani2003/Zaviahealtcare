import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description: "Find answers to common questions about booking a consultation, urological treatments, kidney stone symptoms, prostate health, and privacy at Zivra Health clinic in Darbhanga.",
  alternates: {
    canonical: "/faqs",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I book a consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Call 7004553815 or use the Free Assessment form on this website. Our team will confirm a convenient time with you."
      }
    },
    {
      "@type": "Question",
      "name": "When should I consult a urologist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For persistent urinary symptoms, pain, blood in urine, or concerns about kidney, prostate or bladder health. Early consultation is always better than waiting for a symptom to worsen."
      }
    },
    {
      "@type": "Question",
      "name": "What are early signs of kidney stones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sudden severe pain in the side or back, blood in urine, burning while urinating, or pain that moves toward the groin. A history of stones also raises awareness."
      }
    },
    {
      "@type": "Question",
      "name": "Where is ZivRA HEALTH located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sarai Sattar Khan, Laheriasarai, Darbhanga, Bihar, India. You can open the location in Google Maps from the Contact page."
      }
    }
  ]
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

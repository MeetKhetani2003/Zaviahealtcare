import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urological Treatments & Guidance in Darbhanga",
  description: "Explore kidney stone care, prostate treatment, urinary bladder health care, and professional urology consultations at Zivra Health clinic in Laheriasarai, Darbhanga.",
  alternates: {
    canonical: "/treatments",
  },
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urological Conditions Treated in Darbhanga",
  description: "Get professional evaluation for urological conditions in Darbhanga, Bihar. Providing diagnosis & care for kidney stones, prostate concerns, urinary health, and male reproductive health.",
  alternates: {
    canonical: "/conditions",
  },
};

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

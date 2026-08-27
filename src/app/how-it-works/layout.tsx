import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Consultation Process - How It Works",
  description: "Learn about the simple 4-step urological consultation process at Zivra Health: book appointment, discuss concerns privately with Dr. Adeel, understand findings, and begin your recovery guidance.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

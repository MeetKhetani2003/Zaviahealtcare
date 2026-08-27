import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Dr. Adeel - Clinic Location & Phone Number",
  description: "Contact Zivra Health clinic in Laheriasarai, Darbhanga. Call +91 7004553815 or book your appointment online. Get Google Maps directions to visit Dr. Adeel.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

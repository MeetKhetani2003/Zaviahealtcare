import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Adeel - Best Urologist in Darbhanga",
  description: "Learn about Dr. Adeel (BUMS), a leading urologist with over 15 years of experience at Zivra Health. Dedicated to listening and caring for kidney stones, prostate health, and bladder health in Laheriasarai, Darbhanga, Bihar.",
  alternates: {
    canonical: "/about-doctor",
  },
};

export default function AboutDoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Stories & Success Testimonials",
  description: "Read real stories and feedback from patients treated by Dr. Adeel at Zivra Health. Learn about successful non-surgical kidney stone flushes and urological recovery journeys in Darbhanga.",
  alternates: {
    canonical: "/patient-stories",
  },
};

export default function PatientStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

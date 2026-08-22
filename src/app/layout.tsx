import type { Metadata } from "next";
import "@/index.css";
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: "Zivra Health",
  description: "Zivra Health Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

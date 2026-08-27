import { Metadata } from "next";
import clientPromise from "@/lib/mongodb";
import { treatments as staticTreatments } from "@/data/content";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

async function getTreatment(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const treatment = await db.collection("treatments").findOne({ slug });
    if (treatment) return treatment;
  } catch (e) {
    console.error("DB error in SEO layout:", e);
  }
  return staticTreatments.find((t) => t.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);

  if (!treatment) {
    return {
      title: "Urological Treatment Details",
    };
  }

  const title = `${treatment.title} in Darbhanga`;
  const description = `${treatment.short} Learn about ${treatment.title.toLowerCase()} at Zivra Health clinic under Dr. Adeel in Laheriasarai, Darbhanga.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/treatments/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zivrahealth.in/treatments/${slug}`,
      images: [
        {
          url: treatment.image || "/images/logo/zivra-health-logo.png",
          alt: treatment.title,
        },
      ],
    },
  };
}

export default async function TreatmentLayout({ children, params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);

  if (!treatment) {
    return <>{children}</>;
  }

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": treatment.title,
    "description": treatment.short,
    "procedureType": {
      "@type": "MedicalProcedureType",
      "name": "Non-invasive / Clinical Consultation"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      {children}
    </>
  );
}

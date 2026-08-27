import { Metadata } from "next";
import clientPromise from "@/lib/mongodb";
import { conditions as staticConditions } from "@/data/content";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

async function getCondition(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const condition = await db.collection("conditions").findOne({ slug });
    if (condition) return condition;
  } catch (e) {
    console.error("DB error in SEO layout:", e);
  }
  return staticConditions.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) {
    return {
      title: "Urological Condition Details",
    };
  }

  const title = `${condition.title} Treatment & Specialist in Darbhanga`;
  const description = `${condition.short} Get expert consultation and personalized care options for ${condition.title.toLowerCase()} from Dr. Adeel in Laheriasarai, Darbhanga.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/conditions/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zivrahealth.in/conditions/${slug}`,
      images: [
        {
          url: condition.image || "/images/logo/zivra-health-logo.png",
          alt: condition.title,
        },
      ],
    },
  };
}

export default async function ConditionLayout({ children, params }: Props) {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) {
    return <>{children}</>;
  }

  const conditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": condition.title,
    "description": condition.short,
    "possibleTreatment": condition.title.toLowerCase().includes("stone") 
      ? [{ "@type": "MedicalTherapy", "name": "Non-surgical Kidney Stone Dissolution & Flush" }]
      : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }}
      />
      {children}
    </>
  );
}

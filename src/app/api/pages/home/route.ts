import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { site } from "@/data/content";
import { IMG } from "@/assets";

const defaultData = {
  _id: "home_content",
  hero: {
    title: "Better Urological Health Starts With The Right Care.",
    text: `Consult with ${site.doctor}, ${site.qualification}, with ${site.experience}, for personalised and patient-centred urological care in ${site.location}.`,
    points: [
      "15+ Years Experience",
      "Doctor-Led Care",
      "Patient-Centred Approach",
    ],
    image: IMG.drAdeel,
  },
  doctorIntro: {
    title: "Experience That Puts Patients First",
    p1: `Dr. Adeel is a urologist with a ${site.qualification} qualification and more than 15 years of professional experience in urological practice. His approach is simple — listen carefully, explain clearly, and guide each patient with respect.`,
    p2: "From urinary concerns to kidney and prostate health, every consultation at ZivRA HEALTH is built around your comfort, your questions, and a clear path forward.",
    imageMain: IMG.drAdeel,
    imageSecondary: IMG.doctorConsultation,
  },
  why: {
    title: "Healthcare Built Around You",
    image: IMG.doctorClinic,
    points: [
      {
        icon: "clock",
        title: "No Rushed Appointments",
        text: "We schedule generous time slots so you never feel hurried. You'll have all the time you need to ask questions and understand your health.",
      },
      {
        icon: "shield",
        title: "Transparent Care Plans",
        text: "No hidden costs or confusing medical jargon. We explain every diagnosis and treatment option clearly before moving forward.",
      },
      {
        icon: "heart",
        title: "Comfortable Environment",
        text: "Our clinic is designed to be calming and private. From the waiting area to the consultation room, your comfort is our priority.",
      },
    ],
  },
  education: {
    title: "Small Symptoms Shouldn't Always Be Ignored",
    p1: "Many urological concerns begin quietly — a change in urinary habits, an occasional ache, a symptom that seems to come and go. None of these, on their own, tells you what is happening. A professional evaluation does.",
    p2: "If something has been on your mind, bringing it to a urologist early gives you the advantage: clearer answers sooner, simpler paths forward, and less time spent worrying.",
    points: [
      "Persistent symptoms deserve an evaluation, not more waiting",
      "Many concerns are far easier to manage when caught early",
      "A consultation is simply a professional conversation",
    ],
    image: IMG.doctorClinic,
  },
  trust: {
    title: "Care You Can Count On",
    text: `Practicing in ${site.location}, Dr. Adeel built his practice on one belief: that urological care works best when the patient feels heard, respected and informed at every step.`,
    image: IMG.drAdeel,
    stats: [
      { value: "15+", label: "Years of Practice" },
      { value: "10k+", label: "Consultations" },
      { value: "100%", label: "Doctor-Led Care" },
    ],
  }
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    let doc = await db.collection("pages").findOne({ _id: "home_content" });
    
    if (!doc) {
      await db.collection("pages").insertOne(defaultData);
      doc = defaultData;
    }
    
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();
    
    const { _id, ...updateData } = data;
    
    await db.collection("pages").updateOne(
      { _id: "home_content" },
      { $set: updateData },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating home page content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

// @ts-nocheck
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const defaultAbout = {
  _id: "about_page_content",
  heroText: "A urologist who believes the best medicine begins with listening. For over 15 years, Dr. Adeel has helped patients in and around Darbhanga navigate urological concerns with clarity, patience and privacy.",
  heroImage: "/images/doctor/dr-adeel.png",
  profileP1: "Dr. Adeel holds a BUMS (Bachelor of Unani Medicine and Surgery) and has dedicated more than 15 years of professional experience to urological practice as a urologist. His work covers the full breadth of everyday urological concerns — from urinary and bladder health to kidney and prostate matters.",
  profileP2: "What defines his practice is not a single technique, but a consistent habit: every patient is heard fully before anything else happens. No symptom is dismissed as small, no question is too basic, and no explanation is complete until the patient actually understands it.",
  profileImage: "/images/about/doctor-clinic.jpg",
  experienceYears: "15+",
  experienceText: "Fifteen years of professional experience is not just a number — it means a wide range of concerns seen, understood, and communicated honestly. It is the foundation on which every consultation at ZivRA HEALTH is built.",
  consultationImage: "/images/about/doctor-consultation.jpg",
  consultationQuoteLine1: "“The consultation is the care.",
  consultationQuoteLine2: "Everything else supports it.”",
  patientCareImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Using a fallback URL for PHOTO.seniorExam if needed, but the frontend can just use this
  patientCareText: "Urological concerns are often sensitive, and patients delay them for years out of awkwardness or fear of being judged. Patient-centred care means removing both — with privacy, patience and a manner that never makes you feel small."
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    let content = await collection.findOne({ _id: "about_page_content" });

    // Auto-seed if empty
    if (!content) {
      await collection.insertOne(defaultAbout as any);
      content = defaultAbout as any;
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error fetching about page content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    const result = await collection.updateOne(
      { _id: "about_page_content" },
      { $set: body },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving about page content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// @ts-nocheck
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { site } from "@/data/content";
import { IMG } from "@/assets";

const defaultData = {
  _id: "free_assessment_content",
  image: IMG.drAdeel,
  contactDetails: {
    phone: site.phone,
    email: site.email,
  },
  formFields: [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Your full name",
      required: true,
    },
    {
      id: "mobile",
      label: "Mobile Number",
      type: "text",
      placeholder: "10-digit mobile number",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      required: false,
    },
    {
      id: "age",
      label: "Age",
      type: "text",
      placeholder: "e.g. 45",
      required: false,
    },
    {
      id: "date",
      label: "Preferred Date",
      type: "date",
      placeholder: "",
      required: false,
    },
    {
      id: "time",
      label: "Preferred Time",
      type: "select",
      options: ["No preference", "Morning", "Afternoon", "Evening"],
      required: false,
    },
    {
      id: "concern",
      label: "Main Concern",
      type: "select",
      options: [
        "Select a concern",
        "Kidney Stones",
        "Prostate Enlargement (BPH)",
        "Erectile Dysfunction",
        "Male Infertility",
        "Urethral Stricture",
        "Urinary Tract Infection",
        "Other / Not sure"
      ],
      required: false,
    },
    {
      id: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Briefly describe what's been going on (optional)",
      required: false,
    },
  ]
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    let doc = await db.collection<any>("pages").findOne({ _id: "free_assessment_content" });
    
    if (!doc) {
      await db.collection<any>("pages").insertOne(defaultData);
      doc = defaultData;
    }
    
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error fetching free assessment content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();
    
    const { _id, ...updateData } = data;
    
    await db.collection<any>("pages").updateOne(
      { _id: "free_assessment_content" },
      { $set: updateData },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating free assessment content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

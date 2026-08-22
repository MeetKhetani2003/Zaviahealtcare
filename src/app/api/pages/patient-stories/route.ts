// @ts-nocheck
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { patientStories } from '@/data/content';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    let doc = await collection.findOne({ _id: "patient_stories_content" });

    // Auto-seed if empty
    if (!doc) {
      await collection.insertOne({
        _id: "patient_stories_content",
        stories: patientStories
      });
      doc = { stories: patientStories };
    }

    return NextResponse.json({ stories: doc.stories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient stories:', error);
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

    await collection.updateOne(
      { _id: "patient_stories_content" },
      { $set: { stories: body.stories } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving patient stories:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

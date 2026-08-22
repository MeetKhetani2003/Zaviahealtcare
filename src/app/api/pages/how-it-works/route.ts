import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { processSteps } from '@/data/content';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    let doc = await collection.findOne({ _id: "how_it_works_content" });

    // Auto-seed if empty
    if (!doc) {
      await collection.insertOne({
        _id: "how_it_works_content",
        steps: processSteps
      });
      doc = { steps: processSteps };
    }

    return NextResponse.json({ steps: doc.steps }, { status: 200 });
  } catch (error) {
    console.error('Error fetching how it works content:', error);
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
      { _id: "how_it_works_content" },
      { $set: { steps: body.steps } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving how it works content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

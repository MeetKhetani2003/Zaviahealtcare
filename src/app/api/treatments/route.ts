import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { treatments as staticTreatments } from '@/data/content';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('treatments');

    let treatments = await collection.find({}).toArray();

    // Auto-seed if empty
    if (treatments.length === 0) {
      await collection.insertMany(staticTreatments.map(t => ({
        ...t,
        createdAt: new Date(),
        isSeeded: true
      })));
      treatments = await collection.find({}).toArray();
    }

    return NextResponse.json({ treatments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('treatments');

    const newTreatment = {
      ...body,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newTreatment);
    
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error saving treatment:', error);
    return NextResponse.json(
      { error: 'Failed to create treatment' },
      { status: 500 }
    );
  }
}

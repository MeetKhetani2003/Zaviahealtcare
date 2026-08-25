import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('secure_assessments');

    const newAssessment = {
      ...body,
      status: 'review',
      createdAt: new Date(),
    };

    await collection.insertOne(newAssessment);
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving secure assessment:', error);
    return NextResponse.json(
      { error: 'Failed to submit secure assessment' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('secure_assessments');

    // Fetch assessments, sorted by newest first
    const assessments = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ assessments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}

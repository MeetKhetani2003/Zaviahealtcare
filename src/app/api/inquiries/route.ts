import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');

    const newInquiry = {
      ...body,
      createdAt: new Date(),
    };

    await collection.insertOne(newInquiry);
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');

    // Fetch inquiries, sorted by newest first
    const inquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

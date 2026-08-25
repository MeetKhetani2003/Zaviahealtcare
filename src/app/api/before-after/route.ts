import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('before_after').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching before-after:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const doc = {
      patientName: body.patientName || '',
      avatarUrl: body.avatarUrl || '',
      beforeImageUrl: body.beforeImageUrl || '',
      afterImageUrl: body.afterImageUrl || '',
      caption: body.caption || '',
      createdAt: new Date(),
    };

    await db.collection('before_after').insertOne(doc);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating before-after:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db();
    await db.collection('before_after').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting before-after:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

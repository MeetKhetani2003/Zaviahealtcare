import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const reels = await db.collection('reels').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(reels);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load reels' }, { status: 500 });
  }
}

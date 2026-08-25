import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DEFAULTS = {
  eyebrow: 'RESEARCH BACKED',
  headline: '93% saw results*',
  badge1: '300 Participants',
  badge2: 'Users across Stage 1-5',
  badge3: 'Tracked for 5+ months',
  buttonText: 'View Results',
  buttonLink: '/patient-stories',
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const config = await db.collection('section_configs').findOne({ key: 'research_backed' });
    return NextResponse.json(config || DEFAULTS);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(DEFAULTS);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection('section_configs').updateOne(
      { key: 'research_backed' },
      {
        $set: {
          key: 'research_backed',
          eyebrow: body.eyebrow || DEFAULTS.eyebrow,
          headline: body.headline || DEFAULTS.headline,
          badge1: body.badge1 || DEFAULTS.badge1,
          badge2: body.badge2 || DEFAULTS.badge2,
          badge3: body.badge3 || DEFAULTS.badge3,
          buttonText: body.buttonText || DEFAULTS.buttonText,
          buttonLink: body.buttonLink || DEFAULTS.buttonLink,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

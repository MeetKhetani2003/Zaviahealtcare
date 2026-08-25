import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const testimonials = await db.collection('video_testimonials').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(testimonials);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load video testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.name || !data.videoUrl || !data.videoId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    const newTestimonial = {
      name: data.name,
      description: data.description || '',
      videoUrl: data.videoUrl,
      videoId: data.videoId, // To keep track of GridFS id
      createdAt: new Date().toISOString()
    };
    
    const result = await db.collection('video_testimonials').insertOne(newTestimonial);
    
    return NextResponse.json({ success: true, testimonial: { _id: result.insertedId, ...newTestimonial } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to add video testimonial' }, { status: 500 });
  }
}

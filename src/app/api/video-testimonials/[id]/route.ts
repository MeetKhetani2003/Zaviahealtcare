import { NextResponse } from 'next/server';
import clientPromise, { getGridFSBucket } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db();
    
    // Find the testimonial first to get the videoId
    const testimonial = await db.collection('video_testimonials').findOne({ _id: new ObjectId(id) });
    if (!testimonial) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Delete the testimonial
    await db.collection('video_testimonials').deleteOne({ _id: new ObjectId(id) });
    
    // Delete the video from GridFS
    if (testimonial.videoId) {
      try {
        const bucket = await getGridFSBucket();
        await bucket.delete(new ObjectId(testimonial.videoId));
      } catch (err) {
        console.error('Error deleting video file from GridFS:', err);
        // Continue even if GridFS deletion fails, since testimonial is deleted
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete video testimonial' }, { status: 500 });
  }
}

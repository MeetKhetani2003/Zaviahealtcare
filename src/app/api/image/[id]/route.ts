import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const bucket = await getGridFSBucket();
    const objId = new ObjectId(id);
    
    const files = await bucket.find({ _id: objId }).toArray();
    if (!files.length) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    const file = files[0];
    const stream = bucket.openDownloadStream(objId);
    
    const res = new NextResponse(stream as any);
    const contentType = file.metadata?.contentType as string || 'image/jpeg';
    res.headers.set('Content-Type', contentType);
    res.headers.set('Cache-Control', 'public, max-age=31536000');
    return res;
  } catch (e) {
    console.error(e);
    return new NextResponse('Error loading image', { status: 500 });
  }
}

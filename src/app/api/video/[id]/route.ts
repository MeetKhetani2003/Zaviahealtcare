import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const bucket = await getGridFSBucket();
    const objId = new ObjectId(id);
    
    const files = await bucket.find({ _id: objId }).toArray();
    if (!files.length) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    const file = files[0];
    const fileSize = file.length;
    const contentType = file.metadata?.contentType as string || 'video/mp4';

    const range = req.headers.get('range');
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      const chunksize = (end - start) + 1;
      const stream = bucket.openDownloadStream(objId, { start, end: end + 1 });
      
      const res = new NextResponse(stream as any, { status: 206 });
      res.headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
      res.headers.set('Accept-Ranges', 'bytes');
      res.headers.set('Content-Length', chunksize.toString());
      res.headers.set('Content-Type', contentType);
      return res;
    } else {
      const stream = bucket.openDownloadStream(objId);
      const res = new NextResponse(stream as any);
      res.headers.set('Content-Length', fileSize.toString());
      res.headers.set('Content-Type', contentType);
      res.headers.set('Accept-Ranges', 'bytes');
      return res;
    }
  } catch (e) {
    console.error(e);
    return new NextResponse('Error loading video', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const type = formData.get('type') as string;
    
    const client = await clientPromise;
    const db = client.db();
    
    if (type === 'youtube') {
      const url = formData.get('url') as string;
      const result = await db.collection('reels').insertOne({
        type: 'youtube',
        url,
        createdAt: new Date(),
      });
      return NextResponse.json({ success: true, id: result.insertedId });
    }
    
    if (type === 'image') {
      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const bucket = await getGridFSBucket();
      
      const uploadStream = bucket.openUploadStream(file.name, {
        metadata: { contentType: file.type }
      });
      
      uploadStream.end(buffer);
      
      return new Promise<NextResponse>((resolve, reject) => {
        uploadStream.on('finish', async () => {
          const result = await db.collection('reels').insertOne({
            type: 'image',
            imageId: uploadStream.id.toString(),
            createdAt: new Date(),
          });
          resolve(NextResponse.json({ success: true, id: result.insertedId, imageId: uploadStream.id }));
        });
        uploadStream.on('error', (err) => {
          reject(NextResponse.json({ error: err.message }, { status: 500 }));
        });
      });
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 25MB limit' }, { status: 400 });
    }

    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Invalid file type. Must be a video.' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = await getGridFSBucket();
    
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type }
    });
    
    uploadStream.end(buffer);
    
    return new Promise<NextResponse>((resolve, reject) => {
      uploadStream.on('finish', () => {
        const url = `/api/video/${uploadStream.id}`;
        resolve(NextResponse.json({ success: true, url, videoId: uploadStream.id }));
      });
      uploadStream.on('error', (err) => {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      });
    });
    
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

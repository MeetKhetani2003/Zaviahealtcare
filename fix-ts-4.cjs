const fs = require('fs');
const path = require('path');

// 1. Fix mongodb.ts
const mongoFile = path.join(__dirname, 'src/lib/mongodb.ts');
if (fs.existsSync(mongoFile)) {
  fs.writeFileSync(mongoFile, `import { MongoClient, GridFSBucket } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/zivra';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getGridFSBucket() {
  const client = await clientPromise;
  const db = client.db();
  return new GridFSBucket(db, { bucketName: 'reelsMedia' });
}
`);
}

// 2. Fix api/reels
const apiReelsFile = path.join(__dirname, 'src/app/api/reels/route.ts');
if (fs.existsSync(apiReelsFile)) {
  let content = fs.readFileSync(apiReelsFile, 'utf8');
  content = content.replace(/import clientPromise from/g, 'import clientPromise from'); // unchanged
  fs.writeFileSync(apiReelsFile, content);
}

// 3. Fix api/upload
const apiUploadFile = path.join(__dirname, 'src/app/api/upload/route.ts');
if (fs.existsSync(apiUploadFile)) {
  fs.writeFileSync(apiUploadFile, `import { NextResponse } from 'next/server';
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
`);
}

// 4. Fix api/image/[id]
const apiImageFile = path.join(__dirname, 'src/app/api/image/[id]/route.ts');
if (fs.existsSync(apiImageFile)) {
  fs.writeFileSync(apiImageFile, `import { NextResponse } from 'next/server';
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
`);
}

// 5. Fix page.tsx & ReelsCarousel.tsx
const reelsPage = path.join(__dirname, 'src/app/reels/page.tsx');
if (fs.existsSync(reelsPage)) {
  let content = fs.readFileSync(reelsPage, 'utf8');
  content = content.replace(/useState\(\[\]\)/, 'useState<any[]>([])');
  content = content.replace(/subtitle=/g, 'text=');
  content = content.replace(/<SectionHead\s*\n\s*title="Patient Stories & Reels"\s*\n\s*text=/g, '<SectionHead eyebrow="Reels" title="Patient Stories & Reels" text=');
  fs.writeFileSync(reelsPage, content);
}

const reelsCarousel = path.join(__dirname, 'src/components/ReelsCarousel.tsx');
if (fs.existsSync(reelsCarousel)) {
  let content = fs.readFileSync(reelsCarousel, 'utf8');
  content = content.replace(/useState\(\[\]\)/, 'useState<any[]>([])');
  fs.writeFileSync(reelsCarousel, content);
}

console.log("All fixes applied");

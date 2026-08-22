const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, 'src/lib');
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

const mongoCode = `import { MongoClient, GridFSBucket } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/zivra';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global;

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
`;
fs.writeFileSync(path.join(libDir, 'mongodb.ts'), mongoCode);

const apiReelsDir = path.join(__dirname, 'src/app/api/reels');
if (!fs.existsSync(apiReelsDir)) fs.mkdirSync(apiReelsDir, { recursive: true });

const reelsRouteCode = `import { NextResponse } from 'next/server';
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
`;
fs.writeFileSync(path.join(apiReelsDir, 'route.ts'), reelsRouteCode);

const apiUploadDir = path.join(__dirname, 'src/app/api/upload');
if (!fs.existsSync(apiUploadDir)) fs.mkdirSync(apiUploadDir, { recursive: true });

const uploadRouteCode = `import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const type = formData.get('type');
    
    const client = await clientPromise;
    const db = client.db();
    
    if (type === 'youtube') {
      const url = formData.get('url');
      const result = await db.collection('reels').insertOne({
        type: 'youtube',
        url,
        createdAt: new Date(),
      });
      return NextResponse.json({ success: true, id: result.insertedId });
    }
    
    if (type === 'image') {
      const file = formData.get('file');
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const bucket = await getGridFSBucket();
      
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: file.type,
      });
      
      uploadStream.end(buffer);
      
      return new Promise((resolve, reject) => {
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
`;
fs.writeFileSync(path.join(apiUploadDir, 'route.ts'), uploadRouteCode);

const apiImageDir = path.join(__dirname, 'src/app/api/image/[id]');
if (!fs.existsSync(apiImageDir)) fs.mkdirSync(apiImageDir, { recursive: true });

const imageRouteCode = `import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
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
    
    const res = new NextResponse(stream);
    res.headers.set('Content-Type', file.contentType || 'image/jpeg');
    res.headers.set('Cache-Control', 'public, max-age=31536000');
    return res;
  } catch (e) {
    console.error(e);
    return new NextResponse('Error loading image', { status: 500 });
  }
}
`;
fs.writeFileSync(path.join(apiImageDir, 'route.ts'), imageRouteCode);

console.log("API routes generated");

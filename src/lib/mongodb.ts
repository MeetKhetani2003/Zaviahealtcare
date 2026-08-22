import { MongoClient, GridFSBucket } from 'mongodb';

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

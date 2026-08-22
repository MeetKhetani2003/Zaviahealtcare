import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { faqCategories } from '@/data/content';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    let doc = await collection.findOne({ _id: "faqs_content" });

    // Auto-seed if empty
    if (!doc) {
      await collection.insertOne({
        _id: "faqs_content",
        categories: faqCategories
      });
      doc = { categories: faqCategories };
    }

    return NextResponse.json({ categories: doc.categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pages');

    await collection.updateOne(
      { _id: "faqs_content" },
      { $set: { categories: body.categories } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

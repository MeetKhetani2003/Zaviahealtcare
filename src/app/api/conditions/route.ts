import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { conditions as staticConditions } from '@/data/content';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('conditions');

    let conditions = await collection.find({}).toArray();

    // Auto-seed if empty
    if (conditions.length === 0) {
      await collection.insertMany(staticConditions.map(c => ({
        ...c,
        createdAt: new Date(),
        isSeeded: true
      })));
      conditions = await collection.find({}).toArray();
    }

    return NextResponse.json({ conditions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conditions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conditions' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('conditions');

    const newCondition = {
      ...body,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newCondition);
    
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error saving condition:', error);
    return NextResponse.json(
      { error: 'Failed to create condition' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ error: 'Condition ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('conditions');
    
    const { ObjectId } = require('mongodb');

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount }, { status: 200 });
  } catch (error) {
    console.error('Error updating condition:', error);
    return NextResponse.json(
      { error: 'Failed to update condition' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Condition ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('conditions');
    
    const { ObjectId } = require('mongodb');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Condition not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting condition:', error);
    return NextResponse.json(
      { error: 'Failed to delete condition' },
      { status: 500 }
    );
  }
}

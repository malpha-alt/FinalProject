// by matheus alpha U63492196

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
    }

    const db = await clientPromise;
    const likes = await db.db("pokemon").collection("likes").findOne({ name });
    
    return NextResponse.json({ likes: likes?.count || 0 });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = await clientPromise;
    const result = await db.db("pokemon").collection("likes").updateOne(
      { name },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    
    console.log(result);

    const updatedDoc = await db.db("pokemon").collection("likes").findOne({ name });
    return NextResponse.json({ likes: updatedDoc?.count || 1 });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}
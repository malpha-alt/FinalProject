// app/api/likes/route.ts
import { NextRequest } from "next/server";
import getMongoClient from "@/lib/mongodb";

const collectionName = "likes";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) return new Response("Missing name", { status: 400 });

  const db = await getMongoClient();
  const collection = db.db().collection(collectionName);
  const pokemon = await collection.findOne({ name });
  const likes = pokemon ? pokemon.likes : 0;

  return Response.json({ likes });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return new Response("Missing name", { status: 400 });

  const db = await getMongoClient();
  const collection = db.db().collection(collectionName);
  const result = await collection.findOneAndUpdate(
    { name },
    { $inc: { likes: 1 } },
    { upsert: true, returnDocument: "after" }
  );

  const updatedLikes = result?.value?.likes || 1;
  return Response.json({ likes: updatedLikes });
}

export async function DELETE(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return new Response("Missing name", { status: 400 });

  const db = await getMongoClient();
  const collection = db.db().collection(collectionName);
  const result = await collection.findOneAndUpdate(
    { name },
    { $inc: { likes: -1 } },
    { returnDocument: "after" }
  );

  const updatedLikes = result?.value?.likes ?? 0;
  return Response.json({ likes: Math.max(updatedLikes, 0) }); // never negative
}

//by matheus alpha U63492196

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await clientPromise;
    const likes = await db.db("pokemon").collection("likes").find({}).toArray();

    // Convert array to object with pokemon names as keys
    const likesObject = likes.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.name] = curr.count || 0;
      return acc;
    }, {});

    return NextResponse.json(likesObject);
  } catch (error) {
    console.error("Error fetching all likes:", error);
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}

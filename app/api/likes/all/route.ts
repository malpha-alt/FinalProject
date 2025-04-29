import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDB();
    const likes = await db.collection("likes").find({}).toArray();

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

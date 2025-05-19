import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("idUser");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const calls = await prisma.callsSession.findMany({
      where: {
        OR: [{ callerId: userId }, { receiverId: userId }],
      },
    });
    return NextResponse.json(calls);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const callerId = formData.get("callerId") as string;
    const receiverId = formData.get("receiverId") as string;
    const duration = formData.get("duration") as string;

    console.log("callerId", callerId);
    console.log("receiverId", receiverId);
    console.log("duration", duration);

    if (!callerId || !receiverId || !duration) {
      return NextResponse.json(
        { error: "callerId, receiverId, and a valid duration are required" },
        { status: 400 }
      );
    }

    const parsedDuration = Number(duration);
    const newCall = await prisma.callsSession.create({
      data: {
        callerId: callerId,
        receiverId: receiverId,
        duration: parsedDuration,
      },
    });

    return NextResponse.json(newCall, { status: 201 });
  } catch (error) {
    console.error("Error creating call session:", error);
    return NextResponse.json(
      { error: "Failed to create call session" },
      { status: 500 }
    );
  }
}

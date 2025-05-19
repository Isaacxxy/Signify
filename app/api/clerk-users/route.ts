import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return NextResponse.json({
      id: userId,
      fullName:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Utilisateur",
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        id: userId,
        fullName: "Utilisateur inconnu",
        imageUrl: null,
      },
      { status: 200 }
    );
  }
}

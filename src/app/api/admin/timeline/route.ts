import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getTimeline } from "@/lib/timeline";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const entries = await getTimeline();
  return NextResponse.json({ entries });
}
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const settings = await getSettings();

  if (!settings) {
    return NextResponse.json(
      { error: "Could not load settings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ settings });
}
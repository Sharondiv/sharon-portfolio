import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSkills } from "@/lib/skills";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const skills = await getSkills();
  return NextResponse.json({ skills });
}
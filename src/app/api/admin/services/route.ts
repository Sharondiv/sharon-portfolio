import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getServices } from "@/lib/services";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const services = await getServices();
  return NextResponse.json({ services });
}
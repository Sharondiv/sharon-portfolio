import { createClient } from "@/lib/supabase-server";

export type TimelineEntry = {
  id: string;
  year: string;
  title: string;
  org: string;
  description: string;
  sort_order: number;
};

export async function getTimeline(): Promise<TimelineEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("timeline")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching timeline:", error);
    return [];
  }

  return data as TimelineEntry[];
}
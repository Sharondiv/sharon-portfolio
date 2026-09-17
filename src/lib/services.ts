import { createClient } from "@/lib/supabase-server";

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  sort_order: number;
};

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data as Service[];
}
import { createClient } from "@/lib/supabase-server";

export type SiteSettings = {
  id: number;
  hero_greeting: string;
  hero_headline: string;
  hero_subtext: string;
  availability: string;
  about_intro: string;
  about_body_1: string;
  about_body_2: string;
  footer_pitch: string;
  contact_email: string;
  contact_github: string;
  contact_linkedin: string;
  contact_whatsapp: string;
  contact_whatsapp_display: string;
  now_items: string[];
  updated_at: string;
};

export async function getSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }

  return data as SiteSettings;
}
import { createClient } from "@/lib/supabase-server";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  note: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/**
 * Get all projects, newest first
 * Used on the public /projects page
 */
export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as Project[];
}

/**
 * Get only featured projects
 * Used on the homepage
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }

  return data as Project[];
}

/**
 * Get a single project by ID
 * Used on /projects/[id]
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data as Project;
}
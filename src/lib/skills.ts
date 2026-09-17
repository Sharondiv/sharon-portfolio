import { createClient } from "@/lib/supabase-server";

export type Skill = {
  id: string;
  category: string;
  name: string;
  sort_order: number;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  return data as Skill[];
}

export function groupSkills(skills: Skill[]): SkillGroup[] {
  const groups: Record<string, string[]> = {};
  for (const skill of skills) {
    if (!groups[skill.category]) groups[skill.category] = [];
    groups[skill.category].push(skill.name);
  }
  return Object.entries(groups).map(([category, items]) => ({
    category,
    items,
  }));
}
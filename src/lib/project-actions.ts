"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import { getCurrentUser } from "@/lib/auth";

function parseStack(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const admin = createAdminClient();

  const title = (formData.get("title") as string)?.trim();
  const tagline = (formData.get("tagline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const stackRaw = (formData.get("stack") as string) ?? "";
  const year = (formData.get("year") as string)?.trim();
  const github_url = (formData.get("github_url") as string)?.trim() || null;
  const live_url = (formData.get("live_url") as string)?.trim() || null;
  const note = (formData.get("note") as string)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!title || !tagline || !description || !year) {
    return { error: "Title, tagline, description, and year are required." };
  }

  let image_url: string | null = null;

  // Upload image if provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await admin.storage
      .from("project-images")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = admin.storage
      .from("project-images")
      .getPublicUrl(fileName);

    image_url = urlData.publicUrl;
  }

  const { error } = await admin.from("projects").insert({
    title,
    tagline,
    description,
    stack: parseStack(stackRaw),
    year,
    image_url,
    github_url,
    live_url,
    note,
    featured,
    sort_order: 0,
  });

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const admin = createAdminClient();

  const title = (formData.get("title") as string)?.trim();
  const tagline = (formData.get("tagline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const stackRaw = (formData.get("stack") as string) ?? "";
  const year = (formData.get("year") as string)?.trim();
  const github_url = (formData.get("github_url") as string)?.trim() || null;
  const live_url = (formData.get("live_url") as string)?.trim() || null;
  const note = (formData.get("note") as string)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!title || !tagline || !description || !year) {
    return { error: "Title, tagline, description, and year are required." };
  }

  const updateData: Record<string, unknown> = {
    title,
    tagline,
    description,
    stack: parseStack(stackRaw),
    year,
    github_url,
    live_url,
    note,
    featured,
    updated_at: new Date().toISOString(),
  };

  // Only replace image if a new one was uploaded
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await admin.storage
      .from("project-images")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = admin.storage
      .from("project-images")
      .getPublicUrl(fileName);

    updateData.image_url = urlData.publicUrl;
  }

  const { error } = await admin
    .from("projects")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath(`/projects/${id}`);

  redirect("/admin");
}

export async function deleteProject(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const admin = createAdminClient();

  const { error } = await admin.from("projects").delete().eq("id", id);

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true };
}

export async function updateSettings(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const admin = createAdminClient();

  const nowItemsRaw = (formData.get("now_items") as string) ?? "";
  const now_items = nowItemsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const updateData = {
    hero_greeting: (formData.get("hero_greeting") as string)?.trim() || "",
    hero_headline: (formData.get("hero_headline") as string)?.trim() || "",
    hero_subtext: (formData.get("hero_subtext") as string)?.trim() || "",
    availability: (formData.get("availability") as string)?.trim() || "",
    about_intro: (formData.get("about_intro") as string)?.trim() || "",
    about_body_1: (formData.get("about_body_1") as string)?.trim() || "",
    about_body_2: (formData.get("about_body_2") as string)?.trim() || "",
    footer_pitch: (formData.get("footer_pitch") as string)?.trim() || "",
    contact_email: (formData.get("contact_email") as string)?.trim() || "",
    contact_github: (formData.get("contact_github") as string)?.trim() || "",
    contact_linkedin: (formData.get("contact_linkedin") as string)?.trim() || "",
    contact_whatsapp: (formData.get("contact_whatsapp") as string)?.trim() || "",
    contact_whatsapp_display:
      (formData.get("contact_whatsapp_display") as string)?.trim() || "",
    now_items,
    updated_at: new Date().toISOString(),
  };

  const { error } = await admin
    .from("site_settings")
    .update(updateData)
    .eq("id", 1);

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");

  return { success: true };
}

export async function createSkill(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const category = (formData.get("category") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!category || !name) {
    return { error: "Category and name are required." };
  }

  const { error } = await admin.from("skills").insert({
    category,
    name,
    sort_order,
  });

  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function updateSkill(id: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const category = (formData.get("category") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!category || !name) {
    return { error: "Category and name are required." };
  }

  const { error } = await admin
    .from("skills")
    .update({ category, name, sort_order })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const { error } = await admin.from("skills").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function createTimelineEntry(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const year = (formData.get("year") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const org = (formData.get("org") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!year || !title || !org || !description) {
    return { error: "All fields are required." };
  }

  const { error } = await admin.from("timeline").insert({
    year,
    title,
    org,
    description,
    sort_order,
  });

  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin/timeline");
  return { success: true };
}

export async function deleteTimelineEntry(id: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const { error } = await admin.from("timeline").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin/timeline");
  return { success: true };
}

export async function createService(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const icon = (formData.get("icon") as string)?.trim() || "code";
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const featuresRaw = (formData.get("features") as string) ?? "";
  const features = featuresRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  const { error } = await admin.from("services").insert({
    icon,
    title,
    description,
    features,
    sort_order,
  });

  if (error) return { error: error.message };

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const { error } = await admin.from("services").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}
"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateProject } from "@/lib/project-actions";
import type { Project } from "@/lib/projects";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch project on mount
  useState(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProject(data.project);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  });

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);

    const result = await updateProject(id, formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-slate-500">Loading...</p>;
  }

  if (error && !project) {
    return (
      <div>
        <p className="text-red-600">{error}</p>
        <Link href="/admin" className="text-sm text-slate-500 mt-4 inline-block">
          ← Back to projects
        </Link>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-sm text-slate-500 hover:text-[color:var(--navy)]"
        >
          ← Back to projects
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[color:var(--navy)]">
          Edit project
        </h1>
        <p className="mt-1 text-sm text-slate-500">{project.title}</p>
      </div>

      <form
        action={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={project.title}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-slate-700 mb-2">
            Tagline <span className="text-red-500">*</span>
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            required
            defaultValue={project.tagline}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={project.description}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
          />
        </div>

        <div>
          <label htmlFor="stack" className="block text-sm font-medium text-slate-700 mb-2">
            Tech stack
          </label>
          <input
            id="stack"
            name="stack"
            type="text"
            defaultValue={project.stack.join(", ")}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-slate-400">Separate with commas.</p>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-2">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            id="year"
            name="year"
            type="text"
            required
            defaultValue={project.year}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {project.image_url && (
          <div>
            <p className="block text-sm font-medium text-slate-700 mb-2">
              Current image
            </p>
            <div className="relative w-48 h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
            Replace image (optional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[color:var(--navy)] file:text-white file:font-medium hover:file:bg-[color:var(--accent)] file:cursor-pointer"
          />
        </div>

        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-slate-700 mb-2">
            GitHub URL
          </label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project.github_url ?? ""}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="live_url" className="block text-sm font-medium text-slate-700 mb-2">
            Live URL
          </label>
          <input
            id="live_url"
            name="live_url"
            type="url"
            defaultValue={project.live_url ?? ""}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-2">
            Note (optional)
          </label>
          <input
            id="note"
            name="note"
            type="text"
            defaultValue={project.note ?? ""}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={project.featured}
            className="w-4 h-4 rounded border-slate-300 text-[color:var(--accent)] focus:ring-[color:var(--accent)]"
          />
          <label htmlFor="featured" className="text-sm text-slate-700">
            Show on homepage (featured)
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[color:var(--navy)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <Link
            href="/admin"
            className="text-sm text-slate-500 hover:text-[color:var(--navy)]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
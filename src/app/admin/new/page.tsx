"use client";

import { useState } from "react";
import Link from "next/link";
import { createProject } from "@/lib/project-actions";

export default function NewProjectPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await createProject(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

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
          Add new project
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details. It&apos;ll appear on your site immediately.
        </p>
      </div>

      <form
        action={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="SD Dress Store"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Tagline */}
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-slate-700 mb-2">
            Tagline <span className="text-red-500">*</span>
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            required
            placeholder="Modern full-stack e-commerce storefront"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="A complete online store with product catalog, cart, and checkout..."
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
          />
        </div>

        {/* Stack */}
        <div>
          <label htmlFor="stack" className="block text-sm font-medium text-slate-700 mb-2">
            Tech stack
          </label>
          <input
            id="stack"
            name="stack"
            type="text"
            placeholder="Next.js, TypeScript, Tailwind CSS"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-slate-400">
            Separate with commas.
          </p>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-2">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            id="year"
            name="year"
            type="text"
            required
            defaultValue="2026"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
            Project image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[color:var(--navy)] file:text-white file:font-medium hover:file:bg-[color:var(--accent)] file:cursor-pointer"
          />
          <p className="mt-1 text-xs text-slate-400">
            PNG or JPG, landscape recommended.
          </p>
        </div>

        {/* GitHub URL */}
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-slate-700 mb-2">
            GitHub URL
          </label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            placeholder="https://github.com/Sharondiv/project"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Live URL */}
        <div>
          <label htmlFor="live_url" className="block text-sm font-medium text-slate-700 mb-2">
            Live URL
          </label>
          <input
            id="live_url"
            name="live_url"
            type="url"
            placeholder="https://your-project.vercel.app"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Note */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-2">
            Note (optional)
          </label>
          <input
            id="note"
            name="note"
            type="text"
            placeholder="Private client project — code available on request."
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            id="featured"
            name="featured"
            type="checkbox"
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
            disabled={loading}
            className="bg-[color:var(--navy)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save project"}
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
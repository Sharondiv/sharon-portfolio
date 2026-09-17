"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createSkill, deleteSkill } from "@/lib/project-actions";
import type { Skill } from "@/lib/skills";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.error) setError(data.error);
      else setSkills(data.skills);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchSkills() {
      try {
        const res = await fetch("/api/admin/skills");
        const data = await res.json();
        if (cancelled) return;
        if (data.error) setError(data.error);
        else setSkills(data.skills);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSkills();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="text-slate-500">Loading skills...</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin"
            className="text-sm text-slate-500 hover:text-[color:var(--navy)]"
          >
            ← Back to projects
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[color:var(--navy)]">
            Skills
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          {showNew ? "Cancel" : "+ Add skill"}
        </button>
      </div>

      {showNew && (
        <form
          action={async (fd) => {
            const res = await createSkill(fd);
            if (res?.error) setError(res.error);
            else {
              setShowNew(false);
              load();
            }
          }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              name="category"
              placeholder="Category (e.g. Frontend)"
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
            <input
              name="name"
              placeholder="Skill (e.g. React)"
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
          </div>
          <input
            name="sort_order"
            type="number"
            placeholder="Sort order (1, 2, 3...)"
            defaultValue={0}
            className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
          />
          <button
            type="submit"
            className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)]"
          >
            Save skill
          </button>
        </form>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="p-4 flex items-center gap-4 hover:bg-slate-50"
            >
              <span className="text-xs uppercase tracking-wide text-slate-400 w-24 flex-shrink-0">
                {skill.category}
              </span>
              <span className="flex-1 font-medium text-slate-900">
                {skill.name}
              </span>
              <span className="text-xs text-slate-400">#{skill.sort_order}</span>
              <button
                onClick={async () => {
                  if (!confirm(`Delete "${skill.name}"?`)) return;
                  const res = await deleteSkill(skill.id);
                  if (res?.error) setError(res.error);
                  else load();
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
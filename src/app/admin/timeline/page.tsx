"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createTimelineEntry, deleteTimelineEntry } from "@/lib/project-actions";
import type { TimelineEntry } from "@/lib/timeline";

export default function TimelineAdminPage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/admin/timeline");
      const data = await res.json();
      if (data.error) setError(data.error);
      else setEntries(data.entries);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/timeline");
        const data = await res.json();
        if (cancelled) return;
        if (data.error) setError(data.error);
        else setEntries(data.entries);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="text-slate-500">Loading timeline...</p>;

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
            Timeline
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {entries.length} entr{entries.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          {showNew ? "Cancel" : "+ Add entry"}
        </button>
      </div>

      {showNew && (
        <form
          action={async (fd) => {
            const res = await createTimelineEntry(fd);
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
              name="year"
              placeholder="Year (e.g. 2027)"
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
            <input
              name="title"
              placeholder="Title"
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
          </div>
          <input
            name="org"
            placeholder="Organization"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] resize-y"
          />
          <input
            name="sort_order"
            type="number"
            placeholder="Sort order (1 = top)"
            defaultValue={0}
            className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
          />
          <button
            type="submit"
            className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)]"
          >
            Save entry
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
          {entries.map((entry) => (
            <li key={entry.id} className="p-4 hover:bg-slate-50">
              <div className="flex items-start gap-4">
                <span className="text-xs uppercase tracking-wide text-[color:var(--accent)] font-semibold w-24 flex-shrink-0 pt-1">
                  {entry.year}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{entry.title}</p>
                  <p className="text-sm text-slate-500">{entry.org}</p>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                    {entry.description}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    if (!confirm(`Delete "${entry.title}"?`)) return;
                    const res = await deleteTimelineEntry(entry.id);
                    if (res?.error) setError(res.error);
                    else load();
                  }}
                  className="text-sm text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createService, deleteService } from "@/lib/project-actions";
import type { Service } from "@/lib/services";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.error) setError(data.error);
      else setServices(data.services);
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
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        if (cancelled) return;
        if (data.error) setError(data.error);
        else setServices(data.services);
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

  if (loading) return <p className="text-slate-500">Loading services...</p>;

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
            Services
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {services.length} service{services.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          {showNew ? "Cancel" : "+ Add service"}
        </button>
      </div>

      {showNew && (
        <form
          action={async (fd) => {
            const res = await createService(fd);
            if (res?.error) setError(res.error);
            else {
              setShowNew(false);
              load();
            }
          }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <select
              name="icon"
              defaultValue="code"
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            >
              <option value="code">Code icon</option>
              <option value="layout">Layout icon</option>
              <option value="database">Database icon</option>
            </select>
            <input
              name="sort_order"
              type="number"
              placeholder="Sort order"
              defaultValue={0}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
          </div>
          <input
            name="title"
            placeholder="Title"
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
          <div>
            <textarea
              name="features"
              placeholder="Features — one per line"
              rows={4}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] resize-y font-mono text-sm"
            />
            <p className="mt-1 text-xs text-slate-400">One feature per line.</p>
          </div>
          <button
            type="submit"
            className="bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)]"
          >
            Save service
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
          {services.map((service) => (
            <li
              key={service.id}
              className="p-4 flex items-center gap-4 hover:bg-slate-50"
            >
              <span className="text-xs uppercase tracking-wide text-slate-400 w-20 flex-shrink-0">
                {service.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{service.title}</p>
                <p className="text-sm text-slate-500 truncate">
                  {service.description}
                </p>
              </div>
              <span className="text-xs text-slate-400">#{service.sort_order}</span>
              <button
                onClick={async () => {
                  if (!confirm(`Delete "${service.title}"?`)) return;
                  const res = await deleteService(service.id);
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
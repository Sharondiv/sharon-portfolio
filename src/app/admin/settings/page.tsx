"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { updateSettings } from "@/lib/project-actions";
import type { SiteSettings } from "@/lib/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setSettings(data.settings);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    setSaved(false);

    const result = await updateSettings(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return <p className="text-slate-500">Loading settings...</p>;
  }

  if (!settings) {
    return (
      <div>
        <p className="text-red-600">{error || "Could not load settings"}</p>
        <Link href="/admin" className="text-sm text-slate-500 mt-4 inline-block">
          ← Back to projects
        </Link>
      </div>
    );
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
          Site settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Edit the site-wide content. Changes apply everywhere instantly.
        </p>
      </div>

      <form
        action={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-8 space-y-8"
      >
        {/* HERO */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Hero section
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="hero_greeting" className="block text-sm font-medium text-slate-700 mb-2">
                Greeting
              </label>
              <input
                id="hero_greeting"
                name="hero_greeting"
                type="text"
                defaultValue={settings.hero_greeting}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="hero_headline" className="block text-sm font-medium text-slate-700 mb-2">
                Headline
              </label>
              <textarea
                id="hero_headline"
                name="hero_headline"
                rows={2}
                defaultValue={settings.hero_headline}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
              />
            </div>
            <div>
              <label htmlFor="hero_subtext" className="block text-sm font-medium text-slate-700 mb-2">
                Subtext
              </label>
              <textarea
                id="hero_subtext"
                name="hero_subtext"
                rows={2}
                defaultValue={settings.hero_subtext}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
              />
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-slate-700 mb-2">
                Availability
              </label>
              <input
                id="availability"
                name="availability"
                type="text"
                defaultValue={settings.availability}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="pt-6 border-t border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
            About section
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="about_intro" className="block text-sm font-medium text-slate-700 mb-2">
                Intro paragraph
              </label>
              <textarea
                id="about_intro"
                name="about_intro"
                rows={3}
                defaultValue={settings.about_intro}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
              />
            </div>
            <div>
              <label htmlFor="about_body_1" className="block text-sm font-medium text-slate-700 mb-2">
                Body paragraph 1
              </label>
              <textarea
                id="about_body_1"
                name="about_body_1"
                rows={3}
                defaultValue={settings.about_body_1}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
              />
            </div>
            <div>
              <label htmlFor="about_body_2" className="block text-sm font-medium text-slate-700 mb-2">
                Body paragraph 2
              </label>
              <textarea
                id="about_body_2"
                name="about_body_2"
                rows={3}
                defaultValue={settings.about_body_2}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y"
              />
            </div>
          </div>
        </section>

        {/* NOW */}
        <section className="pt-6 border-t border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Now section
          </h2>
          <div>
            <label htmlFor="now_items" className="block text-sm font-medium text-slate-700 mb-2">
              Focus items
            </label>
            <textarea
              id="now_items"
              name="now_items"
              rows={6}
              defaultValue={settings.now_items.join("\n")}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent resize-y font-mono text-sm"
            />
            <p className="mt-1 text-xs text-slate-400">
              One item per line.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <section className="pt-6 border-t border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Footer
          </h2>
          <div>
            <label htmlFor="footer_pitch" className="block text-sm font-medium text-slate-700 mb-2">
              Footer pitch
            </label>
            <input
              id="footer_pitch"
              name="footer_pitch"
              type="text"
              defaultValue={settings.footer_pitch}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section className="pt-6 border-t border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
            Contact
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                defaultValue={settings.contact_email}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="contact_github" className="block text-sm font-medium text-slate-700 mb-2">
                GitHub URL
              </label>
              <input
                id="contact_github"
                name="contact_github"
                type="url"
                defaultValue={settings.contact_github}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="contact_linkedin" className="block text-sm font-medium text-slate-700 mb-2">
                LinkedIn URL
              </label>
              <input
                id="contact_linkedin"
                name="contact_linkedin"
                type="url"
                defaultValue={settings.contact_linkedin}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="contact_whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                WhatsApp link
              </label>
              <input
                id="contact_whatsapp"
                name="contact_whatsapp"
                type="url"
                defaultValue={settings.contact_whatsapp}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="contact_whatsapp_display" className="block text-sm font-medium text-slate-700 mb-2">
                WhatsApp display number
              </label>
              <input
                id="contact_whatsapp_display"
                name="contact_whatsapp_display"
                type="text"
                defaultValue={settings.contact_whatsapp_display}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            ✓ Settings saved
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[color:var(--navy)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save settings"}
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
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
} from "react-icons/fi";
import { getFeaturedProjects } from "@/lib/projects";
import { getSettings } from "@/lib/settings";

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getFeaturedProjects(),
    getSettings(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-[color:var(--accent)] tracking-wide">
              {settings?.hero_greeting ?? "Hi, I'm Sharon 👋"}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[color:var(--navy)] leading-[1.1] tracking-tight">
              {settings?.hero_headline ??
                "Software engineer building modern, full-stack web applications."}
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              {settings?.hero_subtext ??
                "I design and build fast, reliable, and user-focused web products."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
              >
                View my work
                <FiArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 px-6 py-3 rounded-lg font-medium hover:border-[color:var(--navy)] hover:bg-slate-50 transition-colors"
              >
                Get in touch
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-5">
              {settings?.contact_github && (
                <a
                  href={settings.contact_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[color:var(--navy)] transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub size={20} />
                </a>
              )}
              {settings?.contact_linkedin && (
                <a
                  href={settings.contact_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[color:var(--navy)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
              )}
              {settings?.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="text-slate-500 hover:text-[color:var(--navy)] transition-colors"
                  aria-label="Email"
                >
                  <FiMail size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--navy)]/20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <Image
                  src="/hero-photo.jpg"
                  alt="Sharon Bake"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--navy)] tracking-tight">
                Featured work
              </h2>
              <p className="mt-2 text-slate-600">
                Selected projects I&apos;ve built recently.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)] hover:underline"
            >
              All projects <FiArrowRight size={14} />
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-center text-slate-400 py-12">
              No projects yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all"
                >
                  {project.image_url && (
                    <Link href={`/projects/${project.id}`} className="block">
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium">{project.year}</span>
                      <span>·</span>
                      <span className="uppercase tracking-wide">
                        {project.stack.slice(0, 2).join(" · ")}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-[color:var(--navy)]">
                      <Link href={`/projects/${project.id}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-slate-600">{project.tagline}</p>
                    <p className="mt-3 text-sm text-slate-500 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 text-sm font-medium">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-[color:var(--accent)] hover:underline"
                      >
                        View case study →
                      </Link>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-[color:var(--navy)] inline-flex items-center gap-1"
                        >
                          Live <FiExternalLink size={12} />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-[color:var(--navy)] inline-flex items-center gap-1"
                        >
                          Code <FiGithub size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 sm:hidden text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--accent)] hover:underline"
            >
              View all projects <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
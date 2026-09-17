import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiGithub,
  FiExternalLink,
  FiArrowLeft,
  FiLock,
} from "react-icons/fi";
import { getProjectById, getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[color:var(--navy)]"
      >
        <FiArrowLeft size={14} /> All projects
      </Link>

      {/* Header */}
      <div className="mt-8">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="font-medium">{project.year}</span>
          {project.featured && (
            <>
              <span>·</span>
              <span className="text-[color:var(--accent)] font-medium">
                Featured
              </span>
            </>
          )}
        </div>

        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[color:var(--navy)] tracking-tight">
          {project.title}
        </h1>

        <p className="mt-4 text-xl text-slate-600">{project.tagline}</p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
            >
              Visit live site <FiExternalLink />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 px-5 py-2.5 rounded-lg font-medium hover:border-[color:var(--navy)] hover:bg-slate-50 transition-colors"
            >
              View code <FiGithub />
            </a>
          )}
          {project.note && (
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              <FiLock size={14} /> {project.note}
            </span>
          )}
        </div>
      </div>

      {/* Hero image */}
      {project.image_url && (
        <div className="mt-12 relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-[color:var(--navy)]">
            About this project
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        <aside className="md:col-span-1">
          <div className="border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Tech stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="mt-6 text-sm font-semibold text-slate-900">
              Year
            </h3>
            <p className="mt-2 text-sm text-slate-600">{project.year}</p>
          </div>
        </aside>
      </div>

      {/* Footer CTA */}
      <div className="mt-20 pt-10 border-t border-slate-200">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[color:var(--accent)] hover:underline font-medium"
        >
          <FiArrowLeft size={14} /> Back to all projects
        </Link>
      </div>
    </div>
  );
}
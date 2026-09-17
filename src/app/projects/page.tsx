import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects — Sharon Bake",
  description:
    "Selected software engineering projects by Sharon Bake — full-stack web applications, e-commerce, and more.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[color:var(--accent)] tracking-wide">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[color:var(--navy)] tracking-tight">
          Projects
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          A selection of things I&apos;ve built — from concept to deployment.
          Every project here is something I designed and coded end to end.
        </p>
      </div>

      {/* List */}
      {projects.length === 0 ? (
        <div className="mt-16 border border-dashed border-slate-300 rounded-2xl p-16 text-center">
          <p className="text-slate-500">
            No projects published yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-14 space-y-16">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              {project.image_url && (
                <Link
                  href={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </Link>
              )}

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
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

                <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[color:var(--navy)] tracking-tight">
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:text-[color:var(--accent)] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="mt-3 text-lg text-slate-600">
                  {project.tagline}
                </p>

                <p className="mt-4 text-slate-500 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-[color:var(--accent)] hover:gap-2 transition-all"
                  >
                    View case study <FiArrowRight size={14} />
                  </Link>
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-[color:var(--navy)]"
                    >
                      Live demo <FiExternalLink size={14} />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-[color:var(--navy)]"
                    >
                      Code <FiGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
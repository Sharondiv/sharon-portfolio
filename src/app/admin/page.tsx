import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";
import DeleteButton from "./_components/DeleteButton";

export default async function AdminDashboard() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--navy)]">
            Projects
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          + Add project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <p className="text-slate-500">No projects yet.</p>
          <Link
            href="/admin/new"
            className="mt-4 inline-block text-[color:var(--accent)] hover:underline"
          >
            Add your first project →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 flex items-center gap-4 hover:bg-slate-50"
              >
                <div className="relative w-20 h-14 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {project.title}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {project.tagline}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  {project.featured && (
                    <span className="text-xs bg-[color:var(--accent)]/10 text-[color:var(--accent)] px-2 py-1 rounded font-medium">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {project.year}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
  <Link
    href={`/admin/edit/${project.id}`}
    className="text-sm text-[color:var(--navy)] hover:text-[color:var(--accent)] font-medium"
  >
    Edit
  </Link>
  <DeleteButton id={project.id} />
</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
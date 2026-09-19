import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, signOut } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top row: brand + sign out */}
          <div className="h-16 flex items-center justify-between">
            <Link
              href="/admin"
              className="font-bold text-[color:var(--navy)] truncate"
            >
              Portfolio Admin
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden sm:inline text-sm text-slate-500 hover:text-[color:var(--navy)]"
                target="_blank"
              >
                View site ↗
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          {/* Nav row: scrollable on mobile, normal on desktop */}
          <nav className="flex items-center gap-4 text-sm pb-3 overflow-x-auto whitespace-nowrap">
            <Link
              href="/admin"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Projects
            </Link>
            <Link
              href="/admin/new"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Add new
            </Link>
            <Link
              href="/admin/skills"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Skills
            </Link>
            <Link
              href="/admin/timeline"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Timeline
            </Link>
            <Link
              href="/admin/services"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Services
            </Link>
            <Link
              href="/admin/settings"
              className="text-slate-600 hover:text-[color:var(--navy)] font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
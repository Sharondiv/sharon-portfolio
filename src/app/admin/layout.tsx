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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-bold text-[color:var(--navy)]"
            >
              Portfolio Admin
            </Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
  <Link href="/admin" className="text-slate-600 hover:text-[color:var(--navy)]">
    Projects
  </Link>
  <Link href="/admin/new" className="text-slate-600 hover:text-[color:var(--navy)]">
    Add new
  </Link>
  <Link href="/admin/skills" className="text-slate-600 hover:text-[color:var(--navy)]">
    Skills
  </Link>
  <Link href="/admin/settings" className="text-slate-600 hover:text-[color:var(--navy)]">
    Settings
  </Link>
  <Link href="/admin/timeline" className="text-slate-600 hover:text-[color:var(--navy)]">
  Timeline
</Link>
<Link href="/admin/services" className="text-slate-600 hover:text-[color:var(--navy)]">
  Services
</Link>
</nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-[color:var(--navy)]"
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
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
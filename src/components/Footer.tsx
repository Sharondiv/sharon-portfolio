import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSettings();

  const email = settings?.contact_email ?? "sakwesharonbake@gmail.com";
  const github = settings?.contact_github ?? "https://github.com/Sharondiv";
  const linkedin =
    settings?.contact_linkedin ??
    "https://www.linkedin.com/in/sakwe-sharon-bake-b8b129342";

  return (
    <footer className="border-t border-slate-200 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-semibold text-[color:var(--navy)]">
              Sharon Bake
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {settings?.footer_pitch ??
                "Software engineering graduate building modern, full-stack web applications."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[color:var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[color:var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href={`mailto:${email}`}
              className="text-slate-500 hover:text-[color:var(--accent)] transition-colors"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Sharon Bake. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
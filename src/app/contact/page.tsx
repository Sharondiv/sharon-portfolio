import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiMessageCircle,
  FiDownload,
} from "react-icons/fi";
import { getSettings } from "@/lib/settings";

export const metadata = {
  title: "Contact — Sharon Bake",
  description:
    "Get in touch with Sharon Bake — software engineer based in Douala, Cameroon.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  const email = settings?.contact_email ?? "sakwesharonbake@gmail.com";
  const github = settings?.contact_github ?? "https://github.com/Sharondiv";
  const linkedin =
    settings?.contact_linkedin ??
    "https://www.linkedin.com/in/sakwe-sharon-bake-b8b129342";
  const whatsapp = settings?.contact_whatsapp ?? "https://wa.me/237675480803";
  const whatsappDisplay =
    settings?.contact_whatsapp_display ?? "+237 675 480 803";

  const contacts = [
    {
      icon: FiMail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      description: "Best for job opportunities and serious inquiries.",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: github.replace(/^https?:\/\//, ""),
      href: github,
      description: "See the code behind my projects.",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: linkedin.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      href: linkedin,
      description: "Connect professionally.",
    },
    {
      icon: FiMessageCircle,
      label: "WhatsApp",
      value: whatsappDisplay,
      href: whatsapp,
      description: "Quick messages and casual chats.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div>
        <p className="text-sm font-medium text-[color:var(--accent)] tracking-wide">
          Contact
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[color:var(--navy)] tracking-tight">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-xl">
          I&apos;m open to job opportunities, freelance projects, and
          collaborations. The fastest way to reach me is email.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={
                contact.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="border border-slate-200 rounded-2xl p-6 hover:border-[color:var(--accent)] hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[color:var(--accent)]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[color:var(--accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {contact.label}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {contact.value}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {contact.description}
              </p>
            </a>
          );
        })}
      </div>

      <div className="mt-12 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
        <div>
          <h2 className="font-bold text-slate-900">Download my CV</h2>
          <p className="text-sm text-slate-500 mt-1">
            One-page PDF — education, experience, and skills.
          </p>
        </div>
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          <FiDownload size={16} /> Download CV
        </a>
      </div>
    </div>
  );
}
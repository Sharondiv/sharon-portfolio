import Link from "next/link";
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { getServices } from "@/lib/services";

export const metadata = {
  title: "Services — Sharon Bake",
  description:
    "Web development services: full-stack applications, front-end builds, and API development.",
};

const iconMap: Record<string, typeof FiCode> = {
  code: FiCode,
  layout: FiLayout,
  database: FiDatabase,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[color:var(--accent)] tracking-wide">
          Services
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[color:var(--navy)] tracking-tight">
          What I can build for you
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Whether you need a complete web application, a beautiful front-end,
          or a backend API — I can help design, build, and ship it.
        </p>
      </div>

      <div className="mt-16 space-y-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? FiCode;
          return (
            <div
              key={service.id}
              className="border border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[color:var(--accent)]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <FiCheck className="w-4 h-4 text-[color:var(--accent)] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 border border-slate-200 rounded-2xl p-8 md:p-12 text-center bg-slate-50">
        <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--navy)]">
          Have a project in mind?
        </h2>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Let&apos;s talk about what you&apos;re building and how I can help.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
        >
          Get in touch <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
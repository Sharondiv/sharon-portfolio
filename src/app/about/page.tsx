import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getSettings } from "@/lib/settings";
import { getSkills, groupSkills } from "@/lib/skills";
import { getTimeline } from "@/lib/timeline";

export const metadata = {
  title: "About — Sharon Bake",
  description:
    "Software engineering graduate based in Douala, Cameroon. Building modern, full-stack web applications while preparing for a master's degree.",
};

const timeline = [
  {
    year: "2027",
    title: "Master's Degree (Upcoming)",
    org: "Software Engineering",
    description:
      "Planning to pursue a master's degree to deepen my knowledge in software engineering — focusing on advanced system design, scalable architectures, and modern development practices.",
  },
  {
    year: "2026",
    title: "Software Engineering Degree",
    org: "Department of Computer Engineering",
    description:
      "Graduated with a degree in Software Engineering. Studied algorithms, data structures, software design, databases, and full-stack web development.",
  },
  {
    year: "2024 — 2026",
    title: "Full-Stack Projects",
    org: "Self-directed + academic",
    description:
      "Built multiple production-grade applications including an e-commerce storefront, a recipe sharing platform (MERN), a car rental management system, and a property listing app — combining academic coursework with real-world practice.",
  },
  {
    year: "2022 — 2024",
    title: "Foundations of Software Engineering",
    org: "University studies",
    description:
      "Studied the fundamentals of programming, web development, and computer science — building the foundation I continue to build on today.",
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  const skills = groupSkills(await getSkills());
  const timeline = await getTimeline();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-[color:var(--accent)] tracking-wide">
            About
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[color:var(--navy)] tracking-tight">
            Hi, I&apos;m Sharon.
          </h1>
          <div className="mt-6 space-y-4 text-lg text-slate-600 leading-relaxed">
            <p>{settings?.about_intro}</p>
            <p>{settings?.about_body_1}</p>
            <p>{settings?.about_body_2}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[color:var(--navy)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[color:var(--accent)] transition-colors"
            >
              See my work <FiArrowRight />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 px-6 py-3 rounded-lg font-medium hover:border-[color:var(--navy)] hover:bg-slate-50 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="md:col-span-1 flex justify-center md:justify-end">
          <div className="relative w-56 h-56 md:w-full md:aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-lg max-w-[280px]">
            <Image
              src="/about-photo.jpg"
              alt="Sharon Bake"
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-[color:var(--navy)] tracking-tight">
          Skills
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="border border-slate-200 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-[color:var(--navy)] tracking-tight">
          Education & Experience
        </h2>
        <div className="mt-8 space-y-8">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8"
            >
              <div>
                <p className="text-sm font-semibold text-[color:var(--accent)]">
                  {item.year}
                </p>
              </div>
              <div className="border-l-2 border-slate-200 pl-6 pb-2">
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.org}</p>
                <p className="text-slate-600 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Now */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-[color:var(--navy)] tracking-tight">
          Now
        </h2>
        <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50">
          <ul className="space-y-3 text-slate-700">
            {(settings?.now_items ?? []).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[color:var(--accent)] font-bold">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
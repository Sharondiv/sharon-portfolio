export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  image: string;
  github?: string;
  live?: string;
  note?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "sharon-dress-store",
    title: "SD Dress Store",
    tagline: "Modern full-stack e-commerce storefront",
    description:
      "A complete online store with product catalog, category filtering, shopping cart with persistence, and a full checkout flow. Built with Next.js 16, TypeScript, and Tailwind CSS. Features toast notifications, responsive mobile-first design, and a rotating hero slider.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Context"],
    year: "2026",
    image: "/project-images/dress-store.png",
    github: "https://github.com/Sharondiv/sharon-dress-store",
    live: "https://sharon-dress-store.vercel.app",
    featured: true,
  },
];

// ─── Template for adding new projects later ───
// Copy this block, paste it above the closing `];`, and fill it in.
//
// {
//   id: "unique-slug",
//   title: "Project Name",
//   tagline: "One-line summary",
//   description: "2–3 sentences about what it does and what you learned.",
//   stack: ["Tech1", "Tech2", "Tech3"],
//   year: "2026",
//   image: "/project-images/your-image.png",
//   github: "https://github.com/Sharondiv/repo-name",
//   live: "https://your-live-url.com",
//   featured: false,
// },
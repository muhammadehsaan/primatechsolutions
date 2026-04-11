import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about PrimeTech Solutions, our engineering-driven approach, and how we help modern businesses grow through software, systems, and digital marketing.",
  path: "/about",
  keywords: ["about PrimeTech Solutions", "technology partner", "software company", "digital solutions"],
});

const values = [
  {
    title: "Execution with Clarity",
    description:
      "We turn business requirements into actionable plans, clear milestones, and transparent delivery cycles.",
  },
  {
    title: "Engineering Quality",
    description:
      "Our systems are designed for performance, security, and maintainability from day one.",
  },
  {
    title: "Business Outcomes",
    description:
      "Every solution is aligned with measurable outcomes such as efficiency, growth, and better customer experience.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(10,18,32,0.95),rgba(2,36,53,0.88))] px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">About Us</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          PrimeTech Solutions is a technology partner for modern businesses.
        </h1>
        <p className="mt-6 max-w-3xl text-gray-300">
          We help companies design, build, and grow through web development, mobile applications, ERP systems,
          POS solutions, and performance marketing strategies.
        </p>
      </section>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="surface-panel rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-cyanPrimary">{value.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{value.description}</p>
          </article>
        ))}
      </div>

      <section className="surface-panel mx-auto mt-10 max-w-7xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Our Working Approach</h2>
        <ol className="mt-5 space-y-3 text-gray-200">
          <li>1. Discovery: We understand your current workflow, goals, and constraints.</li>
          <li>2. Solution Design: We map architecture, features, timeline, and delivery priorities.</li>
          <li>3. Build & Launch: We deliver in phases, test deeply, and support go-live confidently.</li>
        </ol>
      </section>
    </div>
  );
}

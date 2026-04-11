import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogs } from "@/constants/blogs";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Read PrimeTech Solutions articles on software engineering, automation, ERP, SEO, lead generation, and digital growth.",
  path: "/blogs",
  keywords: ["PrimeTech blog", "software engineering blog", "SEO insights", "ERP articles"],
});

export default function BlogsPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(10,18,32,0.95),rgba(4,24,36,0.9))] px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Insights</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-6xl">PrimeTech Blog</h1>
        <p className="mt-5 max-w-3xl text-gray-300">
          Practical articles on software engineering, automation, and digital growth for modern businesses.
        </p>
      </section>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.slug} className="surface-panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-cyanPrimary">{new Date(blog.publishedAt).toDateString()}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug">{blog.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{blog.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blogs/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white">
              Read Article <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

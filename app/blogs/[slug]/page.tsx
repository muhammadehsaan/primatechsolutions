import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogs } from "@/constants/blogs";
import { createMetadata } from "@/lib/seo";

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderParagraph(paragraph: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = linkPattern.exec(paragraph)) !== null) {
    const [fullMatch, label, href] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, matchIndex));
    }

    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`${href}-${matchIndex}`} href={href} className="text-cyanPrimary underline-offset-4 hover:underline">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${matchIndex}`}
          href={href}
          className="text-cyanPrimary underline-offset-4 hover:underline"
          rel="noreferrer"
          target="_blank"
        >
          {label}
        </a>,
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex));
  }

  return nodes;
}

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return createMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: "/blogs",
      noindex: true,
    });
  }

  return createMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${blog.slug}`,
    type: "article",
    publishedTime: blog.publishedAt,
    keywords: [...blog.tags, blog.title, "PrimeTech blog"],
  });
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="px-4 pb-16 sm:px-6">
      <article className="mx-auto max-w-4xl">
        <Link href="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>

        <section className="surface-panel rounded-3xl p-6 sm:p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyanPrimary">{new Date(blog.publishedAt).toDateString()}</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{blog.title}</h1>
          <p className="mt-3 text-sm text-gray-400">By {blog.author}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-8">
          {blog.sections.map((section) => (
            <div key={section.heading} className="surface-panel rounded-2xl p-6 sm:p-7">
              <h2 className="text-2xl font-semibold text-cyanPrimary">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-gray-200">
                    {renderParagraph(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </article>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Blog } from "@/constants/blogs";
import { subscribeToBlogBySlug } from "@/lib/blogService";

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

export default function PublicBlogDetails({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBlogBySlug(
      slug,
      (nextBlog) => {
        setBlog(nextBlog);
        setIsLoaded(true);
      },
      { onlyPublished: true },
    );

    return () => {
      unsubscribe();
    };
  }, [slug]);

  const paragraphs = blog?.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!isLoaded) {
    return (
      <div className="px-4 pb-16 pt-10 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-cyanPrimary/20 bg-cyanPrimary/8 px-6 py-5 text-sm text-white">
          Loading blog...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(11,28,46,0.94))] p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanPrimary/80">Article Missing</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This Blog Is Not Available</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-300">
            Ya to blog abhi publish nahi hua, ya phir delete ho chuka hai.
          </p>
          <Link
            href="/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#042437]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 sm:px-6">
      <article className="mx-auto max-w-6xl">
        <Link href="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-cyanPrimary/20 bg-[linear-gradient(160deg,rgba(5,11,20,0.98),rgba(9,24,42,0.96))] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="relative aspect-[16/7] min-h-[260px] w-full sm:min-h-[380px]">
            <Image src={blog.coverImage} alt={blog.coverImageAlt} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,16,0.1),rgba(4,10,16,0.15)_35%,rgba(4,10,16,0.72)_100%)]" />
          </div>

          <div className="px-6 py-8 sm:px-8 md:px-12 md:py-10">
            <p className="text-sm uppercase tracking-[0.18em] text-cyanPrimary">{new Date(blog.publishedAt).toDateString()}</p>
            <h1 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">{blog.title}</h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-gray-300 sm:text-lg">{blog.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>By {blog.author}</span>
              <span className="hidden h-1 w-1 rounded-full bg-gray-500 sm:inline-block" />
              <span>{blog.tags.length} topic tags</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(10,27,44,0.94))] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.14)] sm:p-7 md:p-8">
          <div className="space-y-5">
            {paragraphs?.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-8 text-gray-200 sm:text-base">
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

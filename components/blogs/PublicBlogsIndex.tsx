"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/constants/blogs";
import { isUsingFirebaseBlogs, subscribeToBlogs } from "@/lib/blogService";

export default function PublicBlogsIndex() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const isFirebaseMode = isUsingFirebaseBlogs();

  useEffect(() => {
    return subscribeToBlogs(setBlogs, { onlyPublished: true });
  }, []);

  const featuredImage = blogs[0]?.coverImage ?? "/intro-video-poster.jpg";
  const featuredAlt = blogs[0]?.coverImageAlt ?? "PrimeTech blog hero image";
  const hasBlogs = blogs.length > 0;
  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [blogs],
  );

  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyanPrimary/20 bg-[linear-gradient(120deg,rgba(7,19,34,0.96),rgba(10,36,58,0.92))]">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="px-5 py-12 sm:px-8 sm:py-16 md:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanPrimary">Insights</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              PrimeTech Blog
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
              Practical articles on software engineering, automation, ERP, SEO, retail systems, and digital growth
              written for modern businesses.
            </p>
            {!isFirebaseMode && (
              <p className="mt-4 max-w-3xl text-sm leading-7 text-amber-100/90">
                Firebase live database abhi configure nahi hui. Published preview same browser ke temporary admin data se show ho
                rahi hai.
              </p>
            )}
          </div>

          <div className="relative min-h-[260px] overflow-hidden border-t border-white/10 lg:min-h-full lg:border-t-0 lg:border-l">
            <Image
              src={featuredImage}
              alt={featuredAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,18,30,0.25),rgba(5,13,24,0.6))]" />
          </div>
        </div>
      </section>

      {hasBlogs ? (
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {sortedBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="overflow-hidden rounded-[2rem] border border-cyanPrimary/18 bg-[linear-gradient(180deg,rgba(5,11,20,0.98),rgba(8,19,34,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.2)]"
            >
              <Link href={`/blogs/${blog.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.coverImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(2,7,14,0.08)_70%,rgba(2,7,14,0.35)_100%)]" />
                </div>
              </Link>

              <div className="px-6 pb-8 pt-6 sm:px-8">
                <p className="text-xs uppercase tracking-[0.16em] text-cyanPrimary/90">
                  {new Date(blog.publishedAt).toDateString()}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-[2rem]">
                  <Link href={`/blogs/${blog.slug}`} className="transition hover:text-cyanPrimary">
                    {blog.title}
                  </Link>
                </h2>
                <p className="mt-5 text-[15px] leading-8 text-gray-300 sm:text-base">{blog.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-cyanPrimary transition hover:text-white"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="mx-auto mt-12 max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(11,28,46,0.94))] p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanPrimary/80">No Blogs Yet</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Fresh Articles Are Being Prepared</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
            Published blogs yahin show hongi. Draft blogs public side par visible nahi hotin.
          </p>
        </section>
      )}
    </div>
  );
}

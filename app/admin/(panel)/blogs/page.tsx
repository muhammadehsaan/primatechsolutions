"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Database, Plus } from "lucide-react";
import type { Blog } from "@/constants/blogs";
import { isUsingFirebaseBlogs, subscribeToBlogs } from "@/lib/blogService";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const isFirebaseMode = isUsingFirebaseBlogs();

  useEffect(() => {
    return subscribeToBlogs(setBlogs);
  }, []);

  const blogRows = useMemo(
    () => [...blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [blogs],
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(11,30,49,0.94))] p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyanPrimary/80">Blog Manager</p>
          <h2 className="mt-2 text-2xl font-semibold">All Articles</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-300">
            Yeh list admin ko current blogs dekhne, edit page kholne, aur publish state manage karne ke liye ready hai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
            <Database className="h-4 w-4 text-cyanPrimary" />
            {isFirebaseMode ? "Firebase live mode" : "Local preview mode"}
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#042437]"
          >
            <Plus className="h-4 w-4" />
            Add New Blog
          </Link>
        </div>
      </section>

      {blogRows.length > 0 ? (
        <div className="space-y-4">
          {blogRows.map((blog) => (
            <article
              key={blog.slug}
              className="grid grid-cols-1 gap-5 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(11,28,46,0.94))] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.14)] lg:grid-cols-[240px_minmax(0,1fr)_220px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <Image src={blog.coverImage} alt={blog.coverImageAlt} fill sizes="240px" className="object-cover" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-cyanPrimary/80">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(blog.publishedAt).toDateString()}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] ${
                      blog.status === "published"
                        ? "border border-cyanPrimary/25 bg-cyanPrimary/10 text-cyanPrimary"
                        : "border border-amber-300/20 bg-amber-300/10 text-amber-100"
                    }`}
                  >
                    {blog.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-white">{blog.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{blog.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">Quick Actions</p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Edit form kholein, public page check karein, aur status ko update karein.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/admin/blogs/${blog.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyanPrimary/30 bg-cyanPrimary/10 px-4 py-3 text-sm font-semibold text-cyanPrimary"
                  >
                    Edit Blog <ArrowRight className="h-4 w-4" />
                  </Link>
                  {blog.status === "published" ? (
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Open Public View
                    </Link>
                  ) : (
                    <div className="inline-flex w-full items-center justify-center rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm font-semibold text-gray-400">
                      Draft not visible publicly
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-cyanPrimary/25 bg-cyanPrimary/8 p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanPrimary/80">Empty Blog List</p>
          <h3 className="mt-4 text-3xl font-bold text-white">No Blog Posts Available</h3>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-gray-300">
            Ab yahan se naya blog create karke publish kiya ja sakta hai. Ek hi form se image aur content dono upload honge.
          </p>
          <Link
            href="/admin/blogs/new"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#042437]"
          >
            Add First Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
    </div>
  );
}

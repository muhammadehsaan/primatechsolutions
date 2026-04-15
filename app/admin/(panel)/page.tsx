"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, CloudUpload, Database, FileText, PenSquare } from "lucide-react";
import type { Blog } from "@/constants/blogs";
import { isUsingFirebaseBlogs, subscribeToBlogs } from "@/lib/blogService";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const isFirebaseMode = isUsingFirebaseBlogs();

  useEffect(() => {
    return subscribeToBlogs(setBlogs);
  }, []);

  const latestBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 4),
    [blogs],
  );

  const totalBlogs = blogs.length;
  const publishedCount = blogs.filter((blog) => blog.status === "published").length;
  const draftCount = blogs.filter((blog) => blog.status === "draft").length;
  const totalWords = blogs.reduce((sum, blog) => sum + blog.content.split(/\s+/).filter(Boolean).length, 0);
  const totalTags = new Set(blogs.flatMap((blog) => blog.tags)).size;
  const hasBlogs = latestBlogs.length > 0;

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,20,35,0.96),rgba(15,42,70,0.92))] p-5">
          <p className="text-sm text-gray-400">Total Blogs</p>
          <p className="mt-3 text-4xl font-bold text-white">{totalBlogs}</p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,20,35,0.96),rgba(15,42,70,0.92))] p-5">
          <p className="text-sm text-gray-400">Published Blogs</p>
          <p className="mt-3 text-4xl font-bold text-white">{publishedCount}</p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,20,35,0.96),rgba(15,42,70,0.92))] p-5">
          <p className="text-sm text-gray-400">Draft Blogs</p>
          <p className="mt-3 text-4xl font-bold text-white">{draftCount}</p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,20,35,0.96),rgba(15,42,70,0.92))] p-5">
          <p className="text-sm text-gray-400">Total Words</p>
          <p className="mt-3 text-4xl font-bold text-white">{totalWords}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(10,28,47,0.94))] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cyanPrimary/80">Quick Actions</p>
          <h2 className="mt-2 text-2xl font-semibold">Simple Blog Publishing Flow</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
            Dashboard ab simple one-form CMS ke saath aligned hai. Aap new blog add kar sakte hain, cover image upload kar
            sakte hain, aur publish status control kar sakte hain.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/admin/blogs/new"
              className="rounded-[1.5rem] border border-cyanPrimary/25 bg-cyanPrimary/10 p-5 transition hover:border-cyanPrimary hover:bg-cyanPrimary/14"
            >
              <PenSquare className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 text-lg font-semibold text-white">Add New Blog</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">Open the full editor with content, tags, and image fields.</p>
            </Link>

            <Link
              href="/admin/blogs"
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/8"
            >
              <FileText className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 text-lg font-semibold text-white">Manage Blogs</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">Review saved blogs, open edit pages, and manage publish state.</p>
            </Link>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <CloudUpload className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 text-lg font-semibold text-white">Image Upload</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">Selected cover image save/publish ke waqt Cloudinary par upload hoti hai.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(8,17,29,0.98),rgba(11,28,45,0.94))] p-6">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-cyanPrimary" />
            <h2 className="text-xl font-semibold">Storage Mode</h2>
          </div>

          <div className="mt-5 space-y-3 text-sm leading-7 text-gray-300">
            <p className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
              {isFirebaseMode
                ? "Firebase envs mil gaye hain, is liye blogs Firestore se live read/write honge."
                : "Firebase envs abhi missing hain, is liye current browser me temporary local preview mode active hai."}
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">Cloudinary image upload route `/api/admin/upload-image` se handle ho rahi hai.</p>
            <p className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">Same form draft aur published dono statuses manage karta hai.</p>
            <p className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">Unique tags across all blogs: {totalTags}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,28,0.98),rgba(10,27,44,0.94))] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyanPrimary/80">Content Queue</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {hasBlogs ? "Latest Content in Queue" : "No Blogs Published Yet"}
            </h2>
          </div>
          <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white">
            Open full manager <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {hasBlogs ? (
          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
            {latestBlogs.map((blog) => (
              <div key={blog.slug} className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-cyanPrimary/80">
                  <CalendarClock className="h-4 w-4" />
                  {new Date(blog.publishedAt).toDateString()}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{blog.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{blog.excerpt}</p>
                <Link
                  href={`/admin/blogs/${blog.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white"
                >
                  Edit this blog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-cyanPrimary/25 bg-cyanPrimary/8 p-8 text-center">
            <p className="text-lg font-semibold text-white">Blog list is empty</p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300">
              Aapke tamam old blogs remove kar diye gaye hain. Ab dashboard bilkul clean hai aur naya article
              add karne ke liye panel ready hai.
            </p>
            <Link
              href="/admin/blogs/new"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#042437]"
            >
              Add First Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

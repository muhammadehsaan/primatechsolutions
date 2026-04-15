"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowUpRight,
  CloudUpload,
  Eye,
  LoaderCircle,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import type { Blog } from "@/constants/blogs";
import { deleteBlog, isUsingFirebaseBlogs, saveBlog, subscribeToBlogBySlug } from "@/lib/blogService";
import { slugifyBlogTitle } from "@/lib/blogStore";

type BlogEditorFormProps = {
  mode: "create" | "edit";
  initialBlog?: Blog;
  blogSlug?: string;
};

type UploadedImageResponse = {
  url: string;
  publicId?: string;
  message?: string;
};

function formatDateForInput(value?: string) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function splitTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default function BlogEditorForm({ mode, initialBlog, blogSlug }: BlogEditorFormProps) {
  const router = useRouter();
  const [blogId, setBlogId] = useState(initialBlog?.id ?? "");
  const [createdAt, setCreatedAt] = useState(initialBlog?.createdAt);
  const [title, setTitle] = useState(initialBlog?.title ?? "");
  const [slug, setSlug] = useState(initialBlog?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt ?? "");
  const [author, setAuthor] = useState(initialBlog?.author ?? "PrimeTech Editorial Team");
  const [publishedAt, setPublishedAt] = useState(formatDateForInput(initialBlog?.publishedAt));
  const [status, setStatus] = useState<"draft" | "published">(initialBlog?.status ?? "draft");
  const [tagsText, setTagsText] = useState(initialBlog?.tags.join(", ") ?? "");
  const [content, setContent] = useState(initialBlog?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialBlog?.coverImage ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initialBlog?.coverImageAlt ?? "");
  const [imagePublicId, setImagePublicId] = useState(initialBlog?.imagePublicId ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoadingBlog, setIsLoadingBlog] = useState(mode === "edit" && !initialBlog);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tags = useMemo(() => splitTags(tagsText), [tagsText]);
  const normalizedSlug = useMemo(() => slugifyBlogTitle(slug || title), [slug, title]);
  const previewImage = localPreviewUrl || coverImage || "/intro-video-poster.jpg";
  const isFirebaseMode = isUsingFirebaseBlogs();

  useEffect(() => {
    if (!selectedFile) {
      setLocalPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setLocalPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    if (mode !== "edit" || initialBlog || !blogSlug) {
      return;
    }

    const unsubscribe = subscribeToBlogBySlug(blogSlug, (blog) => {
      if (!blog) {
        setFormError("Requested blog nahi mila. Blog list se dobara open karein.");
        setIsLoadingBlog(false);
        return;
      }

      setBlogId(blog.id);
      setCreatedAt(blog.createdAt);
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt);
      setAuthor(blog.author);
      setPublishedAt(formatDateForInput(blog.publishedAt));
      setStatus(blog.status);
      setTagsText(blog.tags.join(", "));
      setContent(blog.content);
      setCoverImage(blog.coverImage);
      setCoverImageAlt(blog.coverImageAlt);
      setImagePublicId(blog.imagePublicId ?? "");
      setIsLoadingBlog(false);
    });

    return unsubscribe;
  }, [blogSlug, initialBlog, mode]);

  async function uploadImageIfNeeded() {
    if (!selectedFile) {
      return {
        url: coverImage.trim(),
        publicId: imagePublicId.trim(),
      };
    }

    setIsUploadingImage(true);

    try {
      const body = new FormData();
      body.append("file", selectedFile);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body,
      });

      const payload = (await response.json()) as UploadedImageResponse;

      if (!response.ok || !payload.url) {
        throw new Error(payload.message || "Image upload failed.");
      }

      setCoverImage(payload.url);
      setImagePublicId(payload.publicId ?? "");
      setSelectedFile(null);
      return payload;
    } finally {
      setIsUploadingImage(false);
    }
  }

  async function handleSave(nextStatus: "draft" | "published") {
    const trimmedTitle = title.trim();
    const finalSlug = normalizedSlug;

    if (!trimmedTitle) {
      setFormError("Blog title required hai.");
      return;
    }

    if (!finalSlug) {
      setFormError("Slug required hai.");
      return;
    }

    if (!excerpt.trim()) {
      setFormError("Excerpt required hai.");
      return;
    }

    if (!content.trim()) {
      setFormError("Blog content required hai.");
      return;
    }

    if (!coverImage.trim() && !selectedFile) {
      setFormError("Blog cover image required hai.");
      return;
    }

    setFormError("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      const uploadedImage = await uploadImageIfNeeded();
      const savedBlog = await saveBlog(
        {
          title: trimmedTitle,
          slug: finalSlug,
          excerpt: excerpt.trim(),
          content: content.trim(),
          author: author.trim() || "PrimeTech Editorial Team",
          coverImage: uploadedImage.url || coverImage.trim(),
          coverImageAlt: coverImageAlt.trim() || trimmedTitle,
          imagePublicId: uploadedImage.publicId || imagePublicId.trim(),
          publishedAt,
          status: nextStatus,
          tags,
          createdAt,
        },
        mode === "edit" ? blogSlug ?? blogId : undefined,
      );

      setBlogId(savedBlog.id);
      setCreatedAt(savedBlog.createdAt);
      setSlug(savedBlog.slug);
      setStatus(nextStatus);
      setSuccessMessage(nextStatus === "published" ? "Blog successfully published." : "Draft successfully saved.");
      router.replace(`/admin/blogs/${savedBlog.slug}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Blog save nahi ho saka.";
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const activeSlug = blogSlug ?? blogId ?? normalizedSlug;
    if (!activeSlug) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteBlog(activeSlug);
      router.replace("/admin/blogs");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Blog delete nahi ho saka.";
      setFormError(message);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoadingBlog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-cyanPrimary/20 bg-cyanPrimary/8 px-5 py-4 text-sm text-white">
          <LoaderCircle className="h-4 w-4 animate-spin text-cyanPrimary" />
          Loading blog editor...
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave(status);
        }}
      >
        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(8,17,29,0.98),rgba(11,30,49,0.94))] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)] sm:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyanPrimary/85">Simple Blog Upload</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {mode === "create" ? "Add New Blog" : "Edit Blog"}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-300">
                Aik hi form se image upload, blog content save, aur publish status control ho jayega.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving || isUploadingImage}
                className="inline-flex items-center gap-2 rounded-2xl border border-cyanPrimary/30 bg-cyanPrimary/10 px-4 py-2.5 text-sm font-semibold text-cyanPrimary transition hover:border-cyanPrimary hover:bg-cyanPrimary/15 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={isSaving || isUploadingImage}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-cyan px-4 py-2.5 text-sm font-semibold text-[#032335] disabled:opacity-60"
              >
                <CloudUpload className="h-4 w-4" />
                Publish Blog
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-300">
              {isFirebaseMode ? "Firebase live mode" : "Local preview mode"}
            </span>
            <span className="rounded-full border border-cyanPrimary/25 bg-cyanPrimary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyanPrimary">
              {selectedFile ? "New image ready to upload" : "Existing image will be used"}
            </span>
          </div>

          {!isFirebaseMode && (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-50">
              Firebase envs abhi set nahi hain, is liye current browser me temporary local save use hoga. Env add karte hi yehi form
              Firestore me live save karega.
            </div>
          )}

          {(formError || successMessage) && (
            <div
              className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm ${
                formError
                  ? "border border-rose-400/20 bg-rose-400/10 text-rose-100"
                  : "border border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
              }`}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{formError || successMessage}</span>
            </div>
          )}
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,15,26,0.98),rgba(10,28,46,0.94))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-7">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-200">Blog Title</span>
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!slug.trim()) {
                    setSlug(slugifyBlogTitle(event.target.value));
                  }
                }}
                placeholder="Example: Smart ERP Integration for Growing Businesses"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-200">Slug</span>
              <input
                value={slug}
                onChange={(event) => setSlug(slugifyBlogTitle(event.target.value))}
                placeholder="smart-erp-integration-for-growing-businesses"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
              <p className="mt-2 text-xs text-gray-500">Preview URL: `/blogs/{normalizedSlug || "your-blog-slug"}`</p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-200">Author Name</span>
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="PrimeTech Editorial Team"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-200">Publish Date</span>
              <input
                type="date"
                value={publishedAt}
                onChange={(event) => setPublishedAt(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-gray-200">Excerpt</span>
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              rows={4}
              placeholder="Yeh short summary blog card par show hogi."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-cyanPrimary"
            />
          </label>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
            <label className="block">
              <span className="text-sm font-medium text-gray-200">Tags</span>
              <input
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
                placeholder="SEO, ERP, Automation"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
            </label>

            <div>
              <span className="text-sm font-medium text-gray-200">Status</span>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    status === "draft"
                      ? "border border-white/20 bg-white/12 text-white"
                      : "border border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    status === "published"
                      ? "border border-cyanPrimary/35 bg-cyanPrimary/14 text-cyanPrimary"
                      : "border border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
                  }`}
                >
                  Published
                </button>
              </div>
            </div>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-gray-200">Full Blog Content</span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={16}
              placeholder="Pura blog content yahan likhein. Har naya paragraph blank line se separate karein."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-8 text-white outline-none transition focus:border-cyanPrimary"
            />
          </label>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(8,17,29,0.98),rgba(10,25,41,0.96))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Cover Image Upload</h2>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                User image choose karega, save/publish par woh Cloudinary par upload hogi aur us ka URL blog ke saath save ho jayega.
              </p>
            </div>
            <div className="rounded-2xl border border-cyanPrimary/25 bg-cyanPrimary/10 px-4 py-3 text-sm font-semibold text-cyanPrimary">
              {isUploadingImage ? "Uploading image..." : selectedFile ? "Image selected" : "Ready"}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="block">
              <span className="text-sm font-medium text-gray-200">Choose Image</span>
              <label
                htmlFor="blog-cover-image"
                className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-cyanPrimary/30 bg-cyanPrimary/8 px-4 py-4 text-sm font-semibold text-cyanPrimary transition hover:border-cyanPrimary hover:bg-cyanPrimary/12"
              >
                <UploadCloud className="h-4 w-4" />
                {selectedFile ? selectedFile.name : "Select cover image"}
                <input
                  id="blog-cover-image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-200">Image Alt Text</span>
              <input
                value={coverImageAlt}
                onChange={(event) => setCoverImageAlt(event.target.value)}
                placeholder="Describe the image for SEO and accessibility"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
              />
            </label>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-200">Current Image URL</span>
              <input
                value={coverImage}
                readOnly
                placeholder="Cloudinary URL save hone ke baad yahan nazar ayega"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-200">Cloudinary Public ID</span>
              <input
                value={imagePublicId}
                readOnly
                placeholder="Upload hone ke baad automatic fill hoga"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 outline-none"
              />
            </label>
          </div>
        </section>

        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/15 disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Delete Blog
          </button>
        )}
      </form>

      <aside className="space-y-6">
        <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,14,24,0.98),rgba(10,24,41,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
          <div className="relative aspect-[16/10] w-full">
            <Image src={previewImage} alt={coverImageAlt || title || "Blog preview"} fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(4,10,16,0.78)_100%)]" />
          </div>

          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-cyanPrimary/90">{new Date(publishedAt).toDateString()}</p>
              <span
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${
                  status === "published"
                    ? "border border-cyanPrimary/25 bg-cyanPrimary/10 text-cyanPrimary"
                    : "border border-amber-300/20 bg-amber-300/10 text-amber-100"
                }`}
              >
                {status}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">{title || "Your blog title will appear here"}</h3>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              {excerpt || "A short excerpt will appear here so users quickly understand what this blog is about."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-gray-300"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Tags abhi add nahi kiye gaye.</span>
              )}
            </div>

            {normalizedSlug && (
              <button
                type="button"
                onClick={() => router.push(`/blogs/${normalizedSlug}`)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary transition hover:text-white"
              >
                <Eye className="h-4 w-4" />
                Preview public page
              </button>
            )}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,27,0.98),rgba(12,28,45,0.96))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-6">
          <h3 className="text-lg font-semibold text-white">Form Snapshot</h3>
          <div className="mt-5 space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
              <span className="text-gray-400">Mode</span>
              <span className="font-semibold text-white">{mode === "create" ? "Create" : "Edit"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
              <span className="text-gray-400">Slug</span>
              <span className="font-semibold text-white">{normalizedSlug || "--"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
              <span className="text-gray-400">Tags</span>
              <span className="font-semibold text-white">{tags.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
              <span className="text-gray-400">Image</span>
              <span className="font-semibold text-white">{selectedFile ? "New upload" : coverImage ? "Ready" : "Missing"}</span>
            </div>
          </div>

          <a
            href={coverImage || "#"}
            target={coverImage ? "_blank" : undefined}
            rel={coverImage ? "noreferrer" : undefined}
            className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
              coverImage ? "text-cyanPrimary transition hover:text-white" : "cursor-not-allowed text-gray-500"
            }`}
          >
            Open current image
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>
      </aside>
    </div>
  );
}

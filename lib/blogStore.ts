import type { Blog } from "@/constants/blogs";

export const BLOG_STORAGE_KEY = "primatech_admin_blogs";

export type EditableBlogPayload = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  coverImageAlt: string;
  imagePublicId?: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
  createdAt?: string;
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function slugifyBlogTitle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStoredBlogs(): Blog[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(BLOG_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as Array<
      Partial<Blog> & {
        sections?: Array<{
          heading?: string;
          body?: string[];
        }>;
      }
    >;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((blog, index) => ({
      id: typeof blog.id === "string" ? blog.id : `${Date.now()}-${index}`,
      slug: typeof blog.slug === "string" ? blog.slug : "",
      title: typeof blog.title === "string" ? blog.title : "",
      excerpt: typeof blog.excerpt === "string" ? blog.excerpt : "",
      content:
        typeof blog.content === "string"
          ? blog.content
          : Array.isArray(blog.sections)
            ? blog.sections
                .flatMap((section) => [section.heading?.trim(), ...(section.body ?? [])])
                .filter(Boolean)
                .join("\n\n")
            : "",
      coverImage: typeof blog.coverImage === "string" && blog.coverImage ? blog.coverImage : "/intro-video-poster.jpg",
      coverImageAlt: typeof blog.coverImageAlt === "string" && blog.coverImageAlt ? blog.coverImageAlt : "Blog cover image",
      imagePublicId: typeof blog.imagePublicId === "string" ? blog.imagePublicId : undefined,
      publishedAt: typeof blog.publishedAt === "string" ? blog.publishedAt : new Date().toISOString().slice(0, 10),
      status: blog.status === "published" ? "published" : "draft",
      author: typeof blog.author === "string" && blog.author ? blog.author : "PrimeTech Editorial Team",
      tags: Array.isArray(blog.tags) ? blog.tags.map((tag) => String(tag)).filter(Boolean) : [],
      createdAt: typeof blog.createdAt === "string" ? blog.createdAt : undefined,
      updatedAt: typeof blog.updatedAt === "string" ? blog.updatedAt : undefined,
    }));
  } catch {
    return [];
  }
}

export function saveStoredBlogs(blogs: Blog[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
}

export function findStoredBlogBySlug(slug: string) {
  return getStoredBlogs().find((blog) => blog.slug === slug);
}

export function createBlogRecord(payload: EditableBlogPayload, existingId?: string): Blog {
  const now = new Date().toISOString();

  return {
    id: existingId ?? `${Date.now()}`,
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
    coverImage: payload.coverImage || "/intro-video-poster.jpg",
    coverImageAlt: payload.coverImageAlt || payload.title || "Blog cover image",
    imagePublicId: payload.imagePublicId,
    publishedAt: payload.publishedAt,
    status: payload.status,
    author: payload.author,
    tags: payload.tags,
    createdAt: payload.createdAt ?? now,
    updatedAt: now,
  };
}

export function upsertStoredBlog(payload: EditableBlogPayload, existingSlug?: string) {
  const blogs = getStoredBlogs();
  const existingBlog = existingSlug ? blogs.find((blog) => blog.slug === existingSlug) : undefined;
  const nextBlog = createBlogRecord(payload, existingBlog?.id);

  const nextBlogs = existingBlog
    ? blogs.map((blog) => (blog.slug === existingSlug ? nextBlog : blog))
    : [nextBlog, ...blogs];

  saveStoredBlogs(nextBlogs);
  return nextBlog;
}

export function deleteStoredBlog(slug: string) {
  const blogs = getStoredBlogs();
  const nextBlogs = blogs.filter((blog) => blog.slug !== slug);
  saveStoredBlogs(nextBlogs);
}

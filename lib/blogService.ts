import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import type { Blog } from "@/constants/blogs";
import { getFirebaseDb, hasFirebaseConfig } from "@/lib/firebase";
import { deleteStoredBlog, findStoredBlogBySlug, getStoredBlogs, upsertStoredBlog, type EditableBlogPayload } from "@/lib/blogStore";

const BLOGS_COLLECTION = "blogs";
const BLOGS_UPDATED_EVENT = "primatech-blogs-updated";

type BlogListener = (blogs: Blog[]) => void;
type SingleBlogListener = (blog: Blog | null) => void;

function dispatchBlogsUpdated() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(BLOGS_UPDATED_EVENT));
}

function subscribeToLocalBlogs(listener: BlogListener, onlyPublished = false) {
  if (typeof window === "undefined") {
    listener([]);
    return () => undefined;
  }

  const sync = () => {
    const blogs = getStoredBlogs()
      .filter((blog) => (onlyPublished ? blog.status === "published" : true))
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
    listener(blogs);
  };

  sync();
  window.addEventListener("storage", sync);
  window.addEventListener(BLOGS_UPDATED_EVENT, sync as EventListener);

  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener(BLOGS_UPDATED_EVENT, sync as EventListener);
  };
}

function subscribeToLocalBlog(slug: string, listener: SingleBlogListener, onlyPublished = false) {
  if (typeof window === "undefined") {
    listener(null);
    return () => undefined;
  }

  const sync = () => {
    const blog = findStoredBlogBySlug(slug);
    listener(blog && (!onlyPublished || blog.status === "published") ? blog : null);
  };

  sync();
  window.addEventListener("storage", sync);
  window.addEventListener(BLOGS_UPDATED_EVENT, sync as EventListener);

  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener(BLOGS_UPDATED_EVENT, sync as EventListener);
  };
}

function mapFirebaseBlog(snapshot: QueryDocumentSnapshot<DocumentData>): Blog {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    slug: typeof data.slug === "string" ? data.slug : snapshot.id,
    title: typeof data.title === "string" ? data.title : "",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    content: typeof data.content === "string" ? data.content : "",
    coverImage: typeof data.coverImage === "string" && data.coverImage ? data.coverImage : "/intro-video-poster.jpg",
    coverImageAlt: typeof data.coverImageAlt === "string" && data.coverImageAlt ? data.coverImageAlt : "Blog cover image",
    imagePublicId: typeof data.imagePublicId === "string" ? data.imagePublicId : undefined,
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : new Date().toISOString().slice(0, 10),
    status: data.status === "published" ? "published" : "draft",
    author: typeof data.author === "string" && data.author ? data.author : "PrimeTech Editorial Team",
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)).filter(Boolean) : [],
    createdAt: typeof data.createdAt === "string" ? data.createdAt : undefined,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
  };
}

export function isUsingFirebaseBlogs() {
  return hasFirebaseConfig();
}

export function subscribeToBlogs(listener: BlogListener, options?: { onlyPublished?: boolean }): Unsubscribe {
  if (!hasFirebaseConfig()) {
    return subscribeToLocalBlogs(listener, options?.onlyPublished);
  }

  const db = getFirebaseDb();
  if (!db) {
    listener([]);
    return () => undefined;
  }

  const blogsQuery = query(collection(db, BLOGS_COLLECTION), orderBy("publishedAt", "desc"));

  return onSnapshot(blogsQuery, (snapshot) => {
    const blogs = snapshot.docs.map(mapFirebaseBlog).filter((blog) => (options?.onlyPublished ? blog.status === "published" : true));
    listener(blogs);
  });
}

export function subscribeToBlogBySlug(slug: string, listener: SingleBlogListener, options?: { onlyPublished?: boolean }): Unsubscribe {
  if (!hasFirebaseConfig()) {
    return subscribeToLocalBlog(slug, listener, options?.onlyPublished);
  }

  const db = getFirebaseDb();
  if (!db) {
    listener(null);
    return () => undefined;
  }

  const blogRef = doc(db, BLOGS_COLLECTION, slug);

  return onSnapshot(blogRef, (snapshot) => {
    if (!snapshot.exists()) {
      listener(null);
      return;
    }

    const blog = mapFirebaseBlog(snapshot as QueryDocumentSnapshot<DocumentData>);
    listener(options?.onlyPublished && blog.status !== "published" ? null : blog);
  });
}

export async function saveBlog(payload: EditableBlogPayload, previousSlug?: string) {
  const existingLocalBlog = findStoredBlogBySlug(payload.slug);

  if (!hasFirebaseConfig()) {
    if (existingLocalBlog && existingLocalBlog.slug !== previousSlug) {
      throw new Error("Yeh slug pehle se use ho raha hai. Koi aur unique slug choose karein.");
    }

    const savedBlog = upsertStoredBlog(payload, previousSlug);
    dispatchBlogsUpdated();
    return savedBlog;
  }

  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase configuration missing hai.");
  }

  const now = new Date().toISOString();
  const nextBlog: Blog = {
    id: payload.slug,
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

  const nextBlogRef = doc(db, BLOGS_COLLECTION, nextBlog.slug);
  const existingFirebaseBlog = await getDoc(nextBlogRef);

  if (existingFirebaseBlog.exists() && nextBlog.slug !== previousSlug) {
    throw new Error("Yeh slug pehle se use ho raha hai. Koi aur unique slug choose karein.");
  }

  await setDoc(nextBlogRef, nextBlog);

  if (previousSlug && previousSlug !== nextBlog.slug) {
    await deleteDoc(doc(db, BLOGS_COLLECTION, previousSlug));
  }

  dispatchBlogsUpdated();
  return nextBlog;
}

export async function deleteBlog(slug: string) {
  if (!hasFirebaseConfig()) {
    deleteStoredBlog(slug);
    dispatchBlogsUpdated();
    return;
  }

  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase configuration missing hai.");
  }

  await deleteDoc(doc(db, BLOGS_COLLECTION, slug));
  dispatchBlogsUpdated();
}

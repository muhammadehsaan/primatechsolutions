export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  imagePublicId?: string;
  publishedAt: string;
  status: "draft" | "published";
  author: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const blogs: Blog[] = [];

import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noindex = false,
  publishedTime,
  image,
}: SeoInput): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  const absoluteUrl = `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
  const absoluteImageUrl = image
    ? image.startsWith("http://") || image.startsWith("https://")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: normalizedPath,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: "PrimeTech Solutions",
      locale: "en_US",
      type,
      ...(absoluteImageUrl ? { images: [{ url: absoluteImageUrl }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: absoluteImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(absoluteImageUrl ? { images: [absoluteImageUrl] } : {}),
    },
  };
}

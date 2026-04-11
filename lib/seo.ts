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
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noindex = false,
  publishedTime,
}: SeoInput): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  const absoluteUrl = `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;

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
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

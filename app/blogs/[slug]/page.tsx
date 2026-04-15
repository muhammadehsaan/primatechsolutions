import type { Metadata } from "next";
import PublicBlogDetails from "@/components/blogs/PublicBlogDetails";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return createMetadata({
    title: "Blog Details",
    description: "Read the full article from PrimeTech Solutions blog.",
    path: "/blogs",
    type: "article",
    keywords: ["PrimeTech blog", "business article", "digital growth"],
  });
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicBlogDetails slug={slug} />;
}

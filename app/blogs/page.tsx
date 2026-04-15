import type { Metadata } from "next";
import PublicBlogsIndex from "@/components/blogs/PublicBlogsIndex";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Read PrimeTech Solutions articles on software engineering, automation, ERP, SEO, lead generation, and digital growth.",
  path: "/blogs",
  keywords: ["PrimeTech blog", "software engineering blog", "SEO insights", "ERP articles"],
});

export default function BlogsPage() {
  return <PublicBlogsIndex />;
}

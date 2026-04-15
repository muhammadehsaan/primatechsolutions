import type { Metadata } from "next";
import BlogEditorForm from "@/components/admin/BlogEditorForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Edit ${slug} | PrimeTech Admin`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditAdminBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogEditorForm mode="edit" blogSlug={slug} />;
}

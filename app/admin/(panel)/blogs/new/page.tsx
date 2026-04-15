import type { Metadata } from "next";
import BlogEditorForm from "@/components/admin/BlogEditorForm";

export const metadata: Metadata = {
  title: "Add Blog | PrimeTech Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewAdminBlogPage() {
  return <BlogEditorForm mode="create" />;
}

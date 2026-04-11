import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact PrimeTech Solutions to discuss web development, apps, ERP, design, SEO, Google Ads, and digital marketing requirements.",
  path: "/contact",
  keywords: ["contact PrimeTech Solutions", "software consultation", "digital marketing inquiry"],
});

export default function ContactPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(10,18,32,0.95),rgba(5,30,46,0.92))] px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Contact Us</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-6xl">Let&apos;s Build Something Valuable</h1>
        <p className="mt-5 max-w-3xl text-gray-300">
          Share your requirement and our team will get back with a tailored technical roadmap.
        </p>
      </section>

      <ContactContent className="mx-auto mt-12 max-w-7xl" />
    </div>
  );
}

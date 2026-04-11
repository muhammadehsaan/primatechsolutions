import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Query Sent",
  description: "Your Primatech Solutions inquiry has been sent successfully.",
  path: "/contact-success",
  noindex: true,
});

export default function ContactSuccessPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-cyanPrimary/25 bg-[linear-gradient(140deg,rgba(10,18,32,0.96),rgba(8,43,67,0.92))] px-6 py-14 text-center shadow-[0_0_30px_rgba(0,229,255,0.08)] sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanPrimary">Query Sent</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">Your query has been sent successfully</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          Thank you for contacting Primatech Solutions. Our team will review your inquiry and contact you shortly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-cyan px-6 py-3 font-semibold text-white"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-cyanPrimary/35 px-6 py-3 font-semibold text-cyanPrimary transition-colors hover:bg-cyanPrimary/10"
          >
            Send Another Query
          </Link>
        </div>
      </section>
    </div>
  );
}

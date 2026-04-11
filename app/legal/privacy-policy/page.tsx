import type { Metadata } from "next";
import { contactDetails } from "@/lib/contact";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the PrimeTech Solutions privacy policy covering information collection, usage, data protection, and contact rights.",
  path: "/legal/privacy-policy",
  keywords: ["privacy policy", "PrimeTech Solutions privacy", "data protection"],
});

const privacySections = [
  {
    title: "Information We Collect",
    content:
      "We collect information submitted through contact forms, service inquiries, and direct communication, including name, email, phone number, and project details.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Collected data is used to respond to inquiries, prepare project proposals, deliver services, and improve our support quality.",
  },
  {
    title: "Data Security",
    content:
      "PrimeTech Solutions applies reasonable technical and operational safeguards to protect your data from unauthorized access or disclosure.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell personal data. Information may be shared only with trusted partners necessary for project delivery under confidentiality terms.",
  },
  {
    title: "Your Rights",
    content:
      `You may request correction or deletion of your personal information by contacting us at ${contactDetails.email}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(10,18,32,0.95),rgba(3,32,46,0.9))] px-5 py-12 sm:px-8 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Legal Center</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-5 text-gray-300">
          This policy explains how PrimeTech Solutions collects, uses, and safeguards your information.
        </p>
      </section>

      <div className="mx-auto mt-8 max-w-4xl space-y-5">
        {privacySections.map((section) => (
          <section key={section.title} className="surface-panel rounded-2xl p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-cyanPrimary">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-200">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

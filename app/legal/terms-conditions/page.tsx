import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description:
    "Read the PrimeTech Solutions terms and conditions for service scope, payments, timelines, intellectual property, and liability.",
  path: "/legal/terms-conditions",
  keywords: ["terms and conditions", "PrimeTech Solutions terms", "service terms"],
});

const termsSections = [
  {
    title: "Project Engagement & Scope",
    content: [
      "All projects begin with a detailed consultation to define the scope, deliverables, and timelines.",
      "Any changes to the project scope after the work has commenced may result in adjustments to the final quote and delivery date.",
    ],
  },
  {
    title: "Payment Terms (The 50/50 Rule)",
    content: [
      "To maintain high-quality standards and dedicate expert resources to your project, we follow a structured payment policy:",
      "Advance Payment: A 50% non-refundable advance payment is required before the commencement of any project. This secures your slot in our production cycle.",
      "Final Payment: The remaining 50% balance must be cleared immediately after the project is completed and before the final files, website hand-over, or \"Go-Live\" phase.",
      "Payment Methods: We accept payments via Bank Transfer, Payoneer, Wise, and other major international payment gateways.",
    ],
  },
  {
    title: "Project Timeline & Delivery",
    content: [
      "We strive to meet all deadlines. However, timelines depend on the timely provision of necessary assets (content, logos, access) from the client's side.",
      "Delay in client feedback or material provision may extend the project completion date.",
    ],
  },
  {
    title: "Client Responsibilities",
    content: [
      "The client is responsible for providing accurate information and creative assets required for the project.",
      "The client must review and provide feedback in a timely manner to ensure the project stays on schedule.",
    ],
  },
  {
    title: "Lifetime After-Sales Service & Support",
    content: [
      "At Primatech Solutions, we believe in long-term partnerships.",
      "Lifetime Support: We provide lifetime after-sales service for the specific features and modules developed by us. If any technical bug or error arises in our original work, we will fix it free of charge.",
      "Exclusions: This support does not cover issues caused by third-party updates, client-side code modifications, or new feature requests (which will be billed separately).",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "Upon full and final payment, the ownership and intellectual property rights of the final deliverables are transferred to the client.",
      "Primatech Solutions reserves the right to showcase the completed work in our portfolio and marketing materials unless a Non-Disclosure Agreement (NDA) is signed.",
    ],
  },
  {
    title: "Privacy & Confidentiality",
    content: [
      "We respect your privacy. All business data, login credentials, and project details shared with us are kept 100% confidential and are never shared with third parties.",
      "We use industry-standard security measures to protect your digital assets.",
    ],
  },
  {
    title: "Refunds & Cancellations",
    content: [
      "Since we allocate resources and time immediately upon project start, the 50% advance payment is non-refundable.",
      "If a project is cancelled by the client mid-way, the client is liable to pay for the work completed up to that point.",
    ],
  },
  {
    title: "Revision Policy",
    content: [
      "We offer a specific number of revisions (as mentioned in your project proposal) to ensure the final output matches your vision.",
      "Excessive revisions beyond the agreed scope will be subject to additional charges.",
    ],
  },
  {
    title: "Modifications to Terms",
    content: [
      "Primatech Solutions reserves the right to update these terms and policies. Clients will be notified of any significant changes that affect ongoing projects.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(10,18,32,0.95),rgba(3,32,46,0.9))] px-5 py-12 sm:px-8 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Legal Center</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">Terms of Service & Company Policies</h1>
        <p className="mt-5 text-gray-300">
          Welcome to Primatech Solutions. By engaging with our services, you agree to the following professional terms and
          conditions. These policies are designed to ensure a transparent, efficient, and mutually beneficial relationship
          between our agency and our global clients.
        </p>
      </section>

      <div className="mx-auto mt-8 max-w-4xl space-y-5">
        {termsSections.map((section) => (
          <section key={section.title} className="surface-panel rounded-2xl p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-cyanPrimary">{section.title}</h2>
            <div className="mt-3 space-y-3 text-gray-200">
              {section.content.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

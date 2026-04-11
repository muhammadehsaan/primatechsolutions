"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, contactDetails } from "@/lib/contact";

type ContactContentProps = {
  className?: string;
};

const initialFormData = {
  fullName: "",
  workEmail: "",
  companyName: "",
  requiredService: "",
  projectDetails: "",
};

export default function ContactContent({ className }: ContactContentProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitSuccess) setSubmitSuccess("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitSuccess("");

    const whatsappMessage = [
      "Assalam o Alaikum, I want to send a project inquiry.",
      "",
      `Full Name: ${formData.fullName}`,
      `Work Email: ${formData.workEmail}`,
      `Company Name: ${formData.companyName || "Not provided"}`,
      `Required Service: ${formData.requiredService}`,
      "",
      "Project Details:",
      formData.projectDetails,
    ].join("\n");

    window.open(buildWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");
    setSubmitSuccess("WhatsApp chat is opening with your query pre-filled.");
  };

  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-5", className)}>
      <section className="surface-panel rounded-2xl p-7 lg:col-span-2">
        <h2 className="text-2xl font-semibold text-cyanPrimary">Direct Contact</h2>
        <div className="mt-5 space-y-4 text-gray-200">
          <p>
            <span className="font-semibold text-white">Email:</span>{" "}
            <a href={contactDetails.emailHref} className="transition hover:text-cyanPrimary">
              {contactDetails.email}
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">PTCL:</span>{" "}
            <a href={contactDetails.ptclHref} className="transition hover:text-cyanPrimary">
              {contactDetails.ptclDisplay}
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Phone:</span>{" "}
            <a href={contactDetails.phoneHref} className="transition hover:text-cyanPrimary">
              {contactDetails.phoneDisplay}
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Office:</span> {contactDetails.officeAddress}
          </p>
          <p>
            <span className="font-semibold text-white">Business Hours:</span> Monday to Friday, 9:00 AM to 6:00 PM
          </p>
        </div>
      </section>

      <section className="surface-panel rounded-2xl p-7 lg:col-span-3">
        <h2 className="text-2xl font-semibold text-cyanPrimary">Project Inquiry</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Click "Send Inquiry" and WhatsApp will open with your query pre-filled on our business number.
        </p>
        <form
          name="project-inquiry"
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-deepBlue/35 px-4 py-3 outline-none ring-cyanPrimary transition focus:ring"
          />
          <input
            name="workEmail"
            type="email"
            placeholder="Work Email"
            autoComplete="email"
            required
            value={formData.workEmail}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-deepBlue/35 px-4 py-3 outline-none ring-cyanPrimary transition focus:ring"
          />
          <input
            name="companyName"
            type="text"
            placeholder="Company Name"
            autoComplete="organization"
            value={formData.companyName}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-deepBlue/35 px-4 py-3 outline-none ring-cyanPrimary transition focus:ring"
          />
          <input
            name="requiredService"
            type="text"
            placeholder="Required Service"
            required
            value={formData.requiredService}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-deepBlue/35 px-4 py-3 outline-none ring-cyanPrimary transition focus:ring"
          />
          <textarea
            name="projectDetails"
            placeholder="Project details"
            rows={5}
            required
            value={formData.projectDetails}
            onChange={handleChange}
            className="rounded-xl border border-white/20 bg-deepBlue/35 px-4 py-3 outline-none ring-cyanPrimary transition focus:ring md:col-span-2"
          />
          {submitSuccess ? (
            <p className="text-sm text-emerald-300 md:col-span-2">{submitSuccess}</p>
          ) : null}
          <button
            type="submit"
            className="rounded-full bg-gradient-cyan px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2 md:w-max"
          >
            Send Inquiry
          </button>
        </form>
      </section>
    </div>
  );
}

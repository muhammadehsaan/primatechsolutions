import type { Metadata } from "next";
import { ArrowRight, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContactContent from "@/components/ContactContent";
import IntroAnimationSection from "@/components/IntroAnimationSection";
import { services } from "@/constants/services";
import { contactDetails } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Development, Digital Marketing & Creative Services",
  description:
    "PrimeTech Solutions provides web development, app development, ERP systems, AI model training, UI/UX, graphic design, SEO, Google Ads, and social media services for growth-focused businesses.",
  path: "/",
  keywords: [
    "PrimeTech Solutions",
    "web development",
    "app development",
    "ERP systems",
    "SEO services",
    "Google Ads",
    "digital marketing agency",
  ],
});

export default function Home() {
  const topServices = services.filter((service) => service.isTop).slice(0, 3);
  const featuredDigitalServices = services.filter((service) =>
    ["seo-services", "social-media-marketing", "social-media-management"].includes(service.slug),
  );
  const siteUrl = getSiteUrl();
  const sameAs = [
    "https://www.instagram.com/prima_techsolution?igsh=OXg1eTVkb3d3NHJ5",
    "https://www.linkedin.com/in/prima-tech-solutions-b09a333b5",
    "https://x.com/Prima_Tech10",
    "https://tiktok.com/@prima_techsolution",
    "https://www.youtube.com/@PrimaTechSolutions10",
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Primatech Solutions",
        url: siteUrl,
        logo: `${siteUrl}/prima%20logo%202.png`,
        image: `${siteUrl}/intro-video-poster.jpg`,
        description:
          "Primatech Solutions is a leading digital agency providing SEO, Web Development, and Digital Marketing services in USA, UAE, and Pakistan.",
        address: {
          "@type": "PostalAddress",
          streetAddress: contactDetails.officeAddress,
          addressLocality: "Rawalpindi",
          addressRegion: "Punjab",
          postalCode: "46000",
          addressCountry: "PK",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contactDetails.phoneHref.replace("tel:", ""),
          contactType: "customer service",
          areaServed: "Global",
          availableLanguage: ["English", "Urdu"],
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Primatech Solutions",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/services?q={q}`,
          "query-input": "required name=q",
        },
      },
    ],
  };

  return (
    <div className="relative w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <IntroAnimationSection />

      <section className="relative z-20 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyanPrimary/35 bg-[linear-gradient(120deg,rgba(8,36,63,0.96),rgba(14,69,109,0.9))] px-6 py-7 text-center shadow-[0_0_28px_rgba(0,229,255,0.14)] sm:px-10 sm:py-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-cyanPrimary/90 sm:text-sm">FOR OUR CLIENTS</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl">Your Vision, Engineered For Growth</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-cyan-100/85 sm:text-lg">
            From first impression to product launch, we build technology experiences that convert visitors into long-term customers.
          </p>
        </div>
      </section>

      <section className="relative mt-2 flex min-h-[76svh] items-center overflow-hidden border-t border-cyanPrimary/20 px-4 py-10 sm:mt-3 sm:min-h-[94vh] sm:px-6 sm:py-0">
        <Image
          src="/img 1.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 100vw"
          className="absolute inset-0 z-0 object-cover object-[84%_center] sm:object-center"
        />
        <div
          className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(12,104,168,0.16),transparent_38%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[2] bg-[linear-gradient(95deg,rgba(5,22,39,0.62)_0%,rgba(8,32,55,0.45)_45%,rgba(8,28,48,0.25)_70%,rgba(8,28,48,0.12)_100%)] sm:bg-[linear-gradient(135deg,rgba(10,32,56,0.45)_0%,rgba(18,62,101,0.55)_48%,rgba(11,36,61,0.7)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl pt-4 sm:pt-14">
          <div className="rounded-2xl p-4 sm:rounded-none sm:p-0">
            <p className="hero-chip mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold tracking-[0.08em] text-cyanPrimary sm:mb-6 sm:px-4 sm:text-sm sm:tracking-[0.18em]">
              <Bot className="h-4 w-4" />
              PRIMATECH SOLUTIONS
            </p>

            <h1 className="max-w-4xl text-[1.86rem] font-bold leading-[1.06] text-white sm:text-6xl sm:leading-[0.95] md:text-7xl">
              AI Driven
              <span className="mt-2 block break-words bg-gradient-to-r from-[#b4dfff] via-[#74d4ff] to-[#00e5ff] bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-gray-200 sm:mt-7 sm:text-xl">
              We deliver web and app development, eCommerce and ERP systems, AI model training, UI/UX, creative
              design, and digital marketing services that move your business forward.
            </p>

            <div className="hero-pill mt-7 flex w-full max-w-xl flex-col items-start gap-2 rounded-3xl px-5 py-3 text-sm sm:mt-10 sm:inline-flex sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-6 sm:text-xl">
              <span className="text-cyanPrimary/95">Presented By</span>
              <span className="break-words font-semibold text-white">Primatech Solutions</span>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-cyber px-7 py-3 font-semibold text-[#02263A] sm:w-auto"
              >
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-cyanPrimary/45 bg-[#1a4d79]/75 px-7 py-3 font-semibold text-white transition-colors hover:border-cyanPrimary hover:text-cyanPrimary sm:w-auto"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section relative z-10 border-t border-cyanPrimary/20 bg-[linear-gradient(180deg,#12385f_0%,#0f3154_100%)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-16">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
                Top 3 <span className="text-cyanPrimary">Core Services</span>
              </h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Built with a futuristic engineering mindset, optimized for speed, trust, and business impact.
              </p>
            </div>
            <Link href="/services" className="hidden items-center gap-2 text-cyanPrimary transition-colors hover:text-white md:flex">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-3">
            {topServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.slug}
                  className="service-card-cyber group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyanPrimary/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.2)] sm:p-8"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-cyanPrimary/10">
                    <Icon className="h-7 w-7 text-cyanPrimary" />
                  </div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyanPrimary/90">{service.category}</p>
                  <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mb-6 leading-relaxed text-gray-400">{service.shortDesc}</p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-cyanPrimary"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-cyanPrimary transition-colors hover:text-white">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="deferred-section relative z-10 border-t border-cyanPrimary/20 bg-[linear-gradient(180deg,#103757_0%,#0d2f4f_100%)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
                Best <span className="text-cyanPrimary">Digital Services</span>
              </h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Three focused digital growth services selected for visibility, lead generation, and brand consistency.
              </p>
            </div>
            <Link href="/services#digital-marketing-services" className="hidden items-center gap-2 text-cyanPrimary transition-colors hover:text-white md:flex">
              Explore digital services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-3">
            {featuredDigitalServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.slug}
                  className="service-card-cyber group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyanPrimary/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.2)] sm:p-8"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-cyanPrimary/10">
                    <Icon className="h-7 w-7 text-cyanPrimary" />
                  </div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyanPrimary/90">{service.category}</p>
                  <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mb-6 leading-relaxed text-gray-400">{service.shortDesc}</p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-cyanPrimary"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/services#digital-marketing-services" className="inline-flex items-center gap-2 font-semibold text-cyanPrimary transition-colors hover:text-white">
              Explore digital services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="deferred-section relative z-10 border-t border-cyanPrimary/20 bg-[linear-gradient(180deg,#0f3252_0%,#0a2740_100%)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(10,18,32,0.95),rgba(5,30,46,0.92))] px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Contact Us</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">Let&apos;s Build Something Valuable</h2>
            <p className="mt-5 max-w-3xl text-gray-300">
              Share your requirement and our team will get back with a tailored technical roadmap.
            </p>
          </section>

          <ContactContent className="mx-auto mt-12 max-w-7xl" />
        </div>
      </section>
    </div>
  );
}

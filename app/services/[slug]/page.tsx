import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { services } from "@/constants/services";
import { createMetadata } from "@/lib/seo";

type ContentBlock =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type ContentSection = {
  id: string;
  title: string;
  blocks: ContentBlock[];
};

function isSectionHeading(paragraph: string) {
  return (
    paragraph.length <= 90 &&
    !paragraph.endsWith(":") &&
    !paragraph.includes(".") &&
    !/^\d+\.\s/.test(paragraph)
  );
}

function isSubheading(paragraph: string) {
  return /^\d+\.\s/.test(paragraph);
}

function isColonBullet(paragraph: string) {
  if (!paragraph.includes(":")) {
    return false;
  }

  const [label] = paragraph.split(":");
  return label.trim().split(/\s+/).length <= 6 && paragraph.length <= 180;
}

function toSectionId(text: string, counts: Record<string, number>) {
  const baseId = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

  counts[baseId] = (counts[baseId] ?? 0) + 1;
  return counts[baseId] === 1 ? baseId : `${baseId}-${counts[baseId]}`;
}

function createContentSections(paragraphs: string[]) {
  const sections: ContentSection[] = [];
  let listItems: string[] = [];
  let currentSection: ContentSection | null = null;
  const sectionCounts: Record<string, number> = {};

  const ensureSection = (title = "Overview") => {
    if (!currentSection) {
      currentSection = {
        id: toSectionId(title, sectionCounts),
        title,
        blocks: [],
      };
      sections.push(currentSection);
    }

    return currentSection;
  };

  const flushList = () => {
    if (listItems.length > 0) {
      ensureSection().blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  paragraphs.forEach((paragraph) => {
    const text = paragraph.trim();
    if (!text) {
      return;
    }

    if (isSectionHeading(text)) {
      flushList();
      currentSection = {
        id: toSectionId(text, sectionCounts),
        title: text,
        blocks: [],
      };
      sections.push(currentSection);
      return;
    }

    if (isSubheading(text)) {
      flushList();
      ensureSection().blocks.push({ type: "subheading", text: text.replace(/^\d+\.\s*/, "") });
      return;
    }

    if (isColonBullet(text)) {
      listItems.push(text);
      return;
    }

    flushList();
    ensureSection().blocks.push({ type: "paragraph", text });
  });

  flushList();
  return sections.filter((section) => section.blocks.length > 0);
}

function splitListItem(item: string) {
  if (!item.includes(":")) {
    return { label: "", body: item };
  }

  const [label, ...rest] = item.split(":");
  return {
    label: label.trim(),
    body: rest.join(":").trim(),
  };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return createMetadata({
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      path: "/services",
      noindex: true,
    });
  }

  return createMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.detailIntro,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }
  const Icon = service.icon;
  const longFormParagraphs = service.content.length > 1 ? service.content.slice(1) : service.content;
  const contentSections = createContentSections(longFormParagraphs);
  const isSeoService = service.slug === "seo-services";
  const isGoogleAdsService = service.slug === "google-ads";
  const isWebsiteDesigningService = service.slug === "website-designing";
  const isSocialMediaMarketingService = service.slug === "social-media-marketing";
  const isSocialMediaManagementService = service.slug === "social-media-management";
  const isUiUxService = service.slug === "professional-ui-ux-design";
  const isGraphicDesignService = service.slug === "professional-graphic-design";
  const isThreeDAnimationService = service.slug === "3d-animation";
  const isBusinessConsultationService = service.slug === "business-consultation";
  const isAppDevelopmentService = service.slug === "app-development";
  const isEcommerceDevelopmentService = service.slug === "ecommerce-development";
  const isContentWritingService = service.slug === "content-writing";
  const isBrandIdentityService = service.slug === "professional-graphic-design";
  const seoStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Search Engine Optimization (SEO)",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    areaServed: ["USA", "UAE", "Pakistan", "Australia"],
    description: "Professional SEO services to rank your website on the first page of Google and drive organic traffic globally.",
  };
  const googleAdsStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Google Ads & PPC Management",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    areaServed: ["USA", "UAE", "Pakistan"],
    description: "High-converting Google Ads and PPC campaigns designed to generate instant leads and maximum ROI.",
  };
  const websiteDesignStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Professional Website Designing",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    areaServed: "Global",
    description: "Custom, responsive, and SEO-optimized website design services for businesses in USA, UAE, and Europe.",
  };
  const socialMediaMarketingStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Social Media Marketing",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "ROI-driven social media marketing and paid ad campaigns for Facebook, Instagram, and LinkedIn.",
  };
  const socialMediaManagementStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Social Media Management",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "Complete social media management including content planning, scheduling, and community engagement.",
  };
  const uiUxStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "UI/UX Design Services",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "User-centric UI/UX design for web and mobile apps to enhance engagement and user satisfaction.",
  };
  const graphicDesignStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Professional Graphic Design",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "Creative brand identity, logo design, and marketing visuals for global businesses.",
  };
  const brandIdentityStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Brand Identity Design",
    provider: { "@type": "Organization", name: "Primatech Solutions" },
    description: "Complete branding solutions including professional logo design and brand style guides.",
  };
  const threeDAnimationStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "3D Animation Services",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "High-quality 3D animations, modeling, and rendering for marketing and product demonstrations.",
  };
  const businessConsultationStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Business Consultation",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "Expert business strategy and operational guidance for startups and SMEs in global markets.",
  };
  const appDevelopmentStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "Mobile App Development",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "Custom iOS and Android app development services with seamless performance and modern UI.",
  };
  const ecommerceDevelopmentStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "E-commerce Website Development",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "Building scalable online stores using Shopify, WooCommerce, and custom Next.js solutions.",
  };
  const contentWritingStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: "SEO Content Writing",
    provider: { "@type": "Organization", name: "Primatech Solutions", url: "https://primatechsolutions.co" },
    description: "High-quality, SEO-optimized blog posts, website copy, and articles to drive engagement.",
  };

  return (
    <div id="top" className="px-4 pb-16 sm:px-6">
      {isSeoService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoStructuredData),
          }}
        />
      )}
      {isGoogleAdsService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(googleAdsStructuredData),
          }}
        />
      )}
      {isWebsiteDesigningService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteDesignStructuredData),
          }}
        />
      )}
      {isSocialMediaMarketingService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(socialMediaMarketingStructuredData),
          }}
        />
      )}
      {isSocialMediaManagementService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(socialMediaManagementStructuredData),
          }}
        />
      )}
      {isUiUxService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(uiUxStructuredData),
          }}
        />
      )}
      {isGraphicDesignService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graphicDesignStructuredData),
          }}
        />
      )}
      {isBrandIdentityService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(brandIdentityStructuredData),
          }}
        />
      )}
      {isThreeDAnimationService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(threeDAnimationStructuredData),
          }}
        />
      )}
      {isBusinessConsultationService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessConsultationStructuredData),
          }}
        />
      )}
      {isAppDevelopmentService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(appDevelopmentStructuredData),
          }}
        />
      )}
      {isEcommerceDevelopmentService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ecommerceDevelopmentStructuredData),
          }}
        />
      )}
      {isContentWritingService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contentWritingStructuredData),
          }}
        />
      )}
      <div className="mx-auto max-w-5xl">
        <Link href="/services" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <section className="surface-panel rounded-3xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyanPrimary/12">
            <Icon className="h-7 w-7 text-cyanPrimary" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">{service.category}</p>
          {service.isTop && <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyanPrimary/80">Top Service</p>}
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{service.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:mt-6 sm:text-lg">{service.detailIntro}</p>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section className="surface-panel rounded-2xl p-7">
            <h2 className="text-2xl font-semibold text-cyanPrimary">What We Focus On</h2>
            <ul className="mt-5 space-y-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-gray-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyanPrimary" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-2xl p-7">
            <h2 className="text-2xl font-semibold text-cyanPrimary">Key Deliverables</h2>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3 text-gray-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyanPrimary" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {contentSections.length > 0 && (
          <>
            <section className="mt-10 rounded-3xl border border-cyanPrimary/25 bg-[linear-gradient(135deg,rgba(9,33,58,0.92),rgba(15,59,96,0.82))] p-6 sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanPrimary/80">Service Guide</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Browse This Service Easily</h2>
                  <p className="mt-3 max-w-2xl text-gray-300">
                    We organized the full service details into readable sections so clients can quickly understand the
                    process, benefits, industries, and delivery scope.
                  </p>
                </div>
                <a href="#service-cta" className="text-sm font-semibold text-cyanPrimary transition hover:text-white">
                  Jump to inquiry
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {contentSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex rounded-full border border-cyanPrimary/30 bg-cyanPrimary/8 px-4 py-2 text-sm font-medium text-gray-100 transition hover:border-cyanPrimary hover:bg-cyanPrimary/15 hover:text-white"
                  >
                    {index + 1}. {section.title}
                  </a>
                ))}
              </div>
            </section>

            <div className="mt-10 space-y-6">
              {contentSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="surface-panel scroll-mt-28 rounded-3xl p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyanPrimary/75">
                        Section {index + 1}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
                    </div>
                    <a href="#top" className="text-sm font-medium text-cyanPrimary transition hover:text-white">
                      Back to top
                    </a>
                  </div>

                  <div className="mt-6 space-y-5">
                    {section.blocks.map((block, blockIndex) => {
                      if (block.type === "subheading") {
                        return (
                          <div
                            key={`${block.text}-${blockIndex}`}
                            className="inline-flex rounded-full border border-cyanPrimary/25 bg-cyanPrimary/10 px-4 py-2 text-sm font-semibold text-cyanPrimary sm:text-base"
                          >
                            {block.text}
                          </div>
                        );
                      }

                      if (block.type === "list") {
                        return (
                          <div
                            key={`list-${section.id}-${blockIndex}`}
                            className="grid grid-cols-1 gap-3 md:grid-cols-2"
                          >
                            {block.items.map((item) => {
                              const { label, body } = splitListItem(item);
                              return (
                                <div
                                  key={item}
                                  className="rounded-2xl border border-white/10 bg-deepBlue/25 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                                >
                                  <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyanPrimary" />
                                    <div>
                                      {label ? (
                                        <>
                                          <p className="font-semibold text-white">{label}</p>
                                          <p className="mt-1 text-sm leading-7 text-gray-300">{body}</p>
                                        </>
                                      ) : (
                                        <p className="text-sm leading-7 text-gray-200">{body}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }

                      return (
                        <p
                          key={`${block.text}-${blockIndex}`}
                          className="max-w-none text-[15px] leading-8 text-gray-200 sm:text-base"
                        >
                          {block.text}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        <section id="service-cta" className="mt-10 rounded-2xl border border-cyanPrimary/30 bg-cyanPrimary/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Need this service for your business?</h2>
          <p className="mt-3 max-w-2xl text-gray-200">
            Share your requirement and we will provide a scoped action plan with timeline, deliverables, and execution
            approach.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-gradient-cyan px-6 py-3 font-semibold text-white"
          >
            Discuss Your Project
          </Link>
        </section>
      </div>
    </div>
  );
}

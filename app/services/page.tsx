import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories, services, type Service } from "@/constants/services";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Explore PrimeTech Solutions services including web development, app development, ERP systems, graphic design, SEO, Google Ads, and business consultation.",
  path: "/services",
  keywords: [
    "web development services",
    "app development services",
    "ERP systems",
    "SEO services",
    "Google Ads services",
    "business consultation",
  ],
});

const quickSearchKeywords = [
  "web development",
  "app development",
  "SEO",
  "Google Ads",
  "ERP",
  "POS",
  "UI UX design",
  "social media marketing",
];

function normalizeQuery(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchesService(service: Service, terms: string[]) {
  if (terms.length === 0) {
    return true;
  }

  const searchableText = [
    service.title,
    service.category,
    service.shortDesc,
    service.detailIntro,
    ...service.keywords,
    ...service.highlights,
    ...service.deliverables,
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => searchableText.includes(term));
}

export default function ServicesPage({
  searchParams,
}: {
  searchParams?: { q?: string | string[] };
}) {
  const rawQuery = Array.isArray(searchParams?.q) ? searchParams?.q[0] : searchParams?.q ?? "";
  const query = normalizeQuery(rawQuery);
  const queryTerms = query.split(" ").filter(Boolean);
  const filteredServices = services.filter((service) => matchesService(service, queryTerms));

  return (
    <div className="px-4 pb-16 sm:px-6">
      <section className="soft-grid mx-auto max-w-7xl rounded-3xl border border-white/10 px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Our Services</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          Development, Digital Marketing, Creative Design, and Consulting
        </h1>
        <p className="mt-6 max-w-3xl text-gray-300">
          Explore our complete portfolio of professional services across development, marketing, design, and business
          strategy. Each service page includes detailed scope, focus areas, and key deliverables.
        </p>

        <form action="/services" method="get" className="mt-8">
          <label htmlFor="service-keyword" className="text-sm font-semibold text-cyanPrimary">
            Search services by keyword
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="service-keyword"
              name="q"
              defaultValue={query}
              placeholder="Try: seo, erp, app development, google ads..."
              className="w-full rounded-xl border border-white/20 bg-deepBlue/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyanPrimary"
            />
            <button
              type="submit"
              className="inline-flex justify-center rounded-xl bg-gradient-cyan px-6 py-3 text-sm font-semibold text-white"
            >
              Search
            </button>
            {query && (
              <Link href="/services" className="inline-flex justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:text-cyanPrimary">
                Clear
              </Link>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickSearchKeywords.map((keyword) => (
              <Link
                key={keyword}
                href={`/services?q=${encodeURIComponent(keyword)}`}
                className="rounded-full border border-cyanPrimary/30 bg-cyanPrimary/10 px-3 py-1 text-xs text-cyanPrimary hover:border-cyanPrimary hover:text-white"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </form>
      </section>

      <div className="mx-auto mt-12 max-w-7xl space-y-12 sm:mt-16 sm:space-y-14">
        <p className="text-sm text-gray-300">
          {query
            ? `Showing ${filteredServices.length} service${filteredServices.length === 1 ? "" : "s"} for "${query}"`
            : `Showing all ${services.length} services`}
        </p>

        {filteredServices.length === 0 && (
          <section className="surface-panel rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-cyanPrimary">No service found for this keyword</h2>
            <p className="mt-3 max-w-3xl text-gray-300">
              Try a broader keyword like web development, SEO, ERP, POS, social media, or app development.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {quickSearchKeywords.map((keyword) => (
                <Link
                  key={`empty-${keyword}`}
                  href={`/services?q=${encodeURIComponent(keyword)}`}
                  className="rounded-full border border-cyanPrimary/30 bg-cyanPrimary/10 px-3 py-1 text-xs text-cyanPrimary hover:border-cyanPrimary hover:text-white"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </section>
        )}

        {serviceCategories.map((category) => {
          const categoryServices = filteredServices.filter((service) => service.category === category);
          if (categoryServices.length === 0) {
            return null;
          }

          const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={category} id={categoryId}>
              <h2 className="text-2xl font-bold text-cyanPrimary md:text-3xl">{category}</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <article
                      key={service.slug}
                      className={`surface-panel rounded-2xl p-7 ${service.isTop ? "border-cyanPrimary/45 shadow-[0_0_25px_rgba(0,229,255,0.12)]" : ""}`}
                    >
                      <div className="mb-5 inline-flex rounded-xl bg-cyanPrimary/10 p-3">
                        <Icon className="h-6 w-6 text-cyanPrimary" />
                      </div>
                      {service.isTop && (
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Top Service</p>
                      )}
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-300">{service.shortDesc}</p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyanPrimary hover:text-white"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

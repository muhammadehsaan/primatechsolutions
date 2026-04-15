import { contactDetails } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export default function Head() {
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
    "@type": "ProfessionalService",
    name: "Primatech Solutions",
    alternateName: "Primatech Digital Agency",
    url: siteUrl,
    logo: `${siteUrl}/prima%20logo%202.png`,
    image: `${siteUrl}/intro-video-poster.jpg`,
    description:
      "Primatech Solutions delivers web development, app development, ERP systems, AI model training, UI/UX, graphic design, SEO, Google Ads, and social media services for growth-focused businesses.",
    telephone: contactDetails.phoneHref.replace("tel:", ""),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.officeAddress,
      addressLocality: "Rawalpindi",
      addressRegion: "Punjab",
      postalCode: "46000",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5651,
      longitude: 73.0169,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ERP Systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO",
          },
        },
      ],
    },
  };
  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Primatech ERP & POS Solution",
    operatingSystem: ["Windows", "Linux", "iOS", "Android"],
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ERP & POS",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "Primatech Solutions",
      url: siteUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 124,
    },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
    },
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which industries can Primatech ERP handle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Retail, manufacturing, healthcare, and e-commerce are all covered. We tailor workflows and automation to match how your team already operates.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer lifetime support after delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every custom web or mobile solution includes lifetime after-sales support, plus optional enhancement plans as you grow.",
        },
      },
      {
        "@type": "Question",
        name: "Can you build one app for both iOS and Android?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We use Flutter and React Native to deliver high-performance, cross-platform apps with a single codebase.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </>
  );
}

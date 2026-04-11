import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Briefcase,
  Code2,
  Database,
  Film,
  Globe,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  MonitorPlay,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  Target,
} from "lucide-react";
import serviceContent from "./serviceContent";

export type Service = {
  id: number;
  slug: string;
  title: string;
  category: string;
  group: "development" | "digital" | "creative" | "consulting";
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  shortDesc: string;
  detailIntro: string;
  highlights: string[];
  deliverables: string[];
  content: string[];
  icon: LucideIcon;
  isTop: boolean;
};

const serviceContentMap = serviceContent as Record<string, string[]>;
const serviceKeywordMap: Record<string, string[]> = {
  "web-development": [
    "web development company",
    "custom web development",
    "next.js development",
    "react development services",
    "seo friendly websites",
    "responsive website development",
  ],
  "app-development": [
    "mobile app development",
    "ios and android app development",
    "cross platform app development",
    "custom app development",
    "flutter app development",
    "react native app development",
  ],
  "google-ads": [
    "google ads management",
    "ppc services",
    "search ads campaigns",
    "google shopping ads",
    "youtube ads management",
    "google ads agency",
  ],
  "website-designing": [
    "website designing services",
    "ui ux website design",
    "responsive web design",
    "conversion focused design",
    "custom website design",
    "seo optimized web design",
  ],
  "ecommerce-development": [
    "ecommerce website development",
    "shopify development",
    "woocommerce development",
    "custom ecommerce solutions",
    "online store development",
    "secure ecommerce checkout",
  ],
  "software-development": [
    "custom software development",
    "enterprise software solutions",
    "web application development",
    "cloud software development",
    "software testing services",
    "software maintenance support",
  ],
  "erp-systems": [
    "custom erp development",
    "cloud erp software",
    "retail erp solutions",
    "erp implementation services",
    "business process automation",
    "erp integration services",
  ],
  "pos-systems": [
    "point of sale system",
    "retail pos software",
    "inventory pos system",
    "multi store pos",
    "barcode billing software",
    "erp integrated pos",
  ],
  "ai-model-training": [
    "ai model training services",
    "machine learning solutions",
    "nlp model development",
    "computer vision services",
    "custom ai solutions",
    "enterprise ai integration",
  ],
  "professional-ui-ux-design": [
    "ui ux design services",
    "user experience design",
    "web app ui design",
    "mobile app ux design",
    "product design services",
    "prototype and wireframe design",
  ],
  "professional-graphic-design": [
    "graphic design services",
    "brand identity design",
    "logo design services",
    "marketing creative design",
    "social media design",
    "digital branding agency",
  ],
  "3d-animation": [
    "3d animation services",
    "product animation videos",
    "architectural walkthrough",
    "3d rendering services",
    "3d modeling services",
    "explainer animation studio",
  ],
  "business-consultation": [
    "business consultation services",
    "business strategy consulting",
    "operational optimization",
    "financial planning for business",
    "growth strategy consulting",
    "digital transformation consulting",
  ],
  "social-media-marketing": [
    "social media marketing services",
    "facebook ads management",
    "instagram marketing",
    "linkedin marketing campaigns",
    "paid social media advertising",
    "lead generation campaigns",
  ],
  "social-media-management": [
    "social media management services",
    "content planning and scheduling",
    "community management",
    "social media content creation",
    "brand engagement services",
    "social media reporting",
  ],
  "seo-services": [
    "seo services",
    "search engine optimization",
    "technical seo",
    "on page seo",
    "off page seo",
    "local seo services",
  ],
};

function getServiceKeywords(service: Omit<Service, "content" | "keywords">) {
  const fallbackKeywords = [
    service.title.toLowerCase(),
    service.category.toLowerCase(),
    service.slug.replace(/-/g, " "),
  ];

  return Array.from(new Set([...(serviceKeywordMap[service.slug] ?? []), ...fallbackKeywords]));
}

const baseServices: Omit<Service, "content" | "keywords">[] = [
  {
    id: 1,
    slug: "web-development",
    title: "Web Development",
    category: "Development Services",
    group: "development",
    seoTitle: "Professional Web Development Company | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions builds high-performance, responsive, and SEO-friendly websites using Next.js and React for businesses in the USA, Gulf, and Pakistan.",
    shortDesc: "High-performance, responsive, and SEO-friendly websites for global businesses.",
    detailIntro:
      "Primatech Solutions builds high-performance, responsive, and SEO-friendly websites using Next.js and React for businesses in the USA, Gulf, and Pakistan.",
    highlights: [
      "Modern web development with Next.js, React, and scalable architecture.",
      "Responsive UI/UX with performance, SEO, and conversion focus.",
      "Secure backend integrations, CMS support, and ongoing maintenance.",
    ],
    deliverables: [
      "Custom website or web application aligned to brand and goals.",
      "CMS integration, performance optimization, and SEO-ready structure.",
      "Deployment, monitoring, and continuous support.",
    ],
    icon: MonitorPlay,
    isTop: true,
  },
  {
    id: 2,
    slug: "app-development",
    title: "App Development",
    category: "Development Services",
    group: "development",
    seoTitle: "Top Custom Mobile & Web App Development Company | USA, UAE & PK",
    seoDescription:
      "Primatech Solutions offers premium, custom mobile and web app development services for startups and enterprises across the USA, Middle East, Europe, and Pakistan.",
    shortDesc: "Premium custom mobile and web app development services.",
    detailIntro:
      "Primatech Solutions offers premium, custom mobile and web app development services for startups and enterprises across the USA, Middle East, Europe, and Pakistan.",
    highlights: [
      "Custom mobile and web apps built for performance and engagement.",
      "UI/UX-focused design with secure backend and API integrations.",
      "Testing, deployment, and ongoing maintenance support.",
    ],
    deliverables: [
      "Custom mobile or web application aligned with business goals.",
      "Secure integrations, analytics, and quality assurance testing.",
      "Deployment, monitoring, and continuous improvements.",
    ],
    icon: Smartphone,
    isTop: true,
  },
  {
    id: 3,
    slug: "google-ads",
    title: "Google Ads",
    category: "Digital Marketing Services",
    group: "digital",
    seoTitle: "Expert Google Ads Agency | PPC Management USA, UAE & PK",
    seoDescription:
      "Primatech Solutions provides ROI-driven Google Ads management, PPC campaigns, and targeted search advertising for businesses in the USA, UAE, and Pakistan.",
    shortDesc: "ROI-driven Google Ads management and PPC campaigns for high-intent leads.",
    detailIntro:
      "Primatech Solutions provides ROI-driven Google Ads management, PPC campaigns, and targeted search advertising for businesses in the USA, UAE, and Pakistan.",
    highlights: [
      "High-intent PPC campaigns across Search, Display, YouTube, and Shopping.",
      "Keyword targeting, bid strategy, and conversion-focused ad copy.",
      "Continuous testing, tracking, and optimization for maximum ROI.",
    ],
    deliverables: [
      "PPC strategy with keyword, audience, and targeting plan.",
      "Campaign setup with conversion tracking and analytics integration.",
      "Monthly reporting with optimization and scaling recommendations.",
    ],
    icon: Target,
    isTop: true,
  },
  {
    id: 4,
    slug: "website-designing",
    title: "Website Designing",
    category: "Development Services",
    group: "development",
    seoTitle: "Professional UI/UX & Website Designing Services | USA, UAE & PK",
    seoDescription:
      "Primatech Solutions offers premium UI/UX design and responsive website designing services for startups and enterprises in the USA, UAE, Europe, and Pakistan.",
    shortDesc: "Premium UI/UX and responsive website designing services.",
    detailIntro:
      "Primatech Solutions offers premium UI/UX design and responsive website designing services for startups and enterprises in the USA, UAE, Europe, and Pakistan.",
    highlights: [
      "Custom UI/UX design with brand-aligned visuals and layouts.",
      "Responsive, mobile-first design for every device.",
      "SEO-ready structure with conversion-focused sections.",
    ],
    deliverables: [
      "Custom website design with UI/UX prototypes and layouts.",
      "Responsive pages, landing screens, and conversion-focused flows.",
      "Design system and handoff support for development.",
    ],
    icon: LayoutGrid,
    isTop: false,
  },
  {
    id: 5,
    slug: "ecommerce-development",
    title: "eCommerce Development",
    category: "Development Services",
    group: "development",
    seoTitle: "Top eCommerce Development Company | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions builds scalable, secure, and high-converting eCommerce platforms for businesses in the USA, UAE, and Pakistan using Shopify, WooCommerce, and custom solutions.",
    shortDesc: "Scalable, secure, and high-converting eCommerce platforms for global brands.",
    detailIntro:
      "Primatech Solutions builds scalable, secure, and high-converting eCommerce platforms for businesses in the USA, UAE, and Pakistan using Shopify, WooCommerce, and custom solutions.",
    highlights: [
      "Custom eCommerce platforms with Shopify, WooCommerce, Magento, or custom builds.",
      "Secure payment gateways, optimized checkout, and conversion-focused UX.",
      "Inventory, analytics, and performance optimization for scale.",
    ],
    deliverables: [
      "Custom eCommerce storefront aligned to brand and growth goals.",
      "Payment, shipping, and inventory integrations with secure setup.",
      "SEO-ready performance optimization and ongoing support.",
    ],
    icon: ShoppingCart,
    isTop: false,
  },
  {
    id: 6,
    slug: "software-development",
    title: "Software Development",
    category: "Development Services",
    group: "development",
    seoTitle: "Top Custom Software Development Company | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions provides premium, scalable, and cost-effective custom software development services for startups and enterprises across the USA, Middle East, Europe, and Pakistan.",
    shortDesc: "Premium, scalable, and cost-effective custom software development services.",
    detailIntro:
      "Primatech Solutions provides premium, scalable, and cost-effective custom software development services for startups and enterprises across the USA, Middle East, Europe, and Pakistan.",
    highlights: [
      "Requirement analysis and architecture aligned to business goals.",
      "Custom web, mobile, enterprise, and cloud solutions.",
      "Security, QA, and long-term maintenance support.",
    ],
    deliverables: [
      "Custom software solution aligned to operational requirements.",
      "Integration with existing systems or cloud migration.",
      "Testing, deployment, and ongoing support.",
    ],
    icon: Code2,
    isTop: false,
  },
  {
    id: 7,
    slug: "erp-systems",
    title: "ERP Systems",
    category: "Development Services",
    group: "development",
    seoTitle: "Best Cloud ERP for Retail | Custom ERP Development",
    seoDescription:
      "Primatech Solutions provides custom, cloud-based ERP system development to streamline operations, improve visibility, and scale retail and enterprise businesses.",
    shortDesc: "Custom, cloud-based, and highly scalable ERP system development services.",
    detailIntro:
      "Primatech Solutions provides custom, cloud-based, and highly scalable ERP system development services to streamline operations for businesses globally.",
    highlights: [
      "Custom ERP solutions aligned to your processes, compliance, and growth.",
      "Cloud-based, mobile-ready ERP with modular architecture.",
      "Integration, migration, and long-term support for enterprise operations.",
    ],
    deliverables: [
      "Custom ERP platform with finance, HRM, CRM, and operations modules.",
      "Integration with existing systems, data migration, and training.",
      "Deployment, monitoring, and ongoing maintenance support.",
    ],
    icon: Database,
    isTop: false,
  },
  {
    id: 8,
    slug: "pos-systems",
    title: "POS Systems",
    category: "Development Services",
    group: "development",
    seoTitle: "Advanced POS System for Inventory | POS Software Development",
    seoDescription:
      "Primatech Solutions builds advanced POS systems for inventory, billing, and multi-store operations with real-time reporting and ERP integrations.",
    shortDesc: "Advanced POS systems for inventory, billing, and multi-store retail operations.",
    detailIntro:
      "Primatech Solutions builds advanced POS systems for inventory, billing, and multi-store retail operations with real-time reporting and ERP integrations.",
    highlights: [
      "Real-time inventory sync with barcode and SKU automation.",
      "Multi-branch POS with role-based access and centralized reporting.",
      "ERP-ready architecture for accounting, procurement, and CRM.",
    ],
    deliverables: [
      "Custom POS software with billing, returns, and discount workflows.",
      "Inventory dashboards with stock alerts and audit trails.",
      "Integrations with ERP, payment gateways, and hardware.",
    ],
    icon: MonitorPlay,
    isTop: false,
  },
  {
    id: 9,
    slug: "ai-model-training",
    title: "AI Model Training",
    category: "Development Services",
    group: "development",
    seoTitle: "Expert AI Model Training Services | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions provides custom AI model training, machine learning, and NLP services for startups and enterprises in the USA, Middle East, Europe & Pakistan.",
    shortDesc: "Custom AI model training, machine learning, and NLP services for scalable growth.",
    detailIntro:
      "Primatech Solutions provides custom AI model training, machine learning, and NLP services for startups and enterprises in the USA, Middle East, Europe & Pakistan.",
    highlights: [
      "Custom AI model training with ML, NLP, and computer vision expertise.",
      "Data pipelines, hyperparameter tuning, and performance validation.",
      "Deployment, monitoring, and continuous improvement for production AI.",
    ],
    deliverables: [
      "Trained AI models tailored to your data and use case.",
      "Integration into apps, systems, or cloud infrastructure.",
      "Monitoring and retraining plan for sustained accuracy.",
    ],
    icon: BrainCircuit,
    isTop: false,
  },
  {
    id: 10,
    slug: "professional-ui-ux-design",
    title: "Professional UI/UX Design",
    category: "Development Services",
    group: "development",
    seoTitle: "Top UI/UX Design Services | Custom User Experience Agency USA & UAE",
    seoDescription:
      "Primatech Solutions provides premium UI/UX design services to create intuitive, engaging, and visually stunning digital experiences for businesses in the USA, UAE, and Pakistan.",
    shortDesc: "Premium UI/UX design services for intuitive, engaging digital experiences.",
    detailIntro:
      "Primatech Solutions provides premium UI/UX design services to create intuitive, engaging, and visually stunning digital experiences for businesses in the USA, UAE, and Pakistan.",
    highlights: [
      "User research, personas, and journey mapping for clear UX direction.",
      "High-fidelity UI design aligned with brand identity and usability.",
      "Iterative testing and optimization for conversion-focused experiences.",
    ],
    deliverables: [
      "User research, wireframes, and interactive prototypes.",
      "UI design system with responsive screens for web and mobile.",
      "Usability testing insights and developer-ready handoff assets.",
    ],
    icon: Globe,
    isTop: false,
  },
  {
    id: 11,
    slug: "professional-graphic-design",
    title: "Professional Graphic Design",
    category: "Creative Design Services",
    group: "creative",
    seoTitle: "Top Graphic Design & Brand Identity Agency | USA, UAE & PK",
    seoDescription:
      "Primatech Solutions provides professional graphic design, branding, and digital marketing visuals for businesses across the USA, UAE, Europe, and Pakistan.",
    shortDesc: "Professional graphic design, branding, and marketing visuals for global brands.",
    detailIntro:
      "Primatech Solutions provides professional graphic design, branding, and digital marketing visuals for businesses across the USA, UAE, Europe, and Pakistan.",
    highlights: [
      "Brand identity systems with logos, typography, and visual guidelines.",
      "Marketing collateral and digital campaign creatives for engagement.",
      "Packaging, social media, and UI/UX visual assets for consistency.",
    ],
    deliverables: [
      "Brand identity kit with logo, colors, and typography.",
      "Marketing and digital design assets for campaigns.",
      "Editable source files optimized for multiple platforms.",
    ],
    icon: Palette,
    isTop: false,
  },
  {
    id: 12,
    slug: "3d-animation",
    title: "3D Animation",
    category: "Creative Design Services",
    group: "creative",
    seoTitle: "Professional 3D Animation Services | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions provides high-quality 3D animation, product visualization, and architectural walkthroughs for businesses in the USA, Gulf, and Pakistan.",
    shortDesc: "High-quality 3D animation, product visualization, and walkthroughs.",
    detailIntro:
      "Primatech Solutions provides high-quality 3D animation, product visualization, and architectural walkthroughs for businesses in the USA, Gulf, and Pakistan.",
    highlights: [
      "3D modeling, rigging, and animation for product and brand storytelling.",
      "Architectural visualization, walkthroughs, and explainer videos.",
      "Lighting, rendering, and post-production for premium visuals.",
    ],
    deliverables: [
      "3D animation assets for marketing, training, or product demos.",
      "High-resolution renders, walkthroughs, and promotional videos.",
      "Post-production support with revisions and final delivery.",
    ],
    icon: Film,
    isTop: false,
  },
  {
    id: 13,
    slug: "business-consultation",
    title: "Business Consultation",
    category: "Business Consulting",
    group: "consulting",
    seoTitle: "Expert Business Consultation Services | USA, UAE & Pakistan",
    seoDescription:
      "Primatech Solutions provides strategic business consultation, operational optimization, and financial planning for startups and enterprises across the USA, Gulf, and Pakistan.",
    shortDesc: "Strategic business consultation, operational optimization, and financial planning.",
    detailIntro:
      "Primatech Solutions provides strategic business consultation, operational optimization, and financial planning for startups and enterprises across the USA, Gulf, and Pakistan.",
    highlights: [
      "Strategic planning and market positioning for sustainable growth.",
      "Operational efficiency and financial optimization for profitability.",
      "Risk management and digital transformation advisory.",
    ],
    deliverables: [
      "Strategic roadmap with priorities, KPIs, and execution guidance.",
      "Operational optimization plan with cost and workflow improvements.",
      "Implementation support, training, and performance reviews.",
    ],
    icon: Briefcase,
    isTop: false,
  },
  {
    id: 14,
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "Digital Marketing Services",
    group: "digital",
    seoTitle: "Top Social Media Marketing & Ads Agency | USA, UAE & PK",
    seoDescription:
      "Primatech Solutions delivers ROI-driven social media marketing, targeted paid advertising, and high-conversion strategies for businesses in the USA, UAE, and Pakistan.",
    shortDesc: "ROI-driven social media marketing and targeted paid advertising strategies.",
    detailIntro:
      "Primatech Solutions delivers ROI-driven social media marketing, targeted paid advertising, and high-conversion strategies for businesses in the USA, UAE, and Pakistan.",
    highlights: [
      "Targeted social ads, lead generation, and conversion-focused funnels.",
      "Creative content, influencer collaborations, and platform optimization.",
      "Analytics, retargeting, and ROI reporting for campaign scale.",
    ],
    deliverables: [
      "Social media strategy with platform-specific ad plans and KPIs.",
      "Creative assets, ad copy, and campaign management setup.",
      "Performance reporting with optimization and scaling recommendations.",
    ],
    icon: Megaphone,
    isTop: false,
  },
  {
    id: 15,
    slug: "social-media-management",
    title: "Social Media Management",
    category: "Digital Marketing Services",
    group: "digital",
    seoTitle: "Expert Social Media Management Agency | USA, UAE & PK",
    seoDescription:
      "Primatech Solutions offers professional social media management, content creation, and ROI-driven marketing strategies for businesses in the USA, UAE, and Pakistan.",
    shortDesc: "Professional social media management, content creation, and ROI-driven marketing strategies.",
    detailIntro:
      "Primatech Solutions offers professional social media management, content creation, and ROI-driven marketing strategies for businesses in the USA, UAE, and Pakistan.",
    highlights: [
      "Social media strategy, content planning, and platform-specific optimization.",
      "Community management, audience engagement, and brand reputation support.",
      "Analytics, paid ads, and ROI-focused performance reporting.",
    ],
    deliverables: [
      "Social media strategy and monthly content calendar with platform-specific assets.",
      "Content creation, scheduling, and community management workflows.",
      "Performance reports with insights and optimization recommendations.",
    ],
    icon: MessageSquare,
    isTop: false,
  },
  {
    id: 16,
    slug: "seo-services",
    title: "SEO",
    category: "Digital Marketing Services",
    group: "digital",
    seoTitle: "Top SEO Agency | Search Engine Optimization USA, UAE & PK",
    seoDescription:
      "Primatech Solutions provides data-driven SEO services, including on-page, off-page, and technical SEO, to drive massive organic traffic for businesses globally.",
    shortDesc: "Data-driven SEO to grow organic traffic and first-page rankings.",
    detailIntro:
      "Primatech Solutions provides data-driven SEO services, including on-page, off-page, and technical SEO, to drive massive organic traffic for businesses globally.",
    highlights: [
      "Keyword strategy, on-page optimization, and content alignment.",
      "Technical SEO for speed, crawlability, indexation, and UX.",
      "Authority building, local SEO, and performance reporting.",
    ],
    deliverables: [
      "SEO audit with prioritized fixes and growth roadmap.",
      "On-page, technical, and off-page optimization plan.",
      "Monthly reporting on rankings, traffic, and ROI.",
    ],
    icon: Search,
    isTop: false,
  },
];

export const services: Service[] = baseServices.map((service) => ({
  ...service,
  keywords: getServiceKeywords(service),
  content: serviceContentMap[service.slug] ?? [],
}));

const categoryOrder = [
  "Development Services",
  "Digital Marketing Services",
  "Creative Design Services",
  "Business Consulting",
];

export const serviceCategories = categoryOrder.filter((category) =>
  services.some((service) => service.category === category),
);

export const developmentServices = services.filter((service) => service.group === "development");
export const digitalServices = services.filter((service) => service.group === "digital");

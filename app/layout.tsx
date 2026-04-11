import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "PrimeTech Solutions",
    template: "%s | PrimeTech Solutions",
  },
  description:
    "PrimeTech Solutions delivers web and app development, ERP systems, eCommerce, AI model training, UI/UX, graphic design, 3D animation, business consultation, SEO, Google Ads, and social media services.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=11", type: "image/x-icon" },
      { url: "/favicon.png?v=11", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico?v=11",
    apple: "/apple-touch-icon.png?v=11",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-darkBg text-white antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4233324753574194&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <GoogleAnalytics />
        <WebVitalsTracker />
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import AppChrome from "@/components/AppChrome";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import { getSiteUrl } from "@/lib/site";
import { getMetaPixelId } from "@/lib/tracking";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "PrimeTech Solutions",
    template: "%s | PrimeTech Solutions",
  },
  description:
    "PrimeTech Solutions delivers web and app development, ERP systems, eCommerce, AI model training, UI/UX, graphic design, 3D animation, business consultation, SEO, Google Ads, and social media services.",
};

const metaPixelId = getMetaPixelId();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-darkBg text-white antialiased">
        <MetaPixel />
        {metaPixelId ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
        <GoogleAnalytics />
        <WebVitalsTracker />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

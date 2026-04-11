export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "https://primatechsolutions.co";

  return siteUrl.replace(/\/+$/, "");
}

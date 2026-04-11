import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { contactDetails } from "@/lib/contact";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-3.293-1.207 5.127 5.127 0 0 1-1.51-3.355h-3.46v12.91a2.953 2.953 0 1 1-2.953-2.953c.28 0 .55.04.806.113V8.01a6.42 6.42 0 0 0-.806-.05A6.453 6.453 0 1 0 14.558 14V7.76a8.595 8.595 0 0 0 4.763 1.436V5.562z" />
  </svg>
);

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61577473783234&sk=reels_tab&_rdc=10&_rdr#",
    icon: Facebook,
  },
  { label: "Instagram", href: "https://www.instagram.com/prima_techsolution?igsh=OXg1eTVkb3d3NHJ5", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prima-tech-solutions-b09a333b5", icon: Linkedin },
  { label: "X", href: "https://x.com/Prima_Tech10", icon: Twitter },
  { label: "TikTok", href: "https://tiktok.com/@prima_techsolution", icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@PrimaTechSolutions10", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-cyanPrimary/20 bg-[linear-gradient(135deg,#163f68_0%,#123a63_100%)] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(10,37,64,0.68),rgba(18,58,99,0.56))] shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-y-0 md:divide-x">
            <div className="p-6 sm:p-7">
              <h2 className="text-lg font-bold tracking-[0.08em] sm:text-xl sm:tracking-[0.14em]">
                PRIMATECH <span className="text-cyanPrimary">SOLUTIONS</span>
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-7 text-gray-300">
                Development, digital marketing, creative design, and consultation services for growth-focused
                businesses.
              </p>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyanPrimary/85">Social Media</p>
                <div className="mt-3 grid grid-cols-3 justify-items-center gap-3 sm:grid-cols-6 sm:justify-items-start">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyanPrimary/25 bg-cyanPrimary/10 text-cyanPrimary transition hover:border-cyanPrimary hover:bg-cyanPrimary/18 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Company</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-200">
                <Link href="/about" className="transition hover:text-white">
                  About Us
                </Link>
                <Link href="/services" className="transition hover:text-white">
                  Services
                </Link>
                <Link href="/blogs" className="transition hover:text-white">
                  Blogs
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Legal Center</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-200">
                <Link href="/legal/terms-conditions" className="transition hover:text-white">
                  Terms & Conditions
                </Link>
                <Link href="/legal/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyanPrimary">Contact</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-200">
                <a href={contactDetails.emailHref} className="transition hover:text-white">
                  {contactDetails.email}
                </a>
                <a href={contactDetails.ptclHref} className="transition hover:text-white">
                  PTCL: {contactDetails.ptclDisplay}
                </a>
                <a href={contactDetails.phoneHref} className="transition hover:text-white">
                  Phone: {contactDetails.phoneDisplay}
                </a>
                <p className="leading-7 text-gray-300">Office: {contactDetails.officeAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-white/10 px-1 pt-5 text-center text-sm text-gray-400 sm:flex-row sm:text-left">
          <p>Copyright {new Date().getFullYear()} PrimeTech Solutions. All rights reserved.</p>
          <p>Social links can be updated anytime.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  developmentNavLinks,
  digitalNavLinks,
  legalNavLinks,
  secondaryNavLinks,
} from "@/constants/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLegalOpen, setIsMobileLegalOpen] = useState(false);
  const [isMobileDevelopmentOpen, setIsMobileDevelopmentOpen] = useState(false);
  const [isMobileDigitalOpen, setIsMobileDigitalOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileLegalOpen(false);
    setIsMobileDevelopmentOpen(false);
    setIsMobileDigitalOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b border-cyanPrimary/25 bg-[#123a63]/85 px-4 py-0.5 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.25)] sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="shrink-0">
          <span className="sr-only">Primatech Solutions</span>
          <Image
            src="/company%20logo%20(2).webp"
            alt="Primatech Solutions"
            width={460}
            height={128}
            priority
            className="h-16 w-auto origin-top-left scale-[2.35] -translate-y-8 object-contain"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-4 text-[13px] font-medium lg:flex xl:gap-6 xl:text-sm">
          <Link href="/" className="whitespace-nowrap transition-colors hover:text-cyanPrimary">
            Home
          </Link>
          <Link href="/services" className="whitespace-nowrap transition-colors hover:text-cyanPrimary">
            Services
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-cyanPrimary">
              Development
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-8 w-72 rounded-xl border border-white/10 bg-cardBg/95 p-2 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {developmentNavLinks.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-cyanPrimary">
              Digital Services
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-8 w-72 rounded-xl border border-white/10 bg-cardBg/95 p-2 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {digitalNavLinks.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {secondaryNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-cyanPrimary">
              {link.label}
            </Link>
          ))}

          <div className="group relative">
            <button className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-cyanPrimary">
              Legal Center
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute right-0 top-8 w-56 rounded-xl border border-white/10 bg-cardBg/95 p-2 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {legalNavLinks.map((legalLink) => (
                <Link
                  key={legalLink.href}
                  href={legalLink.href}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {legalLink.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-cyanPrimary"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-12 w-[min(19rem,calc(100vw-1.5rem))] rounded-xl border border-white/10 bg-cardBg p-4 shadow-2xl">
                <div className="flex flex-col gap-3 text-sm">
                  <Link href="/" onClick={closeMobileMenu} className="rounded-md px-2 py-1 hover:bg-white/5 hover:text-cyanPrimary">
                    Home
                  </Link>
                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="rounded-md px-2 py-1 hover:bg-white/5 hover:text-cyanPrimary"
                  >
                    Services
                  </Link>

                  <div className="rounded-md border border-white/10 p-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileDevelopmentOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-sm font-semibold text-cyanPrimary"
                    >
                      Development
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isMobileDevelopmentOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isMobileDevelopmentOpen && (
                      <div className="mt-2 flex max-h-52 flex-col gap-2 overflow-y-auto">
                        {developmentNavLinks.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={closeMobileMenu}
                            className="rounded-md px-2 py-1 text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-md border border-white/10 p-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileDigitalOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-sm font-semibold text-cyanPrimary"
                    >
                      Digital Services
                      <ChevronDown className={`h-4 w-4 transition-transform ${isMobileDigitalOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isMobileDigitalOpen && (
                      <div className="mt-2 flex flex-col gap-2">
                        {digitalNavLinks.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={closeMobileMenu}
                            className="rounded-md px-2 py-1 text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {secondaryNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="rounded-md px-2 py-1 hover:bg-white/5 hover:text-cyanPrimary"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="rounded-md border border-white/10 p-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileLegalOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-sm font-semibold text-cyanPrimary"
                    >
                      Legal Center
                      <ChevronDown className={`h-4 w-4 transition-transform ${isMobileLegalOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isMobileLegalOpen && (
                      <div className="mt-2 flex flex-col gap-2">
                        {legalNavLinks.map((legalLink) => (
                          <Link
                            key={legalLink.href}
                            href={legalLink.href}
                            onClick={closeMobileMenu}
                            className="rounded-md px-2 py-1 text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            {legalLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-full bg-gradient-cyan px-5 py-2 text-sm font-semibold text-white transition-colors lg:inline-flex xl:px-6"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

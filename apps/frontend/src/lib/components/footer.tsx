"use client";

import Link from "next/link";
import { Facebook, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark py-12 text-white">
      <div className="container-center flex flex-col items-center">
        {/* 1. PROMINENT SOCIAL LINKS */}
        <div className="flex gap-4 mb-8">
          <SocialCircle
            href="https://www.facebook.com/everythingke"
            icon={Facebook}
            label="Facebook"
          />
          <SocialCircle
            href="mailto:support@everything.co.ke"
            icon={Mail}
            label="Email"
          />
        </div>

        {/* 2. SIMPLIFIED NAV */}
        <nav className="flex flex-wrap justify-between gap-4 gap-y-2 mb-10">
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
        </nav>

        {/* 3. LEGAL DISCLAIMER (Subtle) */}
        <p className="max-w-2xl text-center text-[10px] uppercase  text-slate-500 mb-6 px-4">
          EverythingKe is an independent service provider • Not affiliated with
          the Government of Kenya
        </p>

        {/* 4. COPYRIGHT BAR */}
        <div className="w-full pt-8 text-center">
          <p className="text-xs font-medium tracking-tight text-slate-400">
            Copyright © {currentYear}; Designed by{" "}
            <span className="text-accent  tracking-widest ml-1">
              EverythingKe
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* --- Styled Social Circles --- */
function SocialCircle({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-300 hover:bg-accent"
      aria-label={label}
    >
      <Icon
        size={20}
        className="text-brand-dark transition-colors duration-300 group-hover:text-white"
      />
    </Link>
  );
}

/* --- Minimal Nav Links --- */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

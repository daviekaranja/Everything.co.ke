"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLink } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Added bg-card-bg to ensure it's not transparent */
    <header className="sticky top-0 left-0 right-0 z-50 w-full h-20 md:h-24 bg-brand-bg shadow-sm">
      <div className="container-center h-full flex items-center justify-between gap-8">
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <Image
            src="/logo.svg"
            alt="EverythingKe"
            width={40}
            height={40}
            priority
          />
          <span className="hidden md:block text-xl font-black tracking-tighter text-text-main">
            Everything<span className="text-accent">Ke</span>
          </span>
        </Link>

        {/* 2. CENTER NAV - Using flex-grow and auto margins for balance */}
        <nav className="hidden md:flex flex-1 justify-center max-w-2xl">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* The Menu Button: Hidden by default on desktop (md and up) */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex md:hidden p-2 text-text-main hover:bg-accent-soft rounded-xl transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} items={navItems} />
    </header>
  );
}

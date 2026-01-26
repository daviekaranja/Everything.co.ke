"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  // Body scroll lock with cleanup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup ensures scroll is restored if the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-card-bg/80 backdrop-blur-md border-b border-card-border transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Brand Section */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 transition-transform hover:scale-105"
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Everything Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="hidden sm:block text-2xl font-black tracking-tighter text-brand-dark dark:text-white">
                Everything<span className="text-accent">.co.ke</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-bold transition-all hover:text-accent relative group ${
                    pathname === item.href ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full ${
                      pathname === item.href ? "w-full" : ""
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions Section */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl border border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:text-white transition-all duration-300 group"
                aria-label="Toggle Theme"
              >
                {/* Prevent icon flicker during hydration */}
                {isDark ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              {/* Desktop Direct Action */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="hidden md:flex items-center gap-3 bg-brand-dark dark:bg-white text-white dark:text-brand-dark px-6 py-3 rounded-2xl text-sm font-black hover:scale-105 transition-all shadow-xl shadow-accent/10"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Live Support
              </a>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-2">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  className="p-2.5 bg-accent text-white rounded-xl shadow-lg shadow-accent/20 active:scale-95 transition-transform"
                  aria-label="Contact Support"
                >
                  <SupportIcon className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-text-main flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 6h16M4 12h12m-12 6h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[310px] bg-card-bg shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 pb-6 flex items-center justify-between border-b border-card-border/50">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              <span className="text-xl font-black text-brand-dark dark:text-white">
                Everything<span className="text-accent">.</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-accent bg-accent/5 rounded-xl"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <nav className="flex flex-col gap-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Navigation
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold transition-colors ${
                    pathname === item.href ? "text-accent" : "text-text-main"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Information
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black text-text-main">
                    Mon - Fri: 8am - 6pm
                  </p>
                  <p className="text-[11px] font-bold text-text-muted">
                    Fast Processing
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-card-border/50">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="flex items-center justify-center w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg"
            >
              Chat with Agent
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

// Icons
function SupportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 12.728l-3.536-3.536M12 3v3m0 12v3m9-9h-3M6 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14a2 2 0 100-4 2 2 0 000 4z"
      />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

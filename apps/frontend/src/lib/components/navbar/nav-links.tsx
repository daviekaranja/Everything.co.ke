"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="relative text-test-main font-bold tracking-widest transition-colors duration-300 rounded-xl group"
    >
      {isActive && (
        <motion.div
          layoutId="active-nav-pill"
          className="absolute inset-0 bg-white dark:bg-slate-700 shadow-md shadow-black/5 rounded-xl border border-card-border"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive
            ? "text-accent"
            : "text-text-muted group-hover:text-text-main"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

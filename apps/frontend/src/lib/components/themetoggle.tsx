"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ThemeToggleMinimal
 * A high-performance, single-icon morphing toggle.
 * Uses Framer Motion's AnimatePresence for seamless icon transitions.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 bg-card-border/20 animate-pulse rounded-xl" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl",
        "bg-card-bg border border-card-border shadow-sm",
        "transition-all duration-300 hover:border-accent hover:bg-accent-soft/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
      )}
      aria-label={`Current theme: ${resolvedTheme}. Click to switch.`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-text-main"
        >
          {isDark ? (
            <Moon size={20} className="text-accent" strokeWidth={2.5} />
          ) : (
            <Sun size={20} className="text-accent" strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>

      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}

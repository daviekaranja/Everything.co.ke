"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import Image from "next/image";

export function MobileMenu({ isOpen, setIsOpen, items }: any) {
  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60]"
          />

          {/* DRAWER PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-77.5 bg-card-bg border-l border-card-border shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-card-border flex justify-between items-center">
              {/* <span className="font-black text-xl tracking-tighter">
                Everything<span className="text-accent">Ke</span>
              </span> */}
              <Image
                src="/logo.svg"
                alt="EverythingKe Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
              {items.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-accent-soft group transition-all"
                >
                  <span className="font-bold text-lg text-text-main group-hover:text-accent">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-text-header group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

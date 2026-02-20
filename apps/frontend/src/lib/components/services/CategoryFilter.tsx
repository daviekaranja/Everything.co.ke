"use client";

import { motion } from "framer-motion";
import ServiceCard from "./popularcard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Search, Sparkles } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ServiceGridProps {
  initialServices: any[];
}

/**
 * ServiceGrid Component
 * Focused on high-density discovery and visual stability.
 * Implements a staggered entrance animation for premium UX.
 */
export default function ServiceGrid({ initialServices }: ServiceGridProps) {
  if (!initialServices || initialServices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-accent-soft rounded-full flex items-center justify-center mb-4">
          <Search className="text-accent" size={24} />
        </div>
        <h3 className="text-xl font-bold text-text-main">No services found</h3>
        <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
          The official hub for fast-tracking government and professional
          services. Select a service below to begin your application.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 ">
      {/* 1. Header Section with Visual Logic */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 bg-brand-bg p-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-text text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            <span className="">Featured Offerings</span>
          </div>
          <h2 className="text-h2 text-text-main">Available Services</h2>
          <p className="text-text-muted max-w-xl">
            Browse through our verified government and professional service
            fast-tracking options. Secure, efficient, and direct.
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-brand-bg p-6">
          Showing{" "}
          <span className="text-accent font-bold">
            {initialServices.length}
          </span>{" "}
          Services
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05, // Visual rhythm: cards appear one after another
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
        >
          {initialServices.map((service: any) => (
            <motion.div
              key={service.id || service.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

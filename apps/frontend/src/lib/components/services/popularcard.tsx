"use client";

import { ServiceRead } from "@/lib/types/api";
import { LinkButton } from "../ui/LinkButton";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

interface ServiceCardProps {
  service: ServiceRead;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const { featured, icon, name, estimatedTime, description, pricing, slug } =
    service;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card-bg border border-card-border shadow-sm",
        "transition-all duration-500 ease-out hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1.5 hover:border-accent/20",
        "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
        className,
      )}
    >
      {/* 1. Badges Layer */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        {featured && (
          <div className="flex items-center gap-1.5 rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-green-600 border border-green-500/20 shadow-sm backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
            </span>
            Popular
          </div>
        )}
        {/* <span className="rounded-md bg-accent-soft mb-4 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-text border border-accent/10 shadow-sm">
          {provider}
        </span> */}
      </div>

      {/* 2. Hero Section: Icon + Title */}
      <div className="flex items-start gap-4 p-6 pb-4">
        {icon && (
          <div
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand-bg text-3xl",
              "border border-card-border shadow-inner transition-all duration-700",
              "group-hover:scale-110 group-hover:rotate-3 group-hover:border-accent/20 group-hover:shadow-accent/5",
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <div className="flex-1 pr-16 lg:pr-20">
          {" "}
          {/* Padding to avoid overlap with badges */}
          <h3 className="line-clamp-2 text-lg font-extrabold leading-tight tracking-tight text-text-main transition-colors group-hover:text-accent">
            {name}
          </h3>
          <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-text-header">
            Est. Delivery •{" "}
            <span className="text-text-main">{estimatedTime}</span>
          </p>
        </div>
      </div>

      {/* 3. Description */}
      <p className="line-clamp-3 px-6 text-sm leading-relaxed text-text-muted font-medium transition-colors group-hover:text-text-main/80">
        {description}
      </p>

      {/* 4. Price Block – Nested on the "Floor" color for depth */}
      <div className="mt-6 px-6 pb-6">
        <div className="rounded-xl bg-brand-bg/50 p-4 border border-card-border/50 transition-colors group-hover:bg-brand-bg group-hover:border-card-border">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Service Fee
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-text-header">KES</span>
              <span className="text-3xl font-black tracking-tighter text-text-main tabular-nums leading-none">
                {Number(pricing.serviceFee).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mt-3 h-px bg-card-border/60" />
          <p className="mt-2 text-[10px] font-medium text-text-header leading-tight">
            * Government charges may apply separately.
          </p>
        </div>
      </div>

      {/* 5. CTA Section */}
      <div className="mt-auto border-t border-card-border/40 bg-brand-bg/30 px-6 py-5">
        <LinkButton
          href={`/services/${slug}`}
          variant="main"
          className="w-full justify-between gap-2 font-bold text-sm shadow-sm transition-all group-hover:shadow-lg group-hover:shadow-accent/20 active:scale-[0.98]"
        >
          <div className="flex justify-between items-center">
            Apply Now
            <span className="font-bold">
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </LinkButton>
      </div>

      {/* Subtle Hover Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </article>
  );
}

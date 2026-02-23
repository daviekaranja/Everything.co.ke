"use client";
import { LinkButton } from "./ui/LinkButton";
import { SuggestionsResponse } from "../types/api";

import { ExternalLink, ArrowRight } from "lucide-react";

export function PopularCard({ n, s, c, d }: SuggestionsResponse) {
  return (
    <article
      className={`smooth-card
        group relative flex flex-col h-full w-full p-6 rounded-2xl border transition-all duration-300
      `}
    >
      {/* Category Badge & Icon */}
      <div className="flex justify-between items-start mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-bg text-text-muted group-hover:bg-accent group-hover:text-white transition-colors">
          {c}
        </span>
        {/* <div
          className="text-accent group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          {icon}
        </div> */}
      </div>

      {/* Content Section */}
      <div className="grow">
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-2 leading-tight group-hover:text-accent transition-colors">
          {n}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2">{d}</p>
      </div>

      {/* Footer / Conversion Area */}
      <div className="mt-8 pt-5 border-t border-card-border flex justify-between items-center gap-4">
        {/* <ActionPill href={`/services/${slug}`} label="Learn More" /> */}
      </div>

      <LinkButton href={`/services/${s}`} variant="main" icon={ArrowRight}>
        Get Started
      </LinkButton>
    </article>
  );
}

export function ActionPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-card-border rounded-full text-sm font-semibold hover:border-accent hover:text-accent transition-all shadow-sm"
    >
      {label} <ExternalLink size={14} />
    </a>
  );
}

/**
 * 3. THE "GOVERNMENT" FORM INPUT
 * Massive focus on legibility for high-stakes applications.
 */
export function HubInput({ label, placeholder, icon: Icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-text-header ml-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-header group-focus-within:text-accent transition-colors">
            <Icon size={20} />
          </div>
        )}
        <input
          className={`search-input ${Icon ? "pl-12" : "pl-4"} rounded-xl! border-2`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

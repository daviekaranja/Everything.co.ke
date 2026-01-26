"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/services";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  // Filtering Engine
  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return services
      .filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.provider.toLowerCase().includes(query.toLowerCase()) ||
          s.subCategory.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 for clean mobile UI
  }, [query]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto z-50">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl group-focus-within:text-accent transition-colors">
          🔍
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search e.g 'KRA', 'Passport', 'Driving Licence'..."
          className="w-full bg-card-bg border-2 border-card-border focus:border-accent p-5 pl-14 rounded-3xl text-lg font-bold text-text-main shadow-2xl transition-all outline-hidden"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 w-full mt-3 bg-white dark:bg-slate-900 border border-card-border rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredResults.length > 0 ? (
            <div className="p-3">
              <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                Suggested Services
              </p>
              {filteredResults.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    router.push(`/services/${s.slug}`);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-accent/5 rounded-2xl group transition-all"
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                      {s.icon}
                    </span>
                    <div>
                      <h4 className="font-black text-text-main group-hover:text-accent transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-tighter">
                        {s.provider} • {s.subCategory}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-text-main">
                      {s.pricing.total}
                    </p>
                    <p className="text-[10px] text-accent font-bold">
                      View Details →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="text-text-muted font-bold mb-4">
                No services found for &quot;{query}&quot;
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="text-accent font-black underline"
              >
                Ask an Agent on WhatsApp
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

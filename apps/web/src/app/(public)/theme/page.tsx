"use client";

import React, { useState } from "react";
import BrandedLoader from "@/lib/components/brandedloader";

export default function ThemeTestPage() {
  const [isDark, setIsDark] = useState(false);

  // Toggle helper to test dark mode manually
  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-brand-bg p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 1. THEME CONTROL */}
        <section className="flex justify-between items-center p-6 bg-card-bg border border-card-border rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-text-main">
              Theme Tester v4
            </h1>
            <p className="text-text-muted">
              Testing variables and @utility classes
            </p>
          </div>
          <button
            onClick={toggleDark}
            className="bg-brand-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-accent transition-colors"
          >
            Switch to {isDark ? "Light" : "Dark"} Mode
          </button>
        </section>

        {/* 2. SEARCH UTILITY TEST */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent">
            Search Utility
          </h2>
          <div className="relative">
            <input
              type="text"
              className="search-input"
              placeholder="Testing the .search-input utility..."
            />
          </div>
        </section>

        {/* 3. CARD & BADGE UTILITY TEST */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent">
            Card & Badge Utilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="service-card">
              <div className="flex justify-between items-start mb-4">
                <span className="badge-provider">KRA</span>
                <span className="text-accent font-bold text-sm">KES 500</span>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">
                Income <mark className="highlight-mark">Tax</mark> Returns
              </h3>
              <p className="text-text-muted text-sm flex-grow">
                Testing the .service-card and .highlight-mark utilities inside
                the theme.
              </p>
              <div className="mt-6 pt-4 border-t border-card-border">
                <button className="w-full bg-brand-dark text-white py-2 rounded-lg font-bold hover:bg-accent-hover transition-colors">
                  Test Button
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="flex justify-between items-start mb-4">
                <span className="badge-provider">NTSA</span>
                <span className="text-accent font-bold text-sm">Free</span>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">
                Driving License
              </h3>
              <p className="text-text-muted text-sm flex-grow">
                This card tests how the borders and backgrounds react to dark
                mode.
              </p>
              <div className="mt-6 pt-4 border-t border-card-border">
                <button className="w-full bg-brand-dark text-white py-2 rounded-lg font-bold hover:bg-accent-hover transition-colors">
                  Test Button
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COLOR PALETTE SWATCHES */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent">
            Variable Check
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-brand-dark text-white text-xs font-mono">
              --brand-dark
            </div>
            <div className="p-4 rounded-lg bg-accent text-white text-xs font-mono">
              --accent
            </div>
            <div className="p-4 rounded-lg bg-card-bg border border-card-border text-text-main text-xs font-mono">
              --card-bg
            </div>
            <div className="p-4 rounded-lg bg-accent-soft text-accent-text text-xs font-mono">
              --accent-soft
            </div>
          </div>
        </section>
      </div>

      {/* ================= BRANDED LOADER TEST ================= */}
      <div className="mt-20 max-w-md mx-auto space-y-6">
        <h2 className="text-center text-sm font-bold uppercase tracking-widest text-accent">
          Branded Loader Test
        </h2>
        <BrandedLoader />
      </div>
    </div>
  );
}

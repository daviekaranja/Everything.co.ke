"use client";

import { ThemeToggle } from "@/lib/components/themetoggle";
import {
  ServiceCard,
  ActionPill,
  HubInput,
} from "@/lib/components/ui-elements";
import {
  ShieldCheck,
  FileText,
  CreditCard,
  Search,
  User,
  ArrowUpRight,
} from "lucide-react";

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-brand-bg transition-colors duration-500 pb-20">
      {/* 1. THE BIG BOLD NAVIGATION */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-card-border bg-brand-bg/90">
        <div className="container-center h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
              E
            </div>
            <span className="font-bold text-2xl tracking-tighter text-text-main">
              everything<span className="text-accent">.co.ke</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-text-muted">
              <a href="#" className="hover:text-accent transition-colors">
                Services
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Track Application
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Support
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-center py-16 space-y-24">
        {/* 2. HERO / TYPOGRAPHY GUIDE */}
        <section className="max-w-4xl">
          <div className="badge-provider mb-6">System v4 / Typography</div>
          <h1 className="text-h1 leading-[1.05]">
            Simplifying Kenyan{" "}
            <span className="text-accent">Public Services</span> for the Digital
            Age.
          </h1>
          <p className="text-xl text-text-muted mt-6 leading-relaxed">
            From KRA tax compliance to NTSA vehicle transfers, we’ve built the
            inter-connected hub for{" "}
            <span className="highlight-mark text-black">2026 and beyond</span>.
          </p>
          <div className="flex gap-4 mt-8">
            <ActionPill href="#" label="View API Documentation" />
            <ActionPill href="#" label="Agent Portal" />
          </div>
        </section>

        {/* 3. THE "SERVICE GRID" (CARDS) */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="badge-provider mb-3">Service Catalog</div>
              <h2 className="text-h2">Popular Applications</h2>
            </div>
            <button className="group flex items-center gap-2 font-bold text-text-main hover:text-accent transition-colors">
              Explore 120+ Services{" "}
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="KRA Pin Registration"
              tag="Official assistance"
              price="Ksh 500.00"
              icon={ShieldCheck}
              description="New KRA PIN applications for individuals and businesses with guaranteed 12-hour delivery."
            />
            <ServiceCard
              title="NTSA DL Renewal"
              tag="Automated"
              price="Ksh 1,200.00"
              icon={CreditCard}
              description="Renew your 3-year or 1-year driving license instantly. Physical card delivery available."
            />
            <ServiceCard
              title="Marriage Certificate"
              tag="Legal Services"
              price="Ksh 3,500.00"
              icon={FileText}
              description="Full processing of marriage documentation and scheduling of registrar appointments."
            />
          </div>
        </section>

        {/* 4. DATA ENTRY / FORM GUIDE */}
        <section className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="badge-provider">Form System / UI</div>
            <h2 className="text-h2">The Application Hub</h2>
            <p className="text-text-muted">
              Our forms use high-contrast inputs and{" "}
              <strong>tabular numbers</strong> to ensure Ksh values and ID
              numbers are perfectly legible in any theme.
            </p>
            <div className="p-8 bg-card-bg border border-card-border rounded-[2rem] shadow-sm space-y-6">
              <HubInput
                label="Full Name (As per ID)"
                placeholder="Enter legal name"
                icon={User}
              />
              <HubInput
                label="Search Service"
                placeholder="Search e.g. 'Logbook'"
                icon={Search}
              />
              <button className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
                Start New Application
              </button>
            </div>
          </div>

          {/* COLOR PALETTE REFERENCE */}
          <div className="bg-brand-dark p-10 rounded-[2.5rem] text-white">
            <h3 className="text-h3 text-white mb-6">Theme Tokens</h3>
            <div className="space-y-4">
              {[
                { label: "Accent", var: "bg-accent", hex: "#F97316" },
                { label: "Dark Surface", var: "bg-brand-dark", hex: "#0F172A" },
                {
                  label: "Card Border",
                  var: "bg-card-border border border-white/10",
                  hex: "Variable",
                },
              ].map((color) => (
                <div
                  key={color.label}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${color.var}`} />
                    <span className="font-bold">{color.label}</span>
                  </div>
                  <code className="text-xs opacity-50">{color.hex}</code>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-card-border text-center">
        <p className="text-text-muted text-sm tracking-widest font-bold uppercase">
          everything.co.ke • Nairobi, Kenya • 2026
        </p>
      </footer>
    </div>
  );
}

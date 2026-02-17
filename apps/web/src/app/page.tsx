"use client";

import { HeroSection } from "@/lib/components/homepage/herosection";
import { Shield, Zap, ArrowRight, Smartphone } from "lucide-react";
import { FAQSection } from "@/lib/components/homepage-ui";
import PopularServices from "@/lib/components/hero/popular-services";

export default function HomePage() {
  return (
    <div className="bg-brand-bg">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. LOGO CLOUD / TRUST STRIP */}
      <section className="py-10 border-b border-card-border bg-white/50 dark:bg-slate-900/20">
        <div className="container-center">
          <p className=" text-text-muted text-center mb-8">
            Facilitating Services For
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <TrustLogo label="eCitizen" />
            <TrustLogo label="KRA" />
            <TrustLogo label="NTSA" />
            <TrustLogo label="HELB" />
            <TrustLogo label="Business Registration" />
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES */}
      <section id="popular-services" className="py-24 container-center">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-black uppercase tracking-widest text-[10px] mb-3 block">
              Quick Access
            </span>
            <h2 className="text-h2 tracking-tighter">
              Most Requested <span className="text-accent">Services</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text-main hover:text-accent transition-colors">
            View All Services <ArrowRight size={18} />
          </button>
        </div>
        <PopularServices />
      </section>

      {/* 4. THE 3-STEP PROCESS (HOW IT WORKS) */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="container-center relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-h2 text-white mb-4 tracking-tighter">
              Getting it done is <span className="text-accent">simple.</span>
            </h2>
            <p className="text-slate-400">
              Skip the queues and the tech-stress in three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProcessStep
              number="01"
              title="Select Service"
              desc="Browse our catalog and choose the specific KRA, NTSA, or eCitizen task."
            />
            <ProcessStep
              number="02"
              title="Upload Details"
              desc="Share required IDs or documents via our secure WhatsApp integration."
            />
            <ProcessStep
              number="03"
              title="Receive Files"
              desc="Get your certificates or processed documents directly to your phone."
            />
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      </section>

      {/* 5. WHY CHOOSE US (TRUST BAR RE-IMAGINED) */}
      <section className="py-24 container-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-h2 tracking-tighter">
              Why thousands of Kenyans <br />{" "}
              <span className="text-accent">trust</span> EverythingKe.
            </h2>
            <div className="space-y-6">
              <TrustFeature
                icon={<Shield className="text-accent" />}
                title="Strict Data Privacy"
                desc="We clear all PII from our systems immediately after service delivery."
              />
              <TrustFeature
                icon={<Zap className="text-accent" />}
                title="Record Speed"
                desc="Most Nil returns and DL renewals are completed in under 60 minutes."
              />
              <TrustFeature
                icon={<Smartphone className="text-accent" />}
                title="Mobile First"
                desc="Optimized for M-Pesa and WhatsApp for a seamless mobile experience."
              />
            </div>
          </div>
          <div className="relative">
            <div className="bg-accent-soft rounded-[3rem] p-12 relative z-10 border border-accent/10">
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                Our Daily Impact
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <Stat value="500+" label="Daily Filings" />
                <Stat value="15m" label="Avg Response" />
                <Stat value="100%" label="Secure" />
                <Stat value="4.9/5" label="User Rating" />
              </div>
            </div>
            {/* Background glow */}
            <div className="absolute inset-0 bg-accent blur-[80px] opacity-20 -z-0 translate-x-4 translate-y-4" />
          </div>
        </div>
      </section>

      {/* 6. CATEGORY GRID */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-card-border">
        <div className="container-center">
          <h2 className="text-h2 mb-12 tracking-tighter">
            Browse by <span className="text-accent">Category</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Business & Tax"
              count="12 Services"
              tags={["KRA", "BRS", "eTIMS"]}
            />
            <CategoryCard
              title="Transport"
              count="8 Services"
              tags={["NTSA", "DL", "Logbook"]}
            />
            <CategoryCard
              title="Legal & Safety"
              count="5 Services"
              tags={["Good Conduct", "Affidavits"]}
            />
            <CategoryCard
              title="Land & Property"
              count="4 Services"
              tags={["Searches", "Valuation"]}
            />
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faqs" className="py-24">
        <FAQSection />
      </section>
    </div>
  );
}

/* --- Sub-Components for Professional Layout --- */

function TrustLogo({ label }: { label: string }) {
  return (
    <span className="text-h4 font-black text-text-main tracking-tighter uppercase">
      {label}
    </span>
  );
}

function ProcessStep({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative p-8 bg-white/5 border border-white/10 rounded-4xl group hover:border-accent/50 transition-all">
      <span className="text-5xl font-black text-white/10 mb-6 block group-hover:text-accent/20 transition-colors tracking-tighter">
        {number}
      </span>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function TrustFeature({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 w-12 h-12 bg-accent-soft rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-text-main tracking-tighter mb-1">
        {value}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">
        {label}
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  count,
  tags,
}: {
  title: string;
  count: string;
  tags: string[];
}) {
  return (
    <div className="p-8 bg-card-bg border border-card-border rounded-[2.5rem] hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-none transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-black tracking-tight leading-tight max-w-[120px]">
          {title}
        </h3>
        <span className="text-[10px] font-bold bg-accent-soft text-accent px-3 py-1 rounded-full uppercase tracking-tighter">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-text-muted border border-card-border px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

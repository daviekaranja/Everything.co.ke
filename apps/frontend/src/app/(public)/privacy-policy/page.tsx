"use client";

import React from "react";
import { ShieldCheck, Trash2, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 14, 2026";

  return (
    <div className="min-h-screen text-text-main">
      {/* --- Minimalist Header --- */}
      <header className="pt-24 pb-16 px-6 smooth-card mb-4 md:mb-8">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
              Privacy is <br />
              <span className="text-accent">non-negotiable.</span>
            </h1>
            <p className="text-text-muted text-lg max-w-md font-medium leading-relaxed">
              We handle your official documents with the same care we would our
              own. Compliant with the Kenya Data Protection Act.
            </p>
            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Last Updated: {lastUpdated}
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- Main Content Grid --- */}
      <main className="bg-brand-bg mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: The Core Policy */}
          <div className="lg:col-span-7 space-y-20">
            <section className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight">
                How we treat your data
              </h2>
              <p className="text-text-muted leading-relaxed font-medium">
                To facilitate KRA, NTSA, and eCitizen services, we only collect
                what is strictly necessary. We don't build marketing profiles,
                and we never sell your phone number to third-party advertisers.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <DataRow
                  label="Collection"
                  value="IDs, PINs, and Logbooks only."
                />
                <DataRow
                  label="Usage"
                  value="Strictly for the requested portal task."
                />
                <DataRow
                  label="Retention"
                  value="Flagged for deletion upon completion."
                />
              </div>
            </section>

            {/* Featured Protocol Card */}
            <div className="p-8 bg-brand-dark rounded-[2.5rem] text-white relative overflow-hidden group">
              <div className="relative z-10 flex gap-6 items-start">
                <div className="p-4 bg-accent rounded-2xl">
                  <Trash2 size={24} className="text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black">
                    The "Clear Chat" Protocol
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Our standard operating procedure includes encouraging
                    clients to use WhatsApp’s{" "}
                    <strong>"Delete for Everyone"</strong> feature once a
                    service is confirmed. We purge our internal temp-files every
                    24 hours.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 blur-3xl" />
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight">
                Third-Party Portals
              </h2>
              <p className="text-text-muted text-sm leading-relaxed font-medium">
                When we act as your facilitator on official government portals
                (iTax, eCitizen, TIMS), their respective privacy policies also
                apply. EverythingKe acts as a secure bridge between you and
                these platforms.
              </p>
            </section>
          </div>

          {/* Right: Summary / Action Sidebar */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-8 smooth-card border rounded-xl space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent">
                Your Data Rights
              </h3>
              <ul className="space-y-6">
                <RightItem
                  title="Right to Erasure"
                  desc="Request manual deletion of your chat history at any time."
                />
                <RightItem
                  title="Right to Access"
                  desc="Know exactly which portal your data was used on."
                />
                <RightItem
                  title="Right to Privacy"
                  desc="Opt-out of any non-essential communications."
                />
              </ul>
              <div className="pt-4 border-t border-card-border">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm font-black uppercase tracking-tight">
                    Contact Data Officer
                  </span>
                  <div className="p-2 bg-accent text-white rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 px-8">
              <ShieldCheck className="text-accent" size={32} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Compliance
                </p>
                <p className="text-xs font-bold text-text-muted">
                  Registered Facilitator • Kenya Data Act 2019
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Refined UI Components --- */

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-card-border gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-accent">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

function RightItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-black tracking-tight">{title}</h4>
        <p className="text-xs text-text-muted leading-relaxed font-medium mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}

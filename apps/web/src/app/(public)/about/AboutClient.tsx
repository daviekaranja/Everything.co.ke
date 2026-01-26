"use client";

import React from "react";
import { aboutSchema } from "@/lib/markup_schemas";

// StatCard moved to a modular component as per instruction 3
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white border-2 border-brand-dark p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center transition-transform hover:translate-y-[-2px]">
      <div
        className="text-2xl md:text-3xl font-black text-accent"
        aria-label={`${number} ${label}`}
      >
        {number}
      </div>
      <div className="text-xs uppercase font-bold text-text-muted tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function AboutClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="bg-brand-bg min-h-screen pb-20 selection:bg-accent selection:text-white">
        {/* ================= HERO SECTION (Semantic Header) ================= */}
        <header className="bg-brand-dark text-white pt-24 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent font-black uppercase tracking-widest text-xs inline-block mb-2">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tighter leading-[1.1]">
              Digital <span className="text-accent">Empowerment</span> for every
              Kenyan.
            </h1>
            <p className="text-text-header text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              Everything.co.ke was built to bridge the gap between complex
              government portals and the everyday citizen. We make{" "}
              <strong className="text-accent font-bold">
                online cyber services in Kenya
              </strong>{" "}
              accessible, fast, and secure.
            </p>
          </div>
        </header>

        <main id="main-content" className="max-w-6xl mx-auto px-4 -mt-10">
          {/* ================= CORE STATS ================= */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            role="list"
          >
            <StatCard number="100%" label="Secure" />
            <StatCard number="24/7" label="Support" />
            <StatCard number="50k+" label="Served" />
            <StatCard number="47" label="Counties" />
          </div>

          {/* ================= STORY SECTION ================= */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-text-main mb-6 tracking-tight">
                Your Trusted Partner for{" "}
                <span className="text-accent">eCitizen Kenya</span> & More
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed text-base md:text-lg">
                <p>
                  Navigating the digital landscape in Kenya can be overwhelming.
                  Whether it&apos;s{" "}
                  <strong className="text-text-main">KRA services</strong>,{" "}
                  <strong className="text-text-main">NTSA services</strong>, or
                  a{" "}
                  <strong className="text-text-main">
                    passport application in Kenya
                  </strong>
                  , accuracy is the difference between success and a rejected
                  application.
                </p>
                <p>
                  At{" "}
                  <strong className="text-text-main">Everything.co.ke</strong>,
                  we specialize in professional{" "}
                  <strong className="text-text-main">
                    document processing services
                  </strong>
                  . From{" "}
                  <strong className="text-text-main">HELB assistance</strong>{" "}
                  for students to
                  <strong className="text-text-main">
                    business registration in Kenya
                  </strong>{" "}
                  for entrepreneurs, our team handles the technicalities.
                </p>
              </div>
            </article>

            {/* ================= TRUST CARD (UX Optimized) ================= */}
            <section className="bg-brand-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent opacity-10 blur-3xl"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-black mb-6">Why Choose Us?</h3>
              <ul className="space-y-5" role="list">
                {[
                  "Expertise in all online cyber services Kenya requires.",
                  "Strict data privacy protocols for your sensitive documents.",
                  "Fast turnaround—most tasks done in under 60 minutes.",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span
                      className="bg-accent text-white p-1 rounded-full text-xs"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-sm md:text-base font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ================= CALL TO ACTION (Conversion Focused) ================= */}
          <section className="service-card p-10 text-center bg-white border-2 border-brand-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
            <h2 className="text-3xl font-black text-text-main mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              Experience the most reliable cyber services in Kenya today. Our
              consultants are online now.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent text-white px-10 py-4 rounded-xl font-black hover:bg-opacity-90 active:scale-95 transition-all shadow-lg min-h-[44px] min-w-[200px]"
            >
              Message Us on WhatsApp
            </a>
          </section>
        </main>
      </div>
    </>
  );
}

"use client";

import { ArrowRight, CheckCircle2, Search, HelpCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-brand-bg py-20 lg:py-32">
      <div className="container-center text-center">
        <div className="badge-provider mb-6 inline-block">
          Direct Access • 2026 Updated
        </div>
        <h1 className="max-w-4xl mx-auto">
          The Direct Way to Access{" "}
          <span className="text-accent">Kenyan Digital Services.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
          Apply for KRA, NTSA, and eCitizen services with guaranteed 24-hour
          processing. No queues, no delays—just results.
        </p>

        {/* SEO-Focused Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-header group-focus-within:text-accent transition-colors"
            size={24}
          />
          <input
            type="text"
            placeholder="Search e.g. 'KRA PIN Registration' or 'Logbook Transfer'..."
            className="search-input !pl-14 !py-6 !text-lg shadow-2xl shadow-orange-500/5"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all hidden sm:block">
            Find Service
          </button>
        </div>
      </div>
    </section>
  );
}

export function ServiceGrid() {
  const services = [
    {
      title: "KRA PIN Registration",
      desc: "Get your new KRA PIN certificate in hours.",
      price: "Ksh 500",
    },
    {
      title: "NTSA DL Renewal",
      desc: "Instant renewal of driving licenses (1yr or 3yr).",
      price: "Ksh 1,200",
    },
    {
      title: "eCitizen Passport",
      desc: "Assistance with passport applications & booking.",
      price: "Ksh 1,500",
    },
    {
      title: "Logbook Transfer",
      desc: "Simplified motor vehicle ownership transfers.",
      price: "Ksh 2,500",
    },
    {
      title: "Certificate of Good Conduct",
      desc: "DCI appointment booking and processing.",
      price: "Ksh 800",
    },
    {
      title: "Business Name Search",
      desc: "Check availability and register business names.",
      price: "Ksh 1,000",
    },
  ];

  return (
    <section className="py-20 bg-card-bg">
      <div className="container-center">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-h2">Essential Services</h2>
            <p className="text-text-muted">
              Top-rated digital applications used by thousands of Kenyans daily.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-accent font-bold hover:underline">
            All Services <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="service-card group">
              <h3 className="text-h3">{s.title}</h3>
              <p className="text-sm text-text-muted mb-6 flex-grow">{s.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-lg tabular-nums">
                  {s.price}
                </span>
                <span className="text-accent group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="bg-brand-bg">
      <div className="container-center max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-h2">Common Questions</h2>
          <p className="text-text-muted">
            Everything you need to know about our assistance services.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "How long does a KRA PIN registration take?",
              a: "Typically, we process and deliver your KRA PIN certificate within 2 to 4 hours of submission.",
            },
            {
              q: "Is EverythingKe affiliated with the Government?",
              a: "We are an independent professional service provider assisting citizens in navigating government portals efficiently.",
            },
            {
              q: "How do I receive my documents?",
              a: "All certificates and receipts are sent directly to your registered Email and WhatsApp in PDF format.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold list-none">
                <span className="flex items-center gap-3">
                  <HelpCircle className="text-accent" size={20} /> {item.q}
                </span>
                <span className="transition-transform group-open:rotate-180">
                  <ArrowRight className="rotate-90" size={18} />
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-muted leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

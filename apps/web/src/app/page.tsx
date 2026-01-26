"use client";

import GlobalSearch from "@/lib/components/services/searchBar";
import { useRouter } from "next/navigation";
import { homeSchema, optimizedFaqSchema } from "@/lib/markup_schemas";

// Keywords are woven into titles and descriptions to build topical authority
const TOP_SERVICES = [
  { name: "KRA Pin", slug: "kra-pin-registration", icon: "📝" },
  { name: "DL Renewal", slug: "dl-renewal", icon: "🚗" },
  { name: "Good Conduct", slug: "certificate-of-good-conduct", icon: "🛡️" },
  { name: "Passport", slug: "passport-application", icon: "🛂" },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      {/* Structural SEO Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizedFaqSchema) }}
      />

      <div className="bg-brand-bg transition-colors duration-300">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-40 overflow-hidden bg-brand-dark text-white">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 md:w-96 md:h-96 bg-accent opacity-15 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            {/* SEO Trust Badge */}
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-accent/10 border border-accent/20 mb-6 md:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                Kenya&apos;s Trusted Online Cyber Services
              </span>
            </div>

            {/* Title Optimized for Clamped Scaling on Mobile */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[1] md:leading-[0.85]">
              Cyber Services <br className="hidden sm:block" />
              <span className="text-accent italic">Simplified.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base md:text-xl text-text-header mb-10 leading-relaxed font-medium">
              Professional assistance for{" "}
              <span className="text-white font-bold">KRA returns</span>,
              <span className="text-white font-bold"> eCitizen Kenya</span>, and
              <span className="text-white font-bold"> NTSA Tims</span>. Fast,
              accurate, and secure.
            </p>

            {/* SEARCH ZONE - Optimized for Mobile Taps */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="relative">
                <GlobalSearch />
                <p className="mt-3 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                  Popular: KRA Pin Registration, Passport Application, Good
                  Conduct
                </p>
              </div>

              {/* Quick Chips - Scrollable on very small screens */}
              <div className="flex flex-wrap justify-center gap-2">
                {TOP_SERVICES.map((service) => (
                  <button
                    key={service.slug}
                    onClick={() => router.push(`/services/${service.slug}`)}
                    className="group flex items-center gap-2 px-4 py-3 bg-slate-900/60 hover:bg-accent border border-slate-800 hover:border-accent rounded-xl transition-all active:scale-95"
                    aria-label={`Access ${service.name} services`}
                  >
                    <span className="text-lg">{service.icon}</span>
                    <span className="text-[10px] font-black text-slate-300 group-hover:text-white uppercase">
                      {service.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= PARTNERS LOGO CLOUD ================= */}
        <section className="py-8 md:py-12 bg-white dark:bg-brand-dark border-b border-card-border/30">
          <div className="max-w-6xl mx-auto px-6 overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-center text-text-muted mb-6 md:mb-8">
              Official Portal Assistance
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-50 grayscale contrast-125">
              {[
                "eCitizen",
                "KRA",
                "NTSA",
                "HELB",
                "DCI",
                "Business Registration",
              ].map((p) => (
                <span
                  key={p}
                  className="text-xl md:text-3xl font-black tracking-tighter text-brand-dark dark:text-white"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICE PILLARS ================= */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-text-main">
              Everything you need,{" "}
              <span className="text-accent">all in one place.</span>
            </h2>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            <PillarCard
              title="Government"
              desc="Fast-tracked eCitizen Kenya apps and police clearance certificates."
              items={[
                "KRA Tax Returns",
                "Passport Applications",
                "Good Conduct",
                "HELB Assistance",
              ]}
            />
            <PillarCard
              title="Business"
              desc="Get your Business Registration in Kenya handled by experts."
              items={[
                "Company Registration",
                "CR12 Search",
                "Business KRA PIN",
                "Tax Compliance",
              ]}
              isFeatured={true}
            />
            <PillarCard
              title="Cyber Hub"
              desc="Professional document processing services for any requirement."
              items={[
                "Professional CVs",
                "PDF Editing",
                "Scanning & Uploads",
                "Online Applications",
              ]}
            />
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-20 md:py-32 bg-card-bg border-y border-card-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-7xl font-black text-text-main tracking-tighter leading-tight mb-6">
                  Simple <span className="text-accent italic">3-Step</span>{" "}
                  Process
                </h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Skip the long queues at Nyayo House or Huduma Centers. We
                  handle the heavy lifting for you digitally.
                </p>
              </div>
              <div className="space-y-8">
                <Step
                  number="01"
                  title="Select Service"
                  text="Choose from our range of online cyber services Kenya citizens rely on."
                />
                <Step
                  number="02"
                  title="Send Details"
                  text="Share required documents safely via our encrypted WhatsApp line."
                />
                <Step
                  number="03"
                  title="Relax"
                  text="Get your certificate or receipt processed and delivered to your phone."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-brand-dark rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden text-center shadow-2xl shadow-brand-dark/20">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 relative z-10 tracking-tighter">
              Avoid Penalties. <br /> Start Today.
            </h2>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block relative z-10 bg-accent text-white px-8 py-4 md:px-12 md:py-6 rounded-xl font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-xl"
            >
              Search All Services
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

/* -----------------------------------------------------
    UI COMPONENTS (Optimized for performance)
----------------------------------------------------- */

function PillarCard({
  title,
  desc,
  items,
  isFeatured = false,
}: {
  title: string;
  desc: string;
  items: string[];
  isFeatured?: boolean;
}) {
  return (
    <article
      className={`p-8 md:p-10 rounded-[2rem] border-2 transition-all duration-300 ${
        isFeatured
          ? "bg-white border-accent shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] md:-translate-y-4"
          : "bg-white border-brand-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      <h3 className="text-2xl font-black text-text-main mb-3">{title}</h3>
      <p className="text-text-muted text-sm mb-6 leading-relaxed font-medium">
        {desc}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm font-bold text-text-main"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-6 items-start">
      <span className="text-4xl font-black text-accent/20">{number}</span>
      <div>
        <h3 className="text-xl font-black text-text-main mb-1">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
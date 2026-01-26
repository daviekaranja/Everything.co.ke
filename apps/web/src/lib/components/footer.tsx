'use client';

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t border-card-border/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* ================= NEWSLETTER SECTION ================= */}
        <div className="relative bg-accent rounded-[2rem] p-8 md:p-12 mb-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                Get Cyber Tips & <br />
                <span className="text-brand-dark">Service Updates.</span>
              </h3>
              <p className="text-brand-dark/80 mt-4 font-bold text-sm">
                Join 5,000+ Kenyans getting updates on KRA deadlines, NTSA news,
                and eCitizen guides.
              </p>
            </div>

            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white text-brand-dark font-bold focus:outline-none placeholder:text-slate-400 border-none"
              />
              <button className="bg-brand-dark text-white px-8 py-4 rounded-xl font-black hover:scale-[1.02] transition-transform active:scale-95 shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tighter">
              Everything<span className="text-accent">.co.ke</span>
            </h3>
            <p className="text-sm text-text-header leading-relaxed">
              The leading hub for{" "}
              <span className="text-white font-bold">
                online cyber services in Kenya.
              </span>{" "}
              We provide fast, expert assistance with KRA, NTSA, and eCitizen
              portals.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-black border border-slate-700"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-black border border-slate-700"
              >
                f
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
              Our Expertise
            </h4>
            <ul className="space-y-3 text-sm text-text-header">
              {[
                { name: "KRA Services", href: "/services/kra" },
                { name: "NTSA Services", href: "/services/ntsa" },
                { name: "eCitizen Kenya", href: "/services/ecitizen" },
                { name: "HELB Assistance", href: "/services/helb" },
                { name: "Passport Applications", href: "/services/passport" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-px w-2 bg-accent/50 group-hover:w-4 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-text-header">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms & Conditions", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
              Support
            </h4>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-accent transition-all group shadow-sm hover:shadow-accent/10"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <p className="font-bold text-white text-sm">WhatsApp Help</p>
                  <p className="text-[10px] text-text-header uppercase tracking-wider">
                    Fastest Response
                  </p>
                </div>
              </a>
              <div className="pt-2">
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">
                  Email Inquiry
                </p>
                <a
                  href="mailto:support@everything.co.ke"
                  className="text-sm text-text-header hover:text-white transition-colors break-words font-medium"
                >
                  support@everything.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-text-header font-medium">
            © {new Date().getFullYear()} Everything.co.ke. Built for Kenyan
            Citizens.
          </p>
          <div className="flex items-center gap-3 text-[9px] font-black text-text-header uppercase tracking-widest">
            <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
              Data Encrypted
            </span>
            <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
              Safe Payments
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

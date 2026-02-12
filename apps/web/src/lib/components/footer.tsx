// 'use client';

// import Link from "next/link";

// export function Footer() {
//   return (
//     <footer className="bg-brand-dark text-white border-t border-card-border/10">
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         {/* ================= NEWSLETTER SECTION ================= */}
//         <div className="relative bg-accent rounded-[2rem] p-8 md:p-12 mb-20 overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
//           {/* Decorative Circle */}
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

//           <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
//                 Get Cyber Tips & <br />
//                 <span className="text-brand-dark">Service Updates.</span>
//               </h3>
//               <p className="text-brand-dark/80 mt-4 font-bold text-sm">
//                 Join 5,000+ Kenyans getting updates on KRA deadlines, NTSA news,
//                 and eCitizen guides.
//               </p>
//             </div>

//             <form
//               className="flex flex-col sm:flex-row gap-3"
//               onSubmit={(e) => e.preventDefault()}
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-6 py-4 rounded-xl bg-white text-brand-dark font-bold focus:outline-none placeholder:text-slate-400 border-none"
//               />
//               <button className="bg-brand-dark text-white px-8 py-4 rounded-xl font-black hover:scale-[1.02] transition-transform active:scale-95 shadow-lg">
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="grid gap-12 md:grid-cols-4">
//           {/* Brand & Mission */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-black tracking-tighter">
//               Everything<span className="text-accent">.co.ke</span>
//             </h3>
//             <p className="text-sm text-text-header leading-relaxed">
//               The leading hub for{" "}
//               <span className="text-white font-bold">
//                 online cyber services in Kenya.
//               </span>{" "}
//               We provide fast, expert assistance with KRA, NTSA, and eCitizen
//               portals.
//             </p>
//             <div className="flex gap-3">
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-black border border-slate-700"
//               >
//                 𝕏
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-black border border-slate-700"
//               >
//                 f
//               </a>
//             </div>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
//               Our Expertise
//             </h4>
//             <ul className="space-y-3 text-sm text-text-header">
//               {[
//                 { name: "KRA Services", href: "/services/kra" },
//                 { name: "NTSA Services", href: "/services/ntsa" },
//                 { name: "eCitizen Kenya", href: "/services/ecitizen" },
//                 { name: "HELB Assistance", href: "/services/helb" },
//                 { name: "Passport Applications", href: "/services/passport" },
//               ].map((item) => (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     className="hover:text-white transition-colors flex items-center gap-2 group"
//                   >
//                     <span className="h-px w-2 bg-accent/50 group-hover:w-4 transition-all"></span>
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
//               Company
//             </h4>
//             <ul className="space-y-3 text-sm text-text-header">
//               {[
//                 { name: "About Us", href: "/about" },
//                 { name: "Contact Us", href: "/contact" },
//                 { name: "Privacy Policy", href: "/privacy-policy" },
//                 { name: "Terms & Conditions", href: "/terms" },
//               ].map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="hover:text-accent transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact CTA */}
//           <div>
//             <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-accent">
//               Support
//             </h4>
//             <div className="space-y-4">
//               <a
//                 href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
//                 className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-accent transition-all group shadow-sm hover:shadow-accent/10"
//               >
//                 <div className="text-2xl group-hover:scale-110 transition-transform">
//                   💬
//                 </div>
//                 <div>
//                   <p className="font-bold text-white text-sm">WhatsApp Help</p>
//                   <p className="text-[10px] text-text-header uppercase tracking-wider">
//                     Fastest Response
//                   </p>
//                 </div>
//               </a>
//               <div className="pt-2">
//                 <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">
//                   Email Inquiry
//                 </p>
//                 <a
//                   href="mailto:support@everything.co.ke"
//                   className="text-sm text-text-header hover:text-white transition-colors break-words font-medium"
//                 >
//                   support@everything.co.ke
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-[11px] text-text-header font-medium">
//             © {new Date().getFullYear()} Everything.co.ke. Built for Kenyan
//             Citizens.
//           </p>
//           <div className="flex items-center gap-3 text-[9px] font-black text-text-header uppercase tracking-widest">
//             <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
//               Data Encrypted
//             </span>
//             <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
//               Safe Payments
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "KRA Services", href: "/services/kra" },
    { name: "NTSA (TIMS/Transport)", href: "/services/ntsa" },
    { name: "eCitizen Assistance", href: "/services/ecitizen" },
    { name: "Business Registration", href: "/services/business" },
    { name: "Land & Property", href: "/services/land" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Service Pricing", href: "/pricing" },
    { name: "Agent Portal", href: "/agents" },
    { name: "Contact Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refunds" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border pt-20 pb-10">
      <div className="container-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. BRAND & NEWSLETTER */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="EverythingKe"
                width={32}
                height={32}
              />
              <span className="text-xl font-black tracking-tighter text-text-main">
                Everything<span className="text-accent">Ke</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Kenya's premier digital service facilitator. We simplify complex
              government applications so you can focus on what matters.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Stay updated..."
                className="w-full bg-brand-bg border border-card-border p-3 pr-12 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-1.5 rounded-lg hover:bg-accent-hover transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* 2. DYNAMIC LINKS */}
          <div>
            <h4 className="font-bold text-text-main mb-6 uppercase text-xs tracking-[0.2em]">
              Our Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. QUICK LINKS */}
          <div>
            <h4 className="font-bold text-text-main mb-6 uppercase text-xs tracking-[0.2em]">
              Support & Info
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. DIRECT CONTACT (High Trust) */}
          <div className="space-y-6">
            <h4 className="font-bold text-text-main mb-6 uppercase text-xs tracking-[0.2em]">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-accent-soft text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-header uppercase">
                    WhatsApp/Call
                  </p>
                  <p className="text-sm font-bold text-text-main">
                    +254 700 000 000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-accent-soft text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-header uppercase">
                    Email Support
                  </p>
                  <p className="text-sm font-bold text-text-main">
                    hello@everything.co.ke
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent-soft text-accent rounded-lg">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-header uppercase">
                    Nairobi Office
                  </p>
                  <p className="text-sm font-bold text-text-main">
                    Westlands, Nairobi, KE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-all"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-all"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-all"
              >
                <Instagram size={18} />
              </Link>
            </div>
            <div className="h-6 w-[1px] bg-card-border hidden sm:block" />
            <p className="text-[10px] md:text-xs text-text-muted max-w-[400px]">
              <span className="font-bold text-text-main uppercase">
                Disclaimer:
              </span>{" "}
              everything.co.ke is an independent service provider and is not
              affiliated with any government agency or the Government of Kenya.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold uppercase tracking-widest text-text-header">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-text-header uppercase tracking-[0.4em]">
            © 2026 EVERYTHING.CO.KE • BUILT IN NAIROBI
          </p>
        </div>
      </div>
    </footer>
  );
}

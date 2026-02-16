"use client";
import {
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const WHATSAPP_LINK = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254783202527"}`;

  return (
    <div className="bg-brand-bg min-h-screen text-text-main">
      {/* --- Simple Hero --- */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
              Let’s get it <br />
              <span className="text-accent">sorted.</span>
            </h1>
            <p className="text-text-muted text-lg max-w-md font-medium leading-relaxed">
              Fast-track your KRA, eCitizen, and NTSA services with Kenya's most
              trusted digital assistant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Main Grid --- */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Methods */}
          <div className="lg:col-span-7 space-y-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="group flex items-center justify-between p-6 bg-card-bg border border-card-border rounded-3xl hover:border-accent transition-all shadow-sm"
            >
              <div className="flex gap-5 items-center">
                <div className="p-4 bg-accent text-white rounded-2xl group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg">WhatsApp Support</h3>
                  <p className="text-text-muted text-sm font-medium">
                    Chat now • Average reply: 5 mins
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-accent font-black text-xs uppercase tracking-widest bg-accent-soft px-4 py-2 rounded-full">
                Open
              </div>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-card-bg border border-card-border rounded-3xl space-y-4">
                <Phone className="text-accent" size={24} />
                <h3 className="font-black">Call Direct</h3>
                <a
                  href="tel:+254783202527"
                  className="block text-text-muted hover:text-accent font-bold transition-colors"
                >
                  +254 783 202 527
                </a>
              </div>
              <div className="p-6 bg-card-bg border border-card-border rounded-3xl space-y-4">
                <MapPin className="text-accent" size={24} />
                <h3 className="font-black">Nairobi Office</h3>
                <p className="text-text-muted font-bold">Westlands, Nairobi</p>
              </div>
            </div>

            <div className="p-8 bg-brand-dark rounded-[2rem] text-white relative overflow-hidden group">
              <div className="relative z-10 flex gap-6 items-center">
                <ShieldCheck className="text-accent shrink-0" size={32} />
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  <strong>Data Privacy:</strong> We strictly follow the Data
                  Protection Act. All documents are purged from our records
                  immediately after your service is completed.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 blur-3xl" />
            </div>
          </div>

          {/* Right Column: Schedule & FAQ */}
          <div className="lg:col-span-5 space-y-12">
            {/* Hours */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Clock className="text-accent" size={20} />
                <h2 className="font-black uppercase tracking-widest text-[10px]">
                  Service Hours
                </h2>
              </div>
              <div className="space-y-3">
                <HourRow day="Weekdays" time="8:00 AM – 6:00 PM" />
                <HourRow day="Saturdays" time="9:00 AM – 4:00 PM" />
                <div className="flex justify-between text-xs font-bold text-accent/50">
                  <span>Sundays</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Simple FAQ */}
            <div className="space-y-6 pt-6 border-t border-card-border">
              <div className="flex items-center gap-3">
                <HelpCircle className="text-accent" size={20} />
                <h2 className="font-black uppercase tracking-widest text-[10px]">
                  Helpful Info
                </h2>
              </div>
              <div className="space-y-6">
                <SimpleFaq
                  q="No physical visit required?"
                  a="Correct. Send your documents via WhatsApp and receive your processed files digitally."
                />
                <SimpleFaq
                  q="How do I pay?"
                  a="We use M-Pesa. You only pay once we confirm your request is ready for processing."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Refined Minimal Helpers --- */

function HourRow({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex justify-between items-center text-sm font-medium">
      <span className="text-text-muted">{day}</span>
      <span className="font-black">{time}</span>
    </div>
  );
}

function SimpleFaq({ q, a }: { q: string; a: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-black tracking-tight">{q}</h4>
      <p className="text-xs text-text-muted leading-relaxed font-medium">{a}</p>
    </div>
  );
}

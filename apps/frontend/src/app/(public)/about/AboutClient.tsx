"use client";

import {
  CheckCircle2,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Heart,
  Smartphone,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// Modular Stat Component
function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="w-12 h-12 bg-accent-soft rounded-2xl flex items-center justify-center text-accent mb-4">
        <Icon size={24} />
      </div>
      <div className="text-2xl font-black text-text-main tracking-tighter">
        {value}
      </div>
      <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

export default function AboutClient() {
  const specializedServices = [
    {
      title: "Civil Registration",
      items: ["New Birth Certificates", "Replacement Certificates"],
    },
    {
      title: "Tax & Revenue",
      items: ["KRA PIN Applications", "Nil Returns", "eTIMS Support"],
    },
    {
      title: "Transport",
      items: ["NTSA DL Renewals", "New Plate Applications"],
    },
    {
      title: "Legal & Safety",
      items: ["Police Clearance (Good Conduct)", "AGPO Approvals"],
    },
  ];

  return (
    <div className=" min-h-screen">
      {/* 1. Hero Section */}
      <header className="bg-brand-bg mb-4 shadow relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="container-center relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent-soft text-accent-text text-[11px] font-black uppercase tracking-[0.2em] mb-6"
          >
            About Everything.co.ke
          </motion.span>
          <h1 className="max-w-4xl mx-auto leading-tight mb-8">
            The Leading Platform for{" "}
            <span className="text-accent">Fast, Secure & Hassle-Free</span>{" "}
            Government Services.
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium">
            We specialize in helping individuals, families, and businesses
            navigate eCitizen, KRA, NTSA, and HELB with absolute confidence.
          </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent-soft)_0%,transparent_70%)] opacity-40 -z-10" />
      </header>

      {/* 2. Impact Stats */}
      <section className="container-center  mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card-bg border border-card-border rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none p-4">
          <Stat icon={Shield} value="100%" label="Secure & Private" />
          <Stat icon={Zap} value="Same Day" label="Fastest Delivery" />
          <Stat icon={Users} value="50k+" label="Kenyans Empowered" />
          <Stat icon={Globe} value="47" label="Counties Covered" />
        </div>
      </section>

      {/* 3. The Mission & Story */}
      <main className="container-center pb-32 smooth-card p-6 md:p-12 rounded-2xl mb-4 md:mb-8">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-6">
            <h2 className="text-h2 text-text-main tracking-tighter">
              Removing Bureaucracy Barriers.
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              Founded in Nairobi, Everything.co.ke was built with a clear
              mission: to provide every Kenyan with modern, digital-first access
              to the services they need every day.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              From business name registrations to police clearance, our expert
              team handles the entire process so you don’t have to—saving you
              endless queues and unnecessary stress.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <ValuePoint
                icon={Shield}
                title="Security First"
                text="Bank-grade encryption for PII."
              />
              <ValuePoint
                icon={Zap}
                title="Speed"
                text="Record time delivery."
              />
              <ValuePoint
                icon={Smartphone}
                title="Mobile Ready"
                text="Access from any county."
              />
              <ValuePoint
                icon={Heart}
                title="Human Support"
                text="Real help via WhatsApp."
              />
            </div>
          </div>
          <div className="bg-brand-dark rounded-[3rem] p-10 text-white relative overflow-hidden">
            <h3 className="text-2xl font-black mb-6">Our Core Focus</h3>
            <div className="space-y-8">
              {specializedServices.map((group, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="text-accent text-xs font-black uppercase tracking-widest">
                    {group.title}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {group.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm text-slate-300"
                      >
                        <CheckCircle2 size={14} className="text-accent" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 blur-[80px]" />
          </div>
        </div>

        {/* 4. Why We're Different Section */}
        <section className="mb-32 text-center">
          <h2 className="text-h2 mb-16 tracking-tighter">
            Why Kenyans Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem
              title="Built Differently"
              text="Cleaner, modern interfaces that make government portals actually feel intuitive."
            />
            <FeatureItem
              title="Transparent Pricing"
              text="No hidden charges or fine print. You see exactly what you pay for on every service page."
            />
            <FeatureItem
              title="Real-Time Tracking"
              text="Track your application status and get updates directly on your phone."
            />
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="relative rounded-[3rem] bg-brand-dark p-8 md:p-16 overflow-hidden text-center md:text-left">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-4">
              <h2 className="text-white mb-0">Experience the difference.</h2>
              <p className="text-slate-400">
                Join thousands of users avoiding common delays and rejections.
                Our consultants are online now to handle your request.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center justify-center gap-2 px-10 py-5 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-95"
              >
                <span>Message on WhatsApp</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -z-0" />
        </section>
      </main>
    </div>
  );
}

function ValuePoint({ icon: Icon, title, text }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-text-main">
        <Icon size={16} className="text-accent" />
        <span className="font-black text-xs uppercase tracking-tight">
          {title}
        </span>
      </div>
      <p className="text-[11px] text-text-muted leading-relaxed font-medium">
        {text}
      </p>
    </div>
  );
}

function FeatureItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-10 bg-card-bg border border-card-border rounded-[2.5rem] hover:border-accent/30 transition-all group">
      <h4 className="text-xl font-black text-text-main mb-4 group-hover:text-accent transition-colors">
        {title}
      </h4>
      <p className="text-sm text-text-muted leading-relaxed font-medium">
        {text}
      </p>
    </div>
  );
}

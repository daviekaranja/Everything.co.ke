"use client";

import React from "react";

export default function ContactPage() {
  const WHATSAPP_LINK = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"
  }`;

  return (
    <div className="bg-brand-bg min-h-screen transition-colors duration-300 pb-20 md:pb-0">
      {/* ================= HEADER ================= */}
      <header className="bg-brand-dark text-white pt-20 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent font-black uppercase tracking-widest text-xs">
            Support Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tighter">
            How can we <span className="text-accent">help?</span>
          </h1>
          <p className="text-text-header text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Reach out for fast, professional assistance with KRA, eCitizen, and
            all digital government services.
          </p>
        </div>
      </header>

      {/* ================= CONTACT CARDS ================= */}
      <main className="max-w-6xl mx-auto px-4 -mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard
            icon="💬"
            title="WhatsApp"
            text="The fastest way to get a response and share documents."
            action={
              <a
                href={WHATSAPP_LINK}
                className="w-full inline-block bg-accent text-white py-4 rounded-xl font-black hover:scale-[1.02] transition-transform text-center shadow-lg shadow-orange-500/20"
              >
                Start Chatting
              </a>
            }
          />

          <ContactCard
            icon="📞"
            title="Call Us"
            text="Available during working hours for urgent inquiries."
            action={
              <a
                href="tel:+254700000000"
                className="text-2xl font-black text-text-main hover:text-accent transition-colors"
              >
                +254 700 000 000
              </a>
            }
          />

          <ContactCard
            icon="📍"
            title="Visit Office"
            text="Visit our location for bulk document processing."
            action={
              <p className="font-black text-text-main text-lg uppercase tracking-tight">
                Nairobi, Kenya
              </p>
            }
          />
        </div>

        {/* ================= WORKING HOURS & MAP PREVIEW ================= */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Hours Card */}
          <div className="service-card p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-black text-text-main mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-accent rounded-full" />
              Working Hours
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-card-border pb-3">
                <span className="font-bold text-text-muted">Mon — Fri</span>
                <span className="font-black text-text-main">
                  8:00 AM – 6:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-card-border pb-3">
                <span className="font-bold text-text-muted">Saturday</span>
                <span className="font-black text-text-main">
                  9:00 AM – 4:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center text-accent">
                <span className="font-bold">Sunday</span>
                <span className="font-black">Closed</span>
              </div>
            </div>
          </div>

          {/* Trust Note */}
          <div className="bg-brand-dark rounded-[2.5rem] p-10 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-20 blur-3xl" />
            <h3 className="text-2xl font-black mb-4 relative z-10">
              Data Privacy
            </h3>
            <p className="text-text-header leading-relaxed relative z-10">
              We handle your ID numbers, certificates, and PII with strict
              confidentiality. Documents shared via WhatsApp are deleted from
              our servers immediately after the service is completed.
            </p>
          </div>
        </div>

        {/* ================= QUICK FAQ ================= */}
        <div className="mt-24 mb-20">
          <h2 className="text-3xl font-black text-text-main text-center mb-12 tracking-tighter">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FaqItem
              question="Do I need to visit in person?"
              answer="No. 95% of our services can be handled entirely via WhatsApp or Email."
            />
            <FaqItem
              question="What are the payment methods?"
              answer="We primarily use M-Pesa for fast and secure service fee payments."
            />
            <FaqItem
              question="How long does KRA filing take?"
              answer="Most KRA and NTSA tasks are completed within 30-60 minutes."
            />
            <FaqItem
              question="Is my data safe?"
              answer="Yes, we use end-to-end encrypted chats and secure deletion protocols."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* -----------------------------------------------------
    HELPERS
----------------------------------------------------- */

function ContactCard({
  icon,
  title,
  text,
  action,
}: {
  icon: string;
  title: string;
  text: string;
  action: React.ReactNode;
}) {
  return (
    <div className="service-card p-10 text-center flex flex-col items-center">
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-2xl font-black text-text-main mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-text-muted text-sm mb-8 leading-relaxed max-w-[200px]">
        {text}
      </p>
      <div className="mt-auto w-full">{action}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-card-bg border border-card-border p-6 rounded-2xl">
      <h4 className="font-black text-text-main mb-2">{question}</h4>
      <p className="text-text-muted text-sm leading-relaxed">{answer}</p>
    </div>
  );
}
// "use client";

// import React from "react";
// import { ShieldCheck, Lock, Trash2, EyeOff } from "lucide-react";

// export default function PrivacyPolicyPage() {
//   const lastUpdated = "January 8, 2026";

//   return (
//     <div className="bg-brand-bg min-h-screen">
//       {/* 1. Impact Header */}
//       <header className="relative pt-24 pb-20 px-4 overflow-hidden bg-card-bg border-b border-card-border">
//         <div className="container-center relative z-10 text-center">
//           <span className="inline-block px-4 py-1.5 rounded-full bg-accent-soft text-accent-text text-[10px] font-black uppercase tracking-[0.2em] mb-6">
//             Privacy Framework
//           </span>
//           <h1 className="text-h1 text-text-main tracking-tighter mb-4">
//             Your Data, <span className="text-accent">Protected.</span>
//           </h1>
//           <p className="text-text-muted font-bold text-sm uppercase tracking-widest">
//             Last Reviewed: {lastUpdated}
//           </p>
//         </div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent-soft)_0%,transparent_70%)] opacity-30 -z-10" />
//       </header>

//       {/* 2. Security Trust Bar */}
//       <section className="container-center -mt-8 mb-20">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <TrustPill icon={Lock} text="End-to-End Encryption" />
//           <TrustPill icon={Trash2} text="Auto-Deletion Policy" />
//           <TrustPill icon={ShieldCheck} text="Data Act Compliant" />
//         </div>
//       </section>

//       {/* 3. Policy Content */}
//       <main className="max-w-3xl mx-auto px-6 pb-32">
//         <div className="space-y-16">
//           <p className="text-lg md:text-xl text-text-main leading-relaxed font-medium border-l-4 border-accent pl-6">
//             At <strong>Everything.co.ke</strong>, we handle sensitive government
//             applications. We operate under strict protocols to ensure your
//             personal identifiable information (PII) is protected under the Data
//             Protection Act of Kenya.
//           </p>

//           <PolicySection title="1. Information We Collect">
//             <p>
//               To facilitate KRA, NTSA, and eCitizen services, we may require:
//             </p>
//             <ul className="space-y-3">
//               {[
//                 "Full name and contact details (Phone/Email)",
//                 "Government IDs and KRA PIN numbers",
//                 "Vehicle logbooks & Business registration data",
//               ].map((item, i) => (
//                 <li
//                   key={i}
//                   className="flex gap-3 items-center text-text-main font-medium"
//                 >
//                   <div className="w-1.5 h-1.5 bg-accent rounded-full" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </PolicySection>

//           <PolicySection title="2. Purpose of Processing">
//             <p>
//               Your data is used <strong>exclusively</strong> for the specific
//               task you request. We do not build marketing profiles or sell your
//               contact information. Once your service is delivered, your
//               sensitive document files are flagged for immediate disposal.
//             </p>
//           </PolicySection>

//           <PolicySection title="3. The 'Clear Chat' Protocol">
//             <div className="bg-brand-dark rounded-3xl p-8 text-white relative overflow-hidden">
//               <div className="relative z-10 flex gap-6 items-start">
//                 <div className="p-3 bg-accent rounded-2xl shrink-0">
//                   <EyeOff size={24} />
//                 </div>
//                 <div className="space-y-2">
//                   <h4 className="font-black uppercase tracking-widest text-xs text-accent">
//                     Security Best Practice
//                   </h4>
//                   <p className="text-slate-300 italic leading-relaxed">
//                     &quot;We maintain a strict Clear Chat policy. Once your
//                     service is delivered, we encourage clients to use
//                     WhatsApp&apos;s &apos;Delete for Everyone&apos; feature for
//                     any uploaded ID copies.&quot;
//                   </p>
//                 </div>
//               </div>
//               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl" />
//             </div>
//           </PolicySection>

//           <PolicySection title="4. Third-Party Portals">
//             <p>
//               Interacting with official government portals (iTax, eCitizen,
//               TIMS) means their respective privacy policies also apply.
//               Everything.co.ke acts as a professional facilitator for your data
//               on these platforms.
//             </p>
//           </PolicySection>

//           {/* 4. Support/Action Area */}
//           <div className="pt-10 border-t border-card-border text-center space-y-6">
//             <h3 className="text-h3 text-text-main">
//               Need to clear your records?
//             </h3>
//             <p className="text-text-muted max-w-sm mx-auto">
//               If you wish to request a permanent manual deletion of your history
//               from our internal support logs:
//             </p>
//             <a
//               href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
//               className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-hover transition-all shadow-xl shadow-orange-500/20 active:scale-95"
//             >
//               Contact Data Officer
//             </a>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* --- Sub-Components --- */

// function TrustPill({ icon: Icon, text }: { icon: any; text: string }) {
//   return (
//     <div className="flex items-center gap-3 bg-card-bg border border-card-border p-4 rounded-2xl shadow-sm">
//       <div className="text-accent bg-accent-soft p-2 rounded-lg">
//         <Icon size={18} />
//       </div>
//       <span className="text-xs font-black text-text-main uppercase tracking-tight">
//         {text}
//       </span>
//     </div>
//   );
// }

// function PolicySection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section>
//       <h2 className="text-h2 text-text-main mb-6 flex items-center gap-4">
//         <span className="text-accent/30 font-black">/</span>
//         {title}
//       </h2>
//       <div className="text-text-muted leading-relaxed text-base md:text-lg space-y-4">
//         {children}
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Trash2,
  EyeOff,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 14, 2026";

  return (
    <div className="bg-brand-bg min-h-screen text-text-main">
      {/* --- Minimalist Header --- */}
      <header className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
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
      <main className="max-w-5xl mx-auto px-6 pb-24">
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
            <div className="p-8 bg-card-bg border border-card-border rounded-[2.5rem] space-y-8">
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

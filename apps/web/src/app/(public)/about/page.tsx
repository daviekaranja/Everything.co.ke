// "use client";

// import React from "react";
// import { aboutSchema } from "@/lib/markup_schemas";

// export default function AboutPage() {
//   return (
//       <>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
//         />
//       <div className="bg-brand-bg min-h-screen pb-20">
//         {/* ================= HERO SECTION ================= */}
//         <header className="bg-brand-dark text-white pt-24 pb-20 px-6 text-center">
//           <div className="max-w-4xl mx-auto">
//             <span className="text-accent font-black uppercase tracking-widest text-xs">
//               Our Mission
//             </span>
//             <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tighter">
//               Digital <span className="text-accent">Empowerment</span> for every
//               Kenyan.
//             </h1>
//             <p className="text-text-header text-lg max-w-2xl mx-auto leading-relaxed">
//               Everything.co.ke was built to bridge the gap between complex
//               government portals and the everyday citizen. We make{" "}
//               <span className="text-accent font-bold">
//                 online cyber services in Kenya
//               </span>{" "}
//               accessible, fast, and secure.
//             </p>
//           </div>
//         </header>

//         {/* ================= CORE STATS ================= */}
//         <main className="max-w-6xl mx-auto px-4 -mt-10">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
//             <StatCard number="100%" label="Secure" />
//             <StatCard number="24/7" label="Support" />
//             <StatCard number="50k+" label="Served" />
//             <StatCard number="47" label="Counties" />
//           </div>

//           {/* ================= STORY / KEYWORDS SECTION ================= */}
//           <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
//             <article>
//               <h2 className="text-3xl font-black text-text-main mb-6 tracking-tight">
//                 Your Trusted Partner for{" "}
//                 <span className="text-accent">eCitizen Kenya</span> & More
//               </h2>
//               <div className="space-y-4 text-text-muted leading-relaxed">
//                 <p>
//                   Navigating the digital landscape in Kenya can be overwhelming.
//                   Whether it's
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     KRA services
//                   </span>
//                   ,
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     NTSA services
//                   </span>
//                   , or a
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     passport application in Kenya
//                   </span>
//                   , accuracy is the difference between success and a rejected
//                   application.
//                 </p>
//                 <p>
//                   At{" "}
//                   <span className="font-bold text-text-main">
//                     Everything.co.ke
//                   </span>
//                   , we specialize in professional
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     document processing services
//                   </span>
//                   . From{" "}
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     HELB assistance
//                   </span>{" "}
//                   for students to
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     business registration in Kenya
//                   </span>{" "}
//                   for entrepreneurs, our team handles the technicalities so you
//                   can focus on your goals.
//                 </p>
//                 <p>
//                   We aren't just a cyber café; we are a dedicated consultancy
//                   helping you secure your
//                   <span className="font-bold text-text-main">
//                     {" "}
//                     police clearance certificate
//                   </span>{" "}
//                   and manage your digital footprint reliably.
//                 </p>
//               </div>
//             </article>

//             <div className="bg-brand-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden">
//               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent opacity-10 blur-3xl" />
//               <h3 className="text-xl font-black mb-4">Why Choose Us?</h3>
//               <ul className="space-y-4">
//                 <li className="flex gap-3 items-start">
//                   <span className="text-accent font-bold">✓</span>
//                   <span>
//                     Expertise in all{" "}
//                     <span className="text-accent font-bold">
//                       online cyber services Kenya
//                     </span>{" "}
//                     requires.
//                   </span>
//                 </li>
//                 <li className="flex gap-3 items-start">
//                   <span className="text-accent font-bold">✓</span>
//                   <span>
//                     Strict data privacy protocols for your sensitive documents.
//                   </span>
//                 </li>
//                 <li className="flex gap-3 items-start">
//                   <span className="text-accent font-bold">✓</span>
//                   <span>
//                     Fast turnaround—most tasks done in under 60 minutes.
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* ================= CALL TO ACTION ================= */}
//           <section className="service-card p-10 text-center bg-white border-2 border-brand-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//             <h2 className="text-3xl font-black text-text-main mb-4">
//               Ready to get started?
//             </h2>
//             <p className="text-text-muted mb-8">
//               Experience the most reliable cyber services in Kenya today.
//             </p>
//             <a
//               href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
//               className="inline-block bg-accent text-white px-10 py-4 rounded-xl font-black hover:scale-[1.05] transition-transform shadow-lg"
//             >
//               Message Us on WhatsApp
//             </a>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// }

// function StatCard({ number, label }: { number: string; label: string }) {
//   return (
//     <div className="bg-white border-2 border-brand-dark p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
//       <div className="text-2xl md:text-3xl font-black text-accent">
//         {number}
//       </div>
//       <div className="text-xs uppercase font-bold text-text-muted tracking-widest">
//         {label}
//       </div>
//     </div>
//   );
// }

import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Everything.co.ke - Trusted Online Cyber Services in Kenya",
  description:
    "Learn how Everything.co.ke bridges the gap between government portals (KRA, NTSA, eCitizen) and Kenyan citizens with fast, secure document processing.",
  alternates: {
    canonical: "https://everything.co.ke/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

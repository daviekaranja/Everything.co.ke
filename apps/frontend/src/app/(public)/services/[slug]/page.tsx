// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import axiosClient from "@/lib/axios-client";
// import {
//   Check,
//   Clock,
//   Shield,
//   ArrowRight,
//   Info,
//   Fingerprint,
// } from "lucide-react";
// import { LinkButton } from "@/lib/components/ui/LinkButton";

// interface Props {
//   params: Promise<{ slug: string }>;
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;
//   try {
//     const { data: service } = await axiosClient.get(
//       `/services/by-slug/${slug}`,
//     );
//     return {
//       title: `${service.name} | Everything.co.ke`,
//       description: service.seoDescription,
//     };
//   } catch {
//     return { title: "Service Not Found" };
//   }
// }

// export default async function ServiceDetailPage({ params }: Props) {
//   const { slug } = await params;
//   let service;

//   try {
//     const response = await axiosClient.get(`/services/by-slug/${slug}`);
//     service = response.data;
//   } catch {
//     return notFound();
//   }

//   return (
//     <div className="bg-brand-bg dark:bg-brand-dark min-h-screen">
//       {/* 1. MINIMALIST HERO */}
//       <header className="pt-32 pb-20 border-b border-black/3 dark:border-white/3">
//         <div className="container-center max-w-6xl">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//             <div className="max-w-2xl">
//               <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-accent">
//                 <Fingerprint size={14} />
//                 <span>Verified Service / {service.provider}</span>
//               </div>
//               <h1 className="text-h1 tracking-[ -0.04em] leading-[0.95] mb-6">
//                 {service.name}
//               </h1>
//               <p className="text-text-muted  font-medium leading-relaxed">
//                 {service.description}
//               </p>
//             </div>

//             {/* Quick Stats Strip */}
//             <div className="flex gap-10 py-4 border-t border-black/5 dark:border-white/5 md:border-none">
//               <Stat label="Turnaround" value={service.estimatedTime} />
//               <Stat
//                 label="Total Cost"
//                 value={`KES ${service.pricing.total.toLocaleString()}`}
//                 isAccent
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* 2. LEAN GRID */}
//       <main className="container-center max-w-6xl py-20">
//         <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
//           {/* Left: Info Sections */}
//           <div className="lg:col-span-7 space-y-24">
//             {/* Requirements: Editorial List */}
//             <section>
//               <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-text-muted">
//                 Requirement Checklist
//               </h2>
//               <div className="space-y-0">
//                 {service.requirements?.map((req: string, i: number) => (
//                   <div
//                     key={i}
//                     className="group flex items-center justify-between py-6 border-b border-black/5 dark:border-white/5 last:border-none"
//                   >
//                     <span className="text-lg font-bold tracking-tight">
//                       {req}
//                     </span>
//                     <Check
//                       size={20}
//                       className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* FAQ: Clean Accordion */}
//             {service.faqs?.length > 0 && (
//               <section>
//                 <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-text-muted">
//                   Common Clarifications
//                 </h2>
//                 <div className="space-y-4">
//                   {service.faqs.map((faq: any, i: number) => (
//                     <details key={i} className="group cursor-pointer">
//                       <summary className="list-none flex items-center justify-between py-4 text-xl font-bold tracking-tight border-b border-black/3 dark:border-white/3">
//                         {faq.q}
//                         <ArrowRight
//                           size={18}
//                           className="group-open:rotate-90 transition-transform"
//                         />
//                       </summary>
//                       <p className="py-6 text-text-muted leading-relaxed font-medium max-w-xl">
//                         {faq.a}
//                       </p>
//                     </details>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* Right: Checkout Sidebar */}
//           <aside className="lg:col-span-5">
//             <div className="sticky top-32 space-y-12">
//               {/* Ultra-Lean Price Breakdown */}
//               <div className="space-y-8">
//                 <div className="space-y-4">
//                   <PriceLine
//                     label="Official Government Fee"
//                     amount={service.pricing.governmentFee}
//                   />
//                   <PriceLine
//                     label="EverythingKe Processing"
//                     amount={service.pricing.serviceFee}
//                   />
//                   <div className="pt-4 flex justify-between items-end">
//                     <span className="text-xs font-black uppercase tracking-widest">
//                       Grand Total
//                     </span>
//                     <span className="text-5xl font-black tracking-tighter">
//                       <span className="text-sm font-bold mr-2 text-accent">
//                         KES
//                       </span>
//                       {Number(service.pricing.total).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 <LinkButton
//                   href={`/checkout/personal-details?serviceId=${service.id}&slug=${service.slug}`}
//                   variant="main"
//                 >
//                   Proceed to Payment
//                 </LinkButton>
//               </div>

//               {/* Minimal Trust Indicator */}
//               <div className="pt-12 border-t border-black/5 dark:border-white/5 space-y-6">
//                 <div className="flex gap-4 items-start">
//                   <Info size={16} className="text-accent shrink-0 mt-1" />
//                   <p className="text-[11px] leading-relaxed text-text-muted font-bold uppercase tracking-wider">
//                     Our team provides real-time facilitation. After payment, you
//                     will be assigned a personal agent to manage the portal
//                     session and OTP verification.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-6">
//                   <div className="flex items-center gap-2">
//                     <Shield size={14} className="text-accent" />
//                     <span className="text-[10px] font-black uppercase tracking-tighter">
//                       Encrypted
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock size={14} className="text-accent" />
//                     <span className="text-[10px] font-black uppercase tracking-tighter">
//                       Fast-Track
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* --- LEAN UI HELPERS --- */

// function Stat({
//   label,
//   value,
//   isAccent,
// }: {
//   label: string;
//   value: string;
//   isAccent?: boolean;
// }) {
//   return (
//     <div>
//       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">
//         {label}
//       </p>
//       <p
//         className={`text-xl font-black tracking-tight ${isAccent ? "text-accent" : ""}`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function PriceLine({ label, amount }: { label: string; amount: number }) {
//   return (
//     <div className="flex justify-between items-center py-2 text-sm font-bold tracking-tight border-b border-black/3 dark:border-white/3">
//       <span className="text-text-muted">{label}</span>
//       <span>KES {Number(amount).toLocaleString()}</span>
//     </div>
//   );
// }

import { Metadata } from "next";
import { notFound } from "next/navigation";
import axiosClient from "@/lib/axios-client";
import {
  Check,
  Clock,
  Shield,
  ArrowRight,
  Info,
  Fingerprint,
} from "lucide-react";
import { LinkButton } from "@/lib/components/ui/LinkButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: service } = await axiosClient.get(
      `/services/by-slug/${slug}`,
    );
    return {
      title: `${service.name} | Everything.co.ke`,
      description: service.seoDescription,
    };
  } catch {
    return { title: "Service Not Found" };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  let service;

  try {
    const response = await axiosClient.get(`/services/by-slug/${slug}`);
    service = response.data;
  } catch {
    return notFound();
  }

  return (
    <div className="bg-brand-bg dark:bg-brand-dark min-h-screen pb-24 lg:pb-0">
      {/* 1. HERO - Adjusted padding for mobile */}
      <header className="pt-24 lg:pt-32 pb-12 lg:pb-20 border-b border-black/3 dark:border-white/3">
        <div className="container-center max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                <Fingerprint size={14} />
                <span>Verified Service / {service.provider}</span>
              </div>
              <h1 className="text-4xl lg:text-h1 tracking-[-0.04em] leading-[0.95] mb-6">
                {service.name}
              </h1>
              <p className="text-text-muted font-medium leading-relaxed text-sm lg:text-base">
                {service.description}
              </p>
            </div>

            {/* Quick Stats - No-wrap on mobile for better density */}
            <div className="flex gap-8 lg:gap-10 py-6 border-y border-black/5 dark:border-white/5 md:border-none">
              <Stat label="Turnaround" value={service.estimatedTime} />
              <Stat
                label="Total Cost"
                value={`KES ${service.pricing.total.toLocaleString()}`}
                isAccent
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main className="container-center max-w-6xl py-12 lg:py-20 px-4">
        {/* Mobile-Only Pricing Summary (Saves the user from scrolling to the end to see the split) */}
        <div className="lg:hidden mb-12 p-6 bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl border border-black/5 dark:border-white/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-text-muted">
            Fee Breakdown
          </h3>
          <PriceLine
            label="Government Fee"
            amount={service.pricing.governmentFee}
          />
          <PriceLine label="Service Fee" amount={service.pricing.serviceFee} />
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-black uppercase">Total</span>
            <span className="text-2xl font-black text-accent">
              KES {service.pricing.total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left: Info Sections */}
          <div className="lg:col-span-7 space-y-16 lg:space-y-24">
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 lg:mb-10 text-text-muted">
                Requirement Checklist
              </h2>
              <div className="space-y-0">
                {service.requirements?.map((req: string, i: number) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between py-4 lg:py-6 border-b border-black/5 dark:border-white/5 last:border-none"
                  >
                    <span className="text-base lg:text-lg font-bold tracking-tight">
                      {req}
                    </span>
                    <Check
                      size={18}
                      className="text-accent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </section>

            {service.faqs?.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 lg:mb-10 text-text-muted">
                  Common Clarifications
                </h2>
                <div className="space-y-2">
                  {service.faqs.map((faq: any, i: number) => (
                    <details key={i} className="group cursor-pointer">
                      <summary className="list-none flex items-center justify-between py-4 text-lg lg:text-xl font-bold tracking-tight border-b border-black/3 dark:border-white/3">
                        {faq.q}
                        <ArrowRight
                          size={18}
                          className="group-open:rotate-90 transition-transform"
                        />
                      </summary>
                      <p className="py-6 text-text-muted leading-relaxed font-medium max-w-xl text-sm lg:text-base">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Checkout Sidebar - Hidden on mobile, fixed on desktop */}
          <aside className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <PriceLine
                    label="Official Government Fee"
                    amount={service.pricing.governmentFee}
                  />
                  <PriceLine
                    label="EverythingKe Processing"
                    amount={service.pricing.serviceFee}
                  />
                  <div className="pt-4 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest">
                      Grand Total
                    </span>
                    <span className="text-5xl font-black tracking-tighter">
                      <span className="text-sm font-bold mr-2 text-accent">
                        KES
                      </span>
                      {Number(service.pricing.total).toLocaleString()}
                    </span>
                  </div>
                </div>

                <LinkButton
                  href={`/checkout/personal-details?serviceId=${service.id}&slug=${service.slug}`}
                  variant="main"
                >
                  Proceed to Payment
                </LinkButton>
              </div>

              <TrustBox />
            </div>
          </aside>
        </div>
      </main>

      {/* 3. MOBILE STICKY FOOTER - Constant CTA for mobile users */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-t border-black/5 dark:border-white/5 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
              Total
            </span>
            <span className="text-lg font-black tracking-tighter text-accent">
              KES {service.pricing.total.toLocaleString()}
            </span>
          </div>
          <LinkButton
            href={`/checkout/personal-details?serviceId=${service.id}&slug=${service.slug}`}
            variant="main"
            className="flex-1 shadow-xl"
          >
            Apply Now
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

/* --- LEAN UI HELPERS --- */

function TrustBox() {
  return (
    <div className="pt-12 border-t border-black/5 dark:border-white/5 space-y-6">
      <div className="flex gap-4 items-start">
        <Info size={16} className="text-accent shrink-0 mt-1" />
        <p className="text-[11px] leading-relaxed text-text-muted font-bold uppercase tracking-wider">
          Our team provides real-time facilitation. After payment, you will be
          assigned a personal agent to manage the portal session and OTP
          verification.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-accent" />
          <span className="text-[10px] font-black uppercase tracking-tighter">
            Encrypted
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-accent" />
          <span className="text-[10px] font-black uppercase tracking-tighter">
            Fast-Track
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  isAccent,
}: {
  label: string;
  value: string;
  isAccent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-black tracking-tight ${isAccent ? "text-accent" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function PriceLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between items-center py-2 text-sm font-bold tracking-tight border-b border-black/3 dark:border-white/3">
      <span className="text-text-muted">{label}</span>
      <span>KES {Number(amount).toLocaleString()}</span>
    </div>
  );
}

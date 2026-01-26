"use client";

import React, { useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { services } from "@/lib/data/services";
import CheckoutForm from "@/lib/components/services/checkoutForm";
import { ShieldCheck, Lock } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("service");

  const service = useMemo(() => {
    if (!slug) {
      return null;
    }
    return services.find((s) => s.slug === slug);
  }, [slug]);

  useEffect(() => {
    // Redirect if the slug is present but the service is not found.
    // The `slug !== null` check prevents redirecting on the initial render
    // before the search params have been read.
    if (slug !== null && !service) {
      router.replace("/services");
    }
  }, [slug, service, router]);

  if (!service) return null;

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
      {/* LEFT COLUMN: Trust & Context (Hidden on small mobile, visible on tablet+) */}
      <div className="hidden lg:flex flex-col space-y-8 pr-12 border-r border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Secure Checkout
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            You are applying for{" "}
            <span className="text-accent font-bold">{service.name}</span>.
            Follow the steps to complete your application safely.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Data Encryption
              </h4>
              <p className="text-sm text-slate-500">
                Your personal details are processed using end-to-end 256-bit
                encryption.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0 text-green-600">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Verified Payments
              </h4>
              <p className="text-sm text-slate-500">
                Official M-Pesa STK Push ensures your payment goes directly to
                the service provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Form (Full width on mobile) */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CheckoutForm service={service} />

        {/* Mobile-only Footer trust badges */}
        <div className="lg:hidden mt-8 flex flex-col items-center gap-4 text-slate-400">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Lock size={12} /> Secure 256-bit SSL Connection
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0F1A] pt-10 md:pt-20 pb-24 px-4 md:px-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </main>
  );
}

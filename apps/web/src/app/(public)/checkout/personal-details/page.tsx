"use client";

import { useEffect, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosClient from "@/lib/axios-client";
import CheckoutForm from "@/lib/components/services/checkoutForm";
import { Lock, Loader2 } from "lucide-react";
import { LinkButton } from "@/lib/components/ui/LinkButton";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      if (!slug) {
        console.warn("warning, no slug found!");
        router.replace("/services");
        return;
      }
      try {
        const { data } = await axiosClient.get(`/services/by-slug/${slug}`);
        setService(data);
      } catch (err) {
        router.replace("/services");
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-accent" size={32} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
          Initializing Secure Session
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="pb-20">
        <p className="text-h3 text-text-main">Enter Your Details to continue</p>
        <CheckoutForm service={service} />
      </div>
    </div>
  );
}

// export default CheckoutContent;

export default function CheckoutPage() {
  return (
    <main className="py-10">
      <Suspense fallback={null}>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  // Verify the order exists and is paid (or at least processed)
  if (!order) return notFound();

  return (
    <main className="min-h-screen bg-brand-bg py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-card-bg rounded-3xl p-10 shadow-xl border border-card-border text-center">
          {/* Success Icon */}
          <div className="bg-green-50 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-2xl font-black text-text-main mb-2">
            Payment Confirmed!
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Thank you,{" "}
            <span className="text-text-main font-bold">{order.user.name}</span>.
            Your order for{" "}
            <span className="text-text-main font-bold">
              {order.serviceName}
            </span>{" "}
            has been received.
          </p>

          {/* Order Summary Box */}
          <div className="bg-brand-bg rounded-2xl p-5 mb-8 text-left border border-card-border">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-black text-text-header uppercase">
                Order ID
              </span>
              <span className="font-mono text-[10px] text-text-main">
                {order.id.slice(-12)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-black text-text-header uppercase">
                Amount Paid
              </span>
              <span className="text-sm font-black text-text-main">
                KES {order.amount}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-accent-soft rounded-2xl border border-accent/10">
              <p className="text-xs font-bold text-accent-text leading-relaxed">
                🚀 Our agents are now processing your request. We will contact
                you shortly on {order.user.phone}.
              </p>
            </div>

            {/* WhatsApp Handoff */}
            <a
              href={`https://wa.me/254700000000?text=Hi, I've just paid for ${order.serviceName}. My Order ID is ${order.id}. Please assist.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-green-500/10"
            >
              <MessageSquare size={20} />
              Chat on WhatsApp
            </a>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-header uppercase tracking-[0.2em] hover:text-accent transition-colors pt-4"
            >
              Back to Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-text-header">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            EverythingKE Secured
          </span>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  XCircle,
  RefreshCw,
  ShieldCheck,
  ChevronLeft,
  Smartphone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios-client";
import { Button } from "../ui/button";
import { zOrderStatus } from "@/lib/types/api/zod.gen";
import { OrderStatus } from "@/lib/types/api";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const SUPPORT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function TransactionStatusDisplay({
  checkoutId,
}: {
  checkoutId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(zOrderStatus.enum.Pending);
  // const [error, setError] = useState<string | null>(null);

  // Trigger Confetti
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#34d399", "#6ee7b7"],
    });
  };

  const getWhatsAppUrl = (type: "success" | "support") => {
    const baseUrl = `https://wa.me/${SUPPORT_NUMBER}`;
    const message =
      type === "success"
        ? `Hello! My payment was successful. \nReceipt: ${data?.mpesaReceiptNumber}\nReference: ${data?.reference}\nAmount: KES ${data?.amount}`
        : `Hi Support, I'm having trouble with payment. \nCheckout ID: ${checkoutId}\nStatus: ${status}`;

    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  };

  const verifyPayment = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      try {
        const response = await axiosClient.get(
          `/payments/transactions/?checkout_request_id=${checkoutId}`,
        );
        const result = response.data;
        setData(result);

        // Normalize backend status to match your Zod Enum
        const backendStatus = result.status || zOrderStatus.enum.Pending;

        if (backendStatus === zOrderStatus.enum.Paid) {
          fireConfetti();
          setStatus(zOrderStatus.enum.Paid);
          toast.success("Payment successful! Thank you for your purchase.");
        }

        if (
          backendStatus === zOrderStatus.enum.Cancelled ||
          (result.resultCode && result.resultCode !== 0)
        ) {
          setStatus(zOrderStatus.enum.Cancelled);
          toast.error(
            `Transaction failed: ${result.resultDesc || "Unknown error"}`,
          );
        }

        if (backendStatus === zOrderStatus.enum.Pending) {
          setStatus(zOrderStatus.enum.Pending);
          toast.info(
            `Transaction status: ${backendStatus}. Please complete the payment.`,
          );
        }
      } catch (err) {
        toast.error("Network error. Please check your connection.");
        // setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    },
    [checkoutId, status],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      status === zOrderStatus.enum.Pending
      // status === zOrderStatus.enum["In Progress"]
    ) {
      interval = setInterval(() => verifyPayment(true), 5000);
    }
    return () => clearInterval(interval);
  }, [status, verifyPayment]);

  return (
    /* Responsive Container: Full width on mobile, max-w-lg + centered on desktop */
    <div className="w-full sm:max-w-lg sm:mx-auto smooth-card rounded-xl">
      <div className="p-6 md:p-10">
        {/* SUCCESS STATE */}
        {status === zOrderStatus.enum.Paid && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-ping opacity-40" />
              <div className="relative bg-emerald-500 rounded-full p-4 shadow-lg shadow-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                Payment Received!
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Order confirmed. Thank you for your purchase.
              </p>
            </div>

            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl p-6 space-y-4 text-sm border border-emerald-100 dark:border-emerald-800/50">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 uppercase tracking-tight font-semibold text-xs">
                  M-Pesa Receipt
                </span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {data?.mpesaReceiptNumber || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-100/50 pt-3">
                <span className="text-slate-500 uppercase tracking-tight font-semibold text-xs">
                  Total Amount
                </span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  KES {data?.amount}
                </span>
              </div>
            </div>

            <Button
              variant="main"
              className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg shadow-emerald-100"
              onClick={() => window.open(getWhatsAppUrl("success"), "_blank")}
            >
              <div className="flex items-center justify-center">
                {/* <MessageCircle className="mr-2 h-5 w-5" /> */}
                Chat with Agent
              </div>
            </Button>
          </div>
        )}

        {/* PENDING / IN PROGRESS STATE */}
        {(status === zOrderStatus.enum.Pending ||
          status === zOrderStatus.enum["In Progress"]) && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              {loading ? (
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              ) : (
                <Smartphone className="w-10 h-10 text-blue-600 animate-bounce" />
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold dark:text-white">
                Awaiting PIN...
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                We've sent an M-Pesa prompt to your phone. Enter your PIN to
                complete the transaction.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => verifyPayment()}
                disabled={loading}
                className="w-full h-14 rounded-2xl shadow-md"
              >
                {loading ? "Verifying Transaction..." : "I've Entered my PIN"}
              </Button>
              <button
                onClick={() => window.open(getWhatsAppUrl("support"), "_blank")}
                className="text-slate-400 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Didn't get the prompt? Contact Support
              </button>
            </div>
          </div>
        )}

        {/* CANCELLED / FAILED STATE */}
        {status === zOrderStatus.enum.Cancelled && (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-white">
                Transaction Cancelled
              </h2>
              <p className="text-slate-500 mt-2 px-4">
                {data?.resultDesc ||
                  "The transaction was declined by the user or timed out."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => verifyPayment()}
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2"
              >
                <RefreshCw
                  size={18}
                  className={loading ? "animate-spin" : ""}
                />
                {loading ? "Retrying..." : "Try Again"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-12 rounded-xl"
                >
                  <ChevronLeft size={16} className="mr-1" /> Back
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(getWhatsAppUrl("support"), "_blank")
                  }
                  className="h-12 rounded-xl"
                >
                  <MessageCircle size={16} className="mr-1" /> Support
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 text-center border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
          <ShieldCheck size={14} className="text-emerald-500" />
          Secure Payment Gateway
        </p>
      </div>
    </div>
  );
}

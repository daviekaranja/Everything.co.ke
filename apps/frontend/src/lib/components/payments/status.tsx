"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  Loader2,
  XCircle,
  RefreshCw,
  ShieldCheck,
  ChevronLeft,
  Smartphone,
  MessageCircle, // WhatsApp Icon
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios-client";
import { Button } from "../ui/button";

// Configuration for WhatsApp
const SUPPORT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // Replace with your actual number

export default function TransactionStatusDisplay({
  checkoutId,
}: {
  checkoutId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "initial" | "checking" | "success" | "failed" | "pending"
  >("initial");
  const [error, setError] = useState<string | null>(null);

  const getWhatsAppUrl = (type: "success" | "support") => {
    const baseUrl = `https://wa.me/${SUPPORT_NUMBER}`;
    const message =
      type === "success"
        ? `Hello! My payment was successful. \nReceipt: ${data?.mpesaReceiptNumber}\nReference: ${data?.reference}\nAmount: KES ${data?.amount}`
        : `Hi Support, I'm having trouble with payment. \nCheckout ID: ${checkoutId}\nStatus: ${data?.status || "Unknown"}`;

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

        const currentStatus = result.status?.toLowerCase();

        if (
          currentStatus === "paid" ||
          currentStatus === "completed" ||
          result.resultCode === 0
        ) {
          setStatus("success");
        } else if (
          currentStatus === "cancelled" ||
          (result.resultCode && result.resultCode !== 0)
        ) {
          setStatus("failed");
        } else if (
          currentStatus === "pending" ||
          currentStatus === "in progress"
        ) {
          setStatus("pending");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    },
    [checkoutId],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "pending") {
      interval = setInterval(() => verifyPayment(true), 5000);
    }
    return () => clearInterval(interval);
  }, [status, verifyPayment]);

  return (
    <div className="w-full max-w-lg mx-auto dark:bg-brand-dark  rounded-[2.5rem] overflow-hidden shadow-sm dark:border-slate-800">
      <div className="p-4 md:p-8">
        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20" />
            </div>

            <div>
              <h1 className="text-3xl font-black text-accent dark:text-white">
                Payment Received!
              </h1>
              <p className="text-slate-500 mt-2">
                Your order is being processed.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 space-y-3 text-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt</span>
                <span className="font-mono font-bold">
                  {data?.mpesaReceiptNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount</span>
                <span className="font-bold">KES {data?.amount}</span>
              </div>
            </div>

            <Button
              variant="main"
              onClick={() => window.open(getWhatsAppUrl("success"), "_blank")}
              // className="w-full h-16 rounded-2xl  text-white border-none text-lg shadow-xl shadow-green-100"
            >
              Chat with Agent
            </Button>
          </div>
        )}

        {/* PENDING STATE */}
        {status === "pending" || status === "initial" ? (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              {loading ? (
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              ) : (
                <Smartphone className="w-10 h-10 text-blue-600 animate-bounce" />
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Awaiting Payment...</h2>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Please check your phone for the M-Pesa popup. Once paid, we'll
                automatically redirect you.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => verifyPayment()}
                disabled={loading}
                className="w-full h-14 rounded-2xl"
              >
                {loading ? "Verifying..." : "I've Entered my PIN"}
              </Button>
              <button
                onClick={() => window.open(getWhatsAppUrl("support"), "_blank")}
                className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
              >
                Didn't get the prompt? Contact Support
              </button>
            </div>
          </div>
        ) : null}

        {/* FAILED STATE */}
        {status === "failed" && (
          <div className="text-center space-y-8">
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold">Payment Not Successful</h2>
              <p className="text-slate-500 mt-2 px-4">
                {data?.resultDesc ||
                  "The transaction was declined or timed out."}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <Button
                onClick={() => verifyPayment()}
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2"
              >
                <div className="flex  gap-4 justify-center items-center">
                  <RefreshCw size={18} /> Try Again
                </div>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-12 rounded-xl"
                >
                  <div className="flex justify-center items-center gap-4">
                    <ChevronLeft size={16} className="mr-1" /> Back
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(getWhatsAppUrl("support"), "_blank")
                  }
                >
                  <div className="flex justify-center items-center gap-4">
                    <MessageCircle size={16} className="mr-1" /> Support
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 text-center border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
          <ShieldCheck size={12} className="text-emerald-500" /> 256-bit Secure
          Transaction
        </p>
      </div>
    </div>
  );
}

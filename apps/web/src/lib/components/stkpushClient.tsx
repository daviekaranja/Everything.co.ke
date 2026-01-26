"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendSTKPushAction, verifyPaymentStatus } from "@/lib/actions/mpesa";
import {
  Smartphone,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

type PaymentFormData = {
  phoneNumber: string;
};

type STKPushClientProps = {
  orderId: string;
  amount: number;
  phone: string;
  serviceName: string;
};

export default function STKPushClient({
  orderId,
  amount,
  phone,
  serviceName,
}: STKPushClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "failed"
  >("idle");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: { phoneNumber: phone },
  });

  const onSubmit = async (data: PaymentFormData) => {
    setErrorMessage("");
    setStatus("submitting");
    const result = await sendSTKPushAction(orderId, data.phoneNumber, amount);
    if (result.success) setStatus("sent");
    else {
      setStatus("idle");
      setErrorMessage(result.message || "Failed to trigger M-Pesa");
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setErrorMessage("");
    const res = await verifyPaymentStatus(orderId);

    if (res.success) {
      router.push(`/checkout/success?orderId=${orderId}`);
    } else {
      setIsVerifying(false);
      // If payment is actually FAILED in DB, or hasn't hit yet
      setErrorMessage(res.message || "Payment not detected yet.");
      if (res.message?.toLowerCase().includes("failed")) {
        setStatus("failed");
      }
    }
  };

  // SENT OR FAILED STATE UI
  if (status === "sent" || status === "failed") {
    return (
      <div className="bg-card-bg p-8 rounded-3xl shadow-xl border border-card-border text-center animate-in fade-in zoom-in duration-300">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            status === "failed"
              ? "bg-red-50 text-red-500"
              : "bg-accent-soft text-accent"
          }`}
        >
          {status === "failed" ? (
            <AlertCircle size={32} />
          ) : (
            <Smartphone className="animate-pulse" size={32} />
          )}
        </div>

        <h2 className="text-xl font-black mb-2 text-text-main">
          {status === "failed" ? "Payment Failed" : "PIN Prompt Sent"}
        </h2>

        <p className="text-sm text-text-muted mb-6 px-4">
          {status === "failed"
            ? "Your transaction could not be completed. Please check your balance and try again."
            : `Enter your PIN on the phone associated with ${phone} for KES ${amount}.`}
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-[10px] font-black uppercase rounded-xl flex items-center justify-center gap-2">
            <AlertCircle size={14} /> {errorMessage}
          </div>
        )}

        <div className="space-y-3">
          {status === "sent" ? (
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "I have entered my PIN"
              )}
            </button>
          ) : (
            <button
              onClick={() => setStatus("idle")}
              className="w-full bg-brand-dark text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Try Again
            </button>
          )}

          {/* <a
            href={`https://wa.me/254700000000?text=Hello, I need help with my Order: ${orderId}`}
            className="w-full border border-card-border text-text-main py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-bg transition-all text-xs"
          >
            <MessageSquare size={18} className="text-[#25D366]" /> Chat on
            WhatsApp
          </a> */}
        </div>
      </div>
    );
  }

  // IDLE / SUBMITTING STATE UI
  return (
    <div className="bg-card-bg p-8 rounded-3xl shadow-xl border border-card-border">
      {/* ... Order Summary remains the same ... */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-accent">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest text-left">
            Order Summary
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-card-border pb-6 text-left">
          <div>
            <p className="text-[10px] text-text-header font-black uppercase">
              Service
            </p>
            <p className="font-bold text-text-main text-sm">{serviceName}</p>
          </div>
          <div>
            <p className="text-[10px] text-text-header font-black uppercase">
              Order ID
            </p>
            <p className="font-mono text-[10px] text-text-main">
              {orderId.slice(-12)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-text-muted text-xs font-bold uppercase tracking-tight">
            Total Amount
          </span>
          <span className="text-2xl font-black text-text-main underline decoration-accent-soft decoration-4">
            KES {amount}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
        <div>
          <label className="block text-[10px] font-black text-text-header uppercase mb-2 tracking-widest">
            M-Pesa Number
          </label>
          <div className="relative">
            <Smartphone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />
            <input
              {...register("phoneNumber", {
                required: "Phone is required",
                pattern: {
                  value: /^(07|01|254)\d{8}$/,
                  message: "Invalid Kenyan number",
                },
              })}
              className={`w-full bg-brand-bg border ${
                errors.phoneNumber ? "border-red-500" : "border-card-border"
              } px-12 py-4 rounded-xl font-bold text-text-main focus:ring-2 focus:ring-accent outline-none transition-all`}
              placeholder="07XXXXXXXX"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-[10px] mt-1 font-black uppercase tracking-tighter">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-brand-dark dark:bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-accent/10"
        >
          {status === "submitting" ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>Pay KES {amount}</>
          )}
        </button>
      </form>
    </div>
  );
}

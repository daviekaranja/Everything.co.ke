"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { zStkRequest } from "@/lib/types/api/zod.gen";
import {
  Loader2,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import axiosClient from "@/lib/axios-client";

// Move schemas outside to prevent re-renders
const stkSchema = z.object({
  phone: z
    .string()
    .regex(/^(?:254|\+254|0)?(7|1)[0-9]{8}$/, "Enter a valid M-Pesa number"),
});

type FormData = z.infer<typeof stkSchema>;

export default function StkPushForm({ trustData }: { trustData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(stkSchema),
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      phone: data.phone,
      amount: trustData.amount,
      reference: trustData.serviceName,
      description: trustData.orderId,
    };
    const parsed = zStkRequest.safeParse(payload);
    if (!parsed.success) {
      console.error("Invalid payload", parsed.error);
      return;
    }

    setIsSubmitting(true);
    try {
      // Logic for API call (e.g., fetch('/api/stk-push', ...))
      // Optimization: Using native fetch over axios for smaller bundle size

      const res = await axiosClient.post("/payments/stk-push", parsed.data);
      const result = res.data;
      if (result.checkoutRequestId) {
        router.push(
          `/checkout/success?checkoutRequestid=${result.checkoutRequestId}`,
        );
      }
    } catch (e) {
      console.error("Payment failed", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* TRANSACTIONAL BLUEPRINT: Lead with Summary */}
      <section aria-label="Order Summary">
        <div className=" shadow-sm p-4 bg-brand-bg dark:bg-brand-dark rounded-2xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-h3  tracking-tight">
              Payment for {trustData.serviceName}
            </h1>
            {/* <CheckCircle2 size={14} className="text-green-500" /> */}
          </div>
          <div className="flex justify-between items-end border-t border-black/5 pt-6">
            <span className="text-[10px] font-black uppercase text-gray-400">
              Total to Pay
            </span>
            <span className="text-h3 font-black tracking-tighter">
              <span className="text-sm mr-1">KES</span>
              {trustData.amount.toLocaleString()}
            </span>
          </div>

          {/* <div className="flex justify-between items-end border-t border-black/5 pt-6"> */}
          <section aria-label="Payment Form">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-600 mb-4">
              <ShieldCheck size={14} className="text-accent" />
              <span className="text-emerald-600">Secure M-Pesa Node</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-[10px] font-black uppercase tracking-widest text-gray-400"
                >
                  M-Pesa Number
                </label>
                <div className="relative border-b border-black/10 dark:border-white/10 focus-within:border-black transition-all">
                  <input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full bg-transparent py-4 text-h3 font-black tracking-tighter outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center items-center mb-4">
                <Button type="submit">
                  <div className="flex justify-center items-center">
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Initiate Payment <ChevronRight size={16} />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </section>
        </div>

        {/* one full card */}
      </section>

      {/* INTERACTION SECTION */}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Service } from "@/lib/data/services";
// import { processOrderAction } from "@/app/actions/orders"; // Importing our DB action
import { processOrderAction } from "@/lib/actions/orders";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Full legal name as per ID is required"),
  email: z.string().email("Please provide a valid email"),
  phone: z
    .string()
    .regex(/^(?:254|\+254|0)?(7|1)[0-9]{8}$/, "Enter a valid phone number"),
  contactMethod: z.enum(["whatsapp", "call", "email"]),
});

type FormData = z.infer<typeof formSchema>;

export default function CheckoutForm({ service }: { service: Service }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { contactMethod: "whatsapp" },
  });

  const selectedMethod = useWatch({ control, name: "contactMethod" });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      // 1. Call the Server Action to save User + Order to SQLite
      const result = await processOrderAction({
        ...data,
        serviceName: service.name,
        amount: parseFloat(service.pricing.total.toString()),
      });

      if (result.success) {
        // 2. Success! Redirect to the STK Push Awaiting Page
        // We pass the orderId so the next page knows which transaction to track
        router.push(`/checkout/stk-push?orderId=${result.orderId}`);
      } else {
        // Handle database or logic errors
        alert(result.message || "Failed to process request. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <header className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Personal <span className="text-accent">Details</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Step 1: Secure your application profile.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-green-100 dark:border-green-900/30">
              <Lock size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Secure SSL
              </span>
            </div>
          </header>

          <div className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <User size={12} className="text-accent" /> Full Name (As per ID)
              </label>
              <input
                {...register("name")}
                placeholder="Davie Karanja"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-xl text-base font-medium transition-all focus:ring-2 focus:ring-accent/20 outline-none dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle size={10} /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Mail size={12} className="text-accent" /> Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="karanja@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-xl text-base font-medium transition-all focus:ring-2 focus:ring-accent/20 outline-none dark:text-white"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Phone size={12} className="text-accent" /> Phone Number
                </label>
                <input
                  {...register("phone")}
                  placeholder="07XX XXX XXX"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-xl text-base font-medium transition-all focus:ring-2 focus:ring-accent/20 outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Contact Method Selector */}
            <div className="pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                Preferred Contact Channel
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: "whatsapp",
                    label: "WhatsApp",
                    icon: <MessageSquare size={16} />,
                  },
                  {
                    id: "call",
                    label: "Voice Call",
                    icon: <Phone size={16} />,
                  },
                  { id: "email", label: "Email", icon: <Mail size={16} /> },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedMethod === method.id
                        ? "border-accent bg-accent/5 text-accent shadow-sm"
                        : "border-slate-200 dark:border-slate-700 bg-transparent text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      className="hidden"
                      {...register("contactMethod")}
                    />
                    {method.icon}
                    <span className="text-[9px] font-black uppercase mt-2">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                Total Amount
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                KES {service.pricing.total}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-dark dark:bg-accent text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Continue <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios-client";
import { Input } from "../ui/Input";
import { AlertCircle } from "lucide-react";
import { zUserCreateSchema } from "@/lib/types/api/zod.gen";
import { ServiceRead } from "@/lib/types/api";
import { Button } from "../ui/button";

// Matching your API schema exactly

type FormData = z.infer<typeof zUserCreateSchema>;

export default function CheckoutForm({ service }: { service: ServiceRead }) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zUserCreateSchema),
    defaultValues: { contactMethod: "whatsapp" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError(null);

    try {
      // POST to your FastAPI endpoint
      const response = await axiosClient.post("/users/register", data);

      if (response.data?.id || response.data?.success) {
        // Redirect to M-Pesa tracking page
        const orderData = {
          userId: response.data.id,
          serviceId: service.id,
          name: service.name,
          amount: service.pricing.serviceFee,
        };

        const { data } = await axiosClient.post("/orders/create", orderData);
        if (!data) {
          throw new Error("Failed to create order");
        }

        router.push(
          `/checkout/stk-push?serviceId=${service.id}&orderId=${data.id}&serviceName=${data.name}&amount=${data.amount}`,
        );
      }
    } catch (error: any) {
      setServerError(
        error.response?.data?.detail || "Connection failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 shadow-sm bg-brand-bg border border-card-border rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section id="fullname">
          <p className="text-h3 text-text-main">Personal Details</p>
          <div className="flex gap-2 justify-between">
            <Input
              label="First Name"
              placeholder="e.g. John"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Second Name"
              placeholder="e.g. Doe"
              {...register("secondName")}
              error={errors.secondName?.message}
            />
          </div>
        </section>

        {/* SECTION 2: COMMUNICATION */}
        <section className="space-y-6">
          <p className="text-h3 text-text-main">Contact Channels</p>

          <section id="contact">
            <div className="flex gap-4">
              <Input
                label="Email Address"
                placeholder="user@example.com"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Cell"
                placeholder="0700 000 000"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
            </div>
          </section>
        </section>

        {/* ERROR HANDLING */}
        {serverError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-bold">
            <AlertCircle size={16} />
            {serverError}
          </div>
        )}
        <div className="flex py-4 justify-center">
          <Button>
            Confirm & Pay KES {service?.pricing?.serviceFee?.toLocaleString()}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* --- REFINED UI SUB-COMPONENTS --- */

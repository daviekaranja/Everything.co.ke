import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
// import StkPushForm from "./StkPushForm";
import StkPushForm from "@/lib/components/payments/stkpushform";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const serviceName = (params.serviceName as string) || "Secure Payment";

  return {
    title: `Pay for ${serviceName} | Secure M-Pesa Checkout`,
    description: `Complete your payment for ${serviceName} securely via M-Pesa. Fast, encrypted, and verified transactions.`,
    alternates: { canonical: "https://everything.co.ke/checkout/stk-push" },
    robots: { index: false }, // Transactional pages usually shouldn't be indexed to avoid thin content
  };
}

export default async function StkPushPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Server-side validation of intent
  if (!params.serviceId || !params.amount || !params.orderId) {
    return notFound();
  }

  const trustData = {
    serviceId: String(params.serviceId),
    serviceName: String(params.serviceName),
    orderId: String(params.orderId),
    amount: Number(params.amount),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    name: `Checkout for ${trustData.serviceName}`,
    description: "Secure mobile payment gateway",
  };

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col bg-brand-bg dark:bg-brand-dark text-text-main p-2 md:p-6 transition-all duration-300 items-center"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-md mx-auto">
        <Suspense
          fallback={
            <div className="animate-pulse h-64 bg-gray-200 rounded-4xl" />
          }
        >
          <StkPushForm trustData={trustData} />
        </Suspense>
      </div>
    </main>
  );
}

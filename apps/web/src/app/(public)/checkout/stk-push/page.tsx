import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
// import STKPushClient from "./STKPushClient";
import STKPushClient from "@/lib/components/stkpushClient";

export default async function STKPushPage({
  searchParams,
}: {
  // 1. Update the type to wrap in a Promise
  searchParams: Promise<{ orderId?: string }>;
}) {
  // 2. Await the searchParams before accessing properties
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId;

  if (!orderId) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-brand-dark py-12 px-4">
      <div className="max-w-md mx-auto">
        <STKPushClient
          orderId={order.id}
          amount={order.amount}
          phone={order.user.phone}
          serviceName={order.serviceName}
        />
      </div>
    </main>
  );
}

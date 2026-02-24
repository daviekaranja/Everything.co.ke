import { notFound } from "next/navigation";
import TransactionStatusDisplay from "@/lib/components/payments/status";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkoutRequestid?: string }>;
}) {
  const { checkoutRequestid } = await searchParams;

  if (!checkoutRequestid) return notFound();

  return (
    <div className="w-full flex justify-center py-12">
      <TransactionStatusDisplay checkoutId={checkoutRequestid} />
    </div>
  );
}

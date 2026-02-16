import { notFound } from "next/navigation";
// import TransactionStatusDisplay from "@/components/TransactionStatusDisplay";
import TransactionStatusDisplay from "@/lib/components/payments/status";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkoutRequestid?: string }>;
}) {
  const { checkoutRequestid } = await searchParams;

  if (!checkoutRequestid) return notFound();

  return (
    <div className="flex flex-col items-center p-4 justify-center min-h-screen mx-auto w-full md:w-1/4">
      <TransactionStatusDisplay checkoutId={checkoutRequestid} />
    </div>
  );
}

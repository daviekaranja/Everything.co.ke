import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = body.Body.stkCallback;

  console.log("M-Pesa STK Callback Received:", body);

  // CheckoutRequestID links the callback to our Order in SQLite
  const checkoutId = result.CheckoutRequestID;

  if (result.ResultCode === 0) {
    // Payment Successful!
    await prisma.order.update({
      where: { checkoutId: checkoutId },
      data: { status: "PAID" },
    });
    console.log(`✅ Order ${checkoutId} marked as PAID`);
  } else {
    // Payment Failed (e.g., Insufficient funds or cancelled)
    await prisma.order.update({
      where: { checkoutId: checkoutId },
      data: { status: "FAILED" },
    });
    console.log(`❌ Order ${checkoutId} FAILED: ${result.ResultDesc}`);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}

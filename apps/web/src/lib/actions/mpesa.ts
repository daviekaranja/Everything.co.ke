"use server";

import { initiateSTKPush } from "@/lib/mpesa";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to trigger M-Pesa STK Push
 * @param orderId - The CUID of the order from SQLite
 * @param phone - The M-Pesa number entered in the RHF
 * @param amount - The float amount to be charged
 */
export async function sendSTKPushAction(
  orderId: string,
  phone: string,
  amount: number
) {
  try {
    // 1. Call the Daraja API helper
    // This helper handles the OAuth Token and the actual Fetch to Safaricom
    const response = await initiateSTKPush(phone, amount, orderId);

    // 2. Check if Safaricom accepted the request
    // ResultCode "0" means the request was accepted and the prompt is being sent
    if (response.ResponseCode === "0") {
      // 3. Update the Order in SQLite
      // We store the CheckoutRequestID to link the future M-Pesa Callback to this Order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          checkoutId: response.CheckoutRequestID,
          status: "AWAITING_PIN", // Optional: Add this to your Enum/String to track progress
        },
      });

      return {
        success: true,
        message: "STK Push initiated successfully",
        checkoutId: response.CheckoutRequestID,
      };
    } else {
      // Handle cases where Safaricom rejects the request (e.g., invalid phone format)
      return {
        success: false,
        message:
          response.ResponseDescription || "Safaricom rejected the request",
      };
    }
  } catch (error) {
    console.error("MPESA_STK_PUSH_ERROR:", error);
    return {
      success: false,
      message: "Internal server error. Could not connect to M-Pesa.",
    };
  }
}

// app/actions/mpesa.ts
export async function verifyPaymentStatus(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (order?.status === "PAID") return { success: true };
  if (order?.status === "FAILED")
    return { success: false, message: "Payment failed or cancelled." };
  return { success: false, message: "Payment still pending..." };
}

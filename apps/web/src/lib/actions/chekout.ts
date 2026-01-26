"use server";

import { prisma } from "@/lib/prisma";

export async function handleCheckout(formData: {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  amount: number;
  contactMethod: string;
}) {
  try {
    // 1. Identify or Create User (Pure Data Logic)
    const user = await prisma.user.upsert({
      where: { email: formData.email },
      update: { phone: formData.phone, name: formData.name },
      create: {
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
      },
    });

    // 2. Create the Order in PENDING state
    const order = await prisma.order.create({
      data: {
        serviceName: formData.serviceName,
        amount: formData.amount,
        userId: user.id,
      },
    });

    // 3. Initiate M-Pesa STK Push
    const paymentResult = await initiateSTKPush(
      formData.phone,
      formData.amount,
      order.id
    );

    if (paymentResult.success) {
      // Update order with M-Pesa reference
      await prisma.order.update({
        where: { id: order.id },
        data: { checkoutId: paymentResult.CheckoutRequestID },
      });
      return { success: true, orderId: order.id };
    }

    return { success: false, error: "Payment initiation failed" };
  } catch (error) {
    console.error("Internal Server Error:", error);
    return { success: false, error: "Could not process request" };
  }
}

async function initiateSTKPush(phone: string, amount: number, orderId: string) {
  /** * PLACEHOLDER FOR M-PESA DARAJA API
   * When you move to FastAPI, this logic will live there.
   */
  console.log(
    `Triggering STK Push for ${phone} - KES ${amount} (Ref: ${orderId})`
  );

  // Simulate Daraja API Response
  return {
    success: true,
    CheckoutRequestID: `ws_CO_${Math.random().toString(36).substr(2, 9)}`,
  };
}

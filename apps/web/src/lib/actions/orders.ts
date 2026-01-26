"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function processOrderAction(formData: {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  amount: number;
  contactMethod: string;
}) {
  try {
    // Force conversion to Float
    const numericAmount =
      typeof formData.amount === "string"
        ? parseFloat(formData.amount)
        : formData.amount;
    // 1. Database Logic: Upsert the User
    // If the email exists, we update their phone/name. If not, we create them.
    const user = await prisma.user.upsert({
      where: { email: formData.email },
      update: {
        name: formData.name,
        phone: formData.phone,
      },
      create: {
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
      },
    });

    // 2. Create the Order linked to that User
    const order = await prisma.order.create({
      data: {
        serviceName: formData.serviceName,
        amount: numericAmount,
        userId: user.id,
        status: "PENDING",
      },
    });

    // 3. Prepare for M-Pesa (Placeholder for now)
    console.log(`✅ Order ${order.id} created for ${user.name}`);

    // Refresh the cache if you have a dashboard open
    revalidatePath("/admin/orders");

    return {
      success: true,
      orderId: order.id,
      message: "Order initiated successfully",
    };
  } catch (error) {
    console.error("DB_ERROR:", error);
    return {
      success: false,
      message: "We encountered an error processing your request.",
    };
  }
}

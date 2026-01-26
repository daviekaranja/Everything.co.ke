// test-db.ts
import { prisma } from "./src/lib/prisma";

async function main() {
  console.log("🚀 Starting database test...");

  // 1. Create (or Update) a User
  const testUser = await prisma.user.upsert({
    where: { email: "test@everything.co.ke" },
    update: {},
    create: {
      email: "test@everything.co.ke",
      name: "Test User",
      phone: "254700000000",
    },
  });
  console.log("✅ User created/found:", testUser.name);

  // 2. Create an Order for that User
  const testOrder = await prisma.order.create({
    data: {
      serviceName: "KRA PIN Recovery",
      amount: 500.0,
      userId: testUser.id,
      status: "PENDING",
    },
  });
  console.log("✅ Order created with ID:", testOrder.id);

  // 3. Read back the data to confirm relations work
  const userWithOrders = await prisma.user.findUnique({
    where: { id: testUser.id },
    include: { orders: true },
  });

  console.log("📊 Verification:");
  console.log(`- User: ${userWithOrders?.name}`);
  console.log(`- Total Orders: ${userWithOrders?.orders.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Test failed!");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

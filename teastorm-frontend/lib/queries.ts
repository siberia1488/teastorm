import { prisma } from "@/lib/prisma";

// Admin orders
export async function getAdminOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      email: true,
      amountTotal: true,
      currency: true,
      status: true,
    },
  });
}

// Single order with items
export async function getAdminOrderById(orderId?: string) {
  if (!orderId || typeof orderId !== "string") {
    return null;
  }

  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

// Order status history
export async function getAdminOrderStatusLog(orderId: string) {
  return prisma.orderStatusLog.findMany({
    where: { orderId },
    orderBy: { createdAt: "desc" },
  });
}

// Admin stats
export async function getAdminDashboardStats() {
  const [totalOrders, paidOrders, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "paid" } }),
    prisma.order.aggregate({
      _sum: { amountTotal: true },
      where: { status: "paid" },
    }),
  ]);

  return {
    totalOrders,
    paidOrders,
    revenue: revenue._sum.amountTotal ?? 0,
  };
}

// Last orders
export async function getAdminRecentOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      createdAt: true,
      email: true,
      amountTotal: true,
      currency: true,
      status: true,
    },
  });
}

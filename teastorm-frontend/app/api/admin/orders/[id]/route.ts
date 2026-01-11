import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * PATCH /api/admin/orders/[id]
 * Admin-only: update order status and write status log
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Check admin session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Admin allowlist
  const ADMIN_EMAILS = [
    "ttrushenkova.bisiness@gmail.com",
  ];

  if (!ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const orderId = params.id;

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing order id" },
      { status: 400 }
    );
  }

  // Parse body
  const body = await req.json();
  const { status } = body;

  const allowedStatuses = [
    "pending",
    "paid",
    "shipped",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  // Fetch current order
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  // No change → do nothing
  if (existingOrder.status === status) {
    return NextResponse.json({
      success: true,
      order: existingOrder,
    });
  }

  // Transaction: update status + write log
  const updatedOrder = await prisma.$transaction(async (tx) => {
    const order = await tx.order.update({
      where: { id: orderId },
      data: { status },
    });

    await tx.orderStatusLog.create({
      data: {
        orderId: orderId,
        fromStatus: existingOrder.status,
        toStatus: status,
      },
    });

    return order;
  });

  return NextResponse.json({
    success: true,
    order: updatedOrder,
  });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * PATCH /api/admin/orders/[id]
 * Update order status (admin only)
 */
export async function PATCH(
  _req: Request,
  { params }: { params: { id: string } }
) {
  // check auth session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // simple admin allowlist
  const ADMIN_EMAILS = [
    "ttrushenkova.bisiness@gmail.com",
  ];

  if (!ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing order id" },
      { status: 400 }
    );
  }

  // parse body
  const body = await _req.json();
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

  // update order
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true, order });
}

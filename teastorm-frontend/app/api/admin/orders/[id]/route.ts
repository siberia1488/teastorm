import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAILS = [
  "ttrushenkova.bisiness@gmail.com",
];

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(
  req: Request,
  { params }: Params
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { status } = body as { status?: string };

  if (!status) {
    return NextResponse.json(
      { error: "Missing status" },
      { status: 400 }
    );
  }

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

  try {
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("ADMIN ORDER STATUS UPDATE ERROR", error);

    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }
}

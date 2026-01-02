import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
  variantId: string;
  title: string;
  priceUsd: number;
  quantity: number;
};

function isValidCart(items: CartItem[]) {
  if (!Array.isArray(items) || items.length === 0) return false;

  return items.every(
    (item) =>
      typeof item.variantId === "string" &&
      item.variantId.length > 0 &&
      typeof item.title === "string" &&
      item.title.length > 0 &&
      typeof item.priceUsd === "number" &&
      item.priceUsd > 0 &&
      Number.isFinite(item.priceUsd) &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      Number.isInteger(item.quantity)
  );
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || !isValidCart(body.items)) {
    return NextResponse.json(
      { error: "Invalid or empty cart" },
      { status: 400 }
    );
  }

  const { items } = body as { items: CartItem[] };

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  const subtotalAmount = items.reduce(
    (sum, item) =>
      sum + Math.round(item.priceUsd * 100) * item.quantity,
    0
  );

  if (subtotalAmount <= 0) {
    return NextResponse.json(
      { error: "Invalid cart total" },
      { status: 400 }
    );
  }

  const order = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        status: "pending",
        subtotalAmount,
        shippingAmount: 0,
        amountTotal: subtotalAmount,
        currency: "usd",
        userId,
      },
    });

    await tx.orderItem.createMany({
      data: items.map((item) => ({
        orderId: order.id,
        title: item.title,
        variantId: item.variantId,
        price: Math.round(item.priceUsd * 100),
        quantity: item.quantity,
      })),
    });

    return order;
  });

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    billing_address_collection: "required",

    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },

    automatic_tax: { enabled: true },

    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.priceUsd * 100),
        product_data: {
          name: item.title,
        },
      },
    })),

    metadata: {
      orderId: order.id,
      userId: userId ?? "",
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  return NextResponse.json({ url: stripeSession.url });
}

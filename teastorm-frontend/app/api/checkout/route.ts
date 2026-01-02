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

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: CartItem[] };

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  const subtotalAmount = items.reduce(
    (sum, item) =>
      sum + Math.round(item.priceUsd * 100) * item.quantity,
    0
  );

  // 1️⃣ Create Order
  const order = await prisma.order.create({
    data: {
      status: "pending",
      subtotalAmount,
      shippingAmount: 0,
      amountTotal: subtotalAmount,
      currency: "usd",
      userId,
    },
  });

  // 2️⃣ Create Order Items
  await prisma.orderItem.createMany({
    data: items.map((item) => ({
      orderId: order.id,
      title: item.title,
      variantId: item.variantId,
      price: Math.round(item.priceUsd * 100),
      quantity: item.quantity,
    })),
  });

  // 3️⃣ Create Stripe Checkout Session
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

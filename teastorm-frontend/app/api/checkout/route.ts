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

  // 🔐 текущая сессия пользователя (если есть)
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  // 1️⃣ считаем суммы (в центах)
  const subtotalAmount = items.reduce(
    (sum, item) =>
      sum + Math.round(item.priceUsd * 100) * item.quantity,
    0
  );

  // 2️⃣ создаём Order ДО Stripe
  const order = await prisma.order.create({
    data: {
      status: "pending",
      subtotalAmount,
      shippingAmount: 0,
      amountTotal: subtotalAmount,
      currency: "usd",
      userId, // ← 🔥 ПРИВЯЗКА К ПОЛЬЗОВАТЕЛЮ
    },
  });

  // 3️⃣ создаём Stripe Checkout Session
  const sessionStripe = await stripe.checkout.sessions.create({
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

    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 550, currency: "usd" },
          display_name: "USPS Ground",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1050, currency: "usd" },
          display_name: "USPS Priority",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1800, currency: "usd" },
          display_name: "USPS Express",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 2 },
          },
        },
      },
    ],

    metadata: {
      orderId: order.id,
      userId: userId ?? "", // ← дублируем на будущее (support / admin)
      items: JSON.stringify(
        items.map((i) => ({
          id: i.variantId,
          qty: i.quantity,
          price: i.priceUsd,
        }))
      ),
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  return NextResponse.json({ url: sessionStripe.url });
}

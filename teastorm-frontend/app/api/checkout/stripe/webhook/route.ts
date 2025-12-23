import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// ⬆️ apiVersion УБРАЛИ — это правильно

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await prisma.order.create({
      data: {
        stripeEventId: event.id,
        stripeSessionId: session.id,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        email: session.customer_details?.email ?? null,
        status: "paid",
      },
    });
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Stripe typings lag behind actual Checkout Session payload.
 * Extend locally in a type-safe way.
 */
type CheckoutSessionWithShipping = Stripe.Checkout.Session & {
  shipping_details?: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country?: string | null;
    } | null;
  } | null;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    console.error("❌ Invalid Stripe webhook signature", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as CheckoutSessionWithShipping;

    const orderId = session.metadata?.orderId;
    if (!orderId) {
      console.error("❌ Missing orderId in Stripe metadata");
      return new NextResponse("Missing orderId", { status: 400 });
    }

    const shippingName =
      session.shipping_details?.name ??
      session.customer_details?.name ??
      null;

    const rawAddress =
      session.shipping_details?.address ??
      session.customer_details?.address ??
      null;

    const shippingAddress = rawAddress
      ? {
          line1: rawAddress.line1,
          line2: rawAddress.line2,
          city: rawAddress.city,
          state: rawAddress.state,
          postal_code: rawAddress.postal_code,
          country: rawAddress.country,
        }
      : undefined;

    const shippingAmount =
      session.total_details?.amount_shipping ?? 0;

    const subtotalAmount =
      session.amount_subtotal ??
      (session.amount_total ?? 0) - shippingAmount;

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        stripeEventId: event.id,
        stripeSessionId: session.id,
        paymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,

        subtotalAmount,
        shippingAmount,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",

        email: session.customer_details?.email ?? null,
        shippingName,
        shippingAddress,

        status: "paid",
      },
    });
  }

  return NextResponse.json({ received: true });
}

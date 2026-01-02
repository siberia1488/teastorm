import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// commit: extend Stripe session type for missing shipping fields
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

export async function POST(req: Request) {
  // commit: read raw body for Stripe signature verification
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  // commit: verify Stripe webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // commit: ignore already processed Stripe events
  const existing = await prisma.order.findFirst({
    where: { stripeEventId: event.id },
  });

  if (existing) {
    return NextResponse.json({ received: true });
  }

  // commit: handle successful checkout session
  if (event.type === "checkout.session.completed") {
    const session =
      event.data.object as CheckoutSessionWithShipping;

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Missing orderId", { status: 400 });
    }

    const rawAddress = session.shipping_details?.address;

    // commit: normalize shipping address for Prisma JSON field
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

    // commit: mark order as paid
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripeEventId: event.id,
        stripeSessionId: session.id,
        paymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        email: session.customer_details?.email ?? null,
        shippingName: session.shipping_details?.name ?? null,
        shippingAddress,
      },
    });
  }

  // commit: acknowledge webhook
  return NextResponse.json({ received: true });
}

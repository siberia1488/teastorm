import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Stripe typings are incomplete.
 * Extend Checkout Session locally.
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

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as CheckoutSessionWithShipping;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Missing orderId", { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.status === "paid") {
      return NextResponse.json({ received: true });
    }

    const shippingAddress = session.shipping_details?.address
      ? {
          line1: session.shipping_details.address.line1 ?? null,
          line2: session.shipping_details.address.line2 ?? null,
          city: session.shipping_details.address.city ?? null,
          state: session.shipping_details.address.state ?? null,
          postal_code:
            session.shipping_details.address.postal_code ?? null,
          country: session.shipping_details.address.country ?? null,
        }
      : undefined;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripeEventId: event.id,
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent as string,
        email: session.customer_details?.email ?? null,
        shippingName: session.shipping_details?.name ?? null,
        shippingAddress,
      },
    });

    if (order.email) {
      try {
        await sendOrderConfirmationEmail({
          to: order.email,
          orderId: order.id,
          amountTotal: order.amountTotal,
          currency: order.currency,
        });
      } catch {
        // email failure must not break webhook
      }
    }
  }

  return NextResponse.json({ received: true });
}
